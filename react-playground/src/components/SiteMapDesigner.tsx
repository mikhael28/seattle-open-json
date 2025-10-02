import React, { useState, useRef, useCallback, useEffect } from 'react';
import { 
  SITE_MAP_REQUIREMENTS, 
  ENHANCED_SITE_MAP_REQUIREMENTS,
  ENVIRONMENTAL_CRITICAL_AREA_SITE_MAP_REQUIREMENTS,
  SiteMapChecklist,
  type SiteMapRequirement 
} from '../data/site-map-requirements';
import SiteMapRequirementsVisualizer from './SiteMapRequirementsVisualizer';
import { exampleProperty, mockHouseData, type KingCountyProperty, type SeattlePropertyData } from './ADUPlanning/PropertyData';

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

type DrawingTool = 
  | 'select' 
  | 'line' 
  | 'rectangle' 
  | 'circle' 
  | 'text'
  | 'measurement';

type ElementType = 
  | 'line'
  | 'rectangle'
  | 'circle'
  | 'text'
  | 'measurement';

type ElementCategory =
  | 'property-line'
  | 'structure-existing'
  | 'structure-proposed'
  | 'setback-line'
  | 'driveway'
  | 'parking'
  | 'paved-area'
  | 'tree'
  | 'vegetation'
  | 'easement'
  | 'utility-water'
  | 'utility-sewer'
  | 'utility-storm'
  | 'utility-power'
  | 'pedestrian-path'
  | 'contour-line'
  | 'annotation'
  | 'dimension'
  | 'north-arrow'
  | 'other';

type LayerType = 
  | 'existing' 
  | 'proposed'
  | 'utilities'
  | 'trees'
  | 'annotations'
  | 'easements'
  | 'environmental';

type RequirementType = 'basic' | 'enhanced' | 'environmental';

interface Point {
  x: number;
  y: number;
}

interface ElementMetadata {
  // For structures
  structureType?: 'building' | 'retaining wall' | 'patio' | 'deck' | 'porch' | 'rockery' | 'ADU' | 'garage';
  buildingHeight?: number;
  numberOfStories?: number;
  squareFootage?: number;
  
  // For setbacks
  frontSetback?: number;
  sideSetback?: number;
  rearSetback?: number;
  distanceToOtherStructures?: number;
  
  // For trees
  treeSpecies?: string;
  treeDiameter?: number; // at 4.5 feet
  treeTier?: 1 | 2 | 3 | 4;
  treeProtectionRadius?: number;
  
  // For utilities
  utilityType?: 'water' | 'sewer' | 'storm' | 'electrical' | 'gas';
  utilitySize?: string;
  
  // For easements
  easementType?: string;
  kingCountyRecordingNumber?: string;
  
  // For paved areas
  pavedAreaType?: 'driveway' | 'parking' | 'walkway' | 'patio';
  surfaceMaterial?: string;
  
  // General
  description?: string;
  notes?: string;
}

interface DrawingElement {
  id: string;
  type: ElementType;
  category: ElementCategory;
  layer: LayerType;
  shape: 'line' | 'rectangle' | 'circle' | 'text';
  points: Point[];
  style: {
    stroke: string;
    strokeWidth: number;
    fill: string;
    opacity: number;
    dashArray?: string;
  };
  dimensions?: {
    width?: number;
    height?: number;
    length?: number;
    area?: number;
  };
  text?: string;
  fontSize?: number;
  metadata?: ElementMetadata;
  relatedRequirementIds?: number[]; // Links to requirement IDs
  locked?: boolean;
  visible?: boolean;
}

interface ElementTemplate {
  id: string;
  name: string;
  description: string;
  category: ElementCategory;
  layer: LayerType;
  icon: string;
  defaultStyle: DrawingElement['style'];
  defaultMetadata?: ElementMetadata;
  requirementIds: number[];
}

type CompassDirection = 'north' | 'south' | 'east' | 'west';
type StreetSide = 'top' | 'bottom' | 'left' | 'right';

interface PropertyConfig {
  width: number; // in feet
  height: number; // in feet
  scale: number; // pixels per foot
  address: string;
  legalDescription: string;
  parcelNumber: string;
  frontStreet: string;
  rearStreet?: string;
  leftStreet?: string;
  rightStreet?: string;
  lotNumber?: string;
  block?: string;
  plat?: string;
  northDirection: CompassDirection; // Which direction is north on the canvas
  frontStreetSide: StreetSide; // Which side of the property the front street is on
}

interface ChecklistProgress {
  [requirementId: number]: {
    completed: boolean;
    linkedElementIds: string[];
    notes?: string;
  };
}

interface HistoryState {
  elements: DrawingElement[];
  propertyConfig: PropertyConfig;
  timestamp: number;
}

interface ViewportState {
  zoom: number;
  panX: number;
  panY: number;
}

// ============================================================================
// ELEMENT TEMPLATES LIBRARY
// ============================================================================

const ELEMENT_TEMPLATES: ElementTemplate[] = [
  // Structures
  {
    id: 'existing-building',
    name: 'Existing Building',
    description: 'Existing structure on property',
    category: 'structure-existing',
    layer: 'existing',
    icon: '🏠',
    defaultStyle: { stroke: '#92400e', strokeWidth: 3, fill: '#fef3c7', opacity: 0.7 },
    defaultMetadata: { structureType: 'building' },
    requirementIds: [6, 7]
  },
  {
    id: 'proposed-adu',
    name: 'Proposed ADU',
    description: 'New ADU construction',
    category: 'structure-proposed',
    layer: 'proposed',
    icon: '🏘️',
    defaultStyle: { stroke: '#065f46', strokeWidth: 3, fill: '#d1fae5', opacity: 0.7 },
    defaultMetadata: { structureType: 'ADU' },
    requirementIds: [6, 7, 21]
  },
  {
    id: 'proposed-garage',
    name: 'Proposed Garage',
    description: 'New garage or carport',
    category: 'structure-proposed',
    layer: 'proposed',
    icon: '🚗',
    defaultStyle: { stroke: '#065f46', strokeWidth: 2, fill: '#a7f3d0', opacity: 0.6 },
    defaultMetadata: { structureType: 'garage' },
    requirementIds: [6, 7]
  },
  {
    id: 'deck-patio',
    name: 'Deck/Patio',
    description: 'Outdoor deck or patio',
    category: 'structure-proposed',
    layer: 'proposed',
    icon: '🪵',
    defaultStyle: { stroke: '#92400e', strokeWidth: 2, fill: '#fde68a', opacity: 0.5 },
    defaultMetadata: { structureType: 'deck' },
    requirementIds: [6, 7]
  },
  
  // Paved Areas
  {
    id: 'driveway',
    name: 'Driveway',
    description: 'Vehicle driveway',
    category: 'driveway',
    layer: 'proposed',
    icon: '🛣️',
    defaultStyle: { stroke: '#374151', strokeWidth: 2, fill: '#9ca3af', opacity: 0.6 },
    defaultMetadata: { pavedAreaType: 'driveway', surfaceMaterial: 'concrete' },
    requirementIds: [9]
  },
  {
    id: 'parking-area',
    name: 'Parking Area',
    description: 'Parking space or area',
    category: 'parking',
    layer: 'proposed',
    icon: '🅿️',
    defaultStyle: { stroke: '#374151', strokeWidth: 2, fill: '#d1d5db', opacity: 0.6 },
    defaultMetadata: { pavedAreaType: 'parking' },
    requirementIds: [9]
  },
  
  // Trees & Vegetation
  {
    id: 'tier1-tree',
    name: 'Tier 1 Tree',
    description: 'Exceptional tree (≥30" diameter)',
    category: 'tree',
    layer: 'trees',
    icon: '🌲',
    defaultStyle: { stroke: '#065f46', strokeWidth: 3, fill: '#059669', opacity: 0.3 },
    defaultMetadata: { treeTier: 1, treeProtectionRadius: 15 },
    requirementIds: [10, 11, 12]
  },
  {
    id: 'tier2-tree',
    name: 'Tier 2 Tree',
    description: 'Significant tree (24"-30" diameter)',
    category: 'tree',
    layer: 'trees',
    icon: '🌳',
    defaultStyle: { stroke: '#047857', strokeWidth: 2, fill: '#10b981', opacity: 0.3 },
    defaultMetadata: { treeTier: 2, treeProtectionRadius: 12 },
    requirementIds: [10, 11, 12]
  },
  
  // Utilities
  {
    id: 'water-main',
    name: 'Water Main',
    description: 'Water main line',
    category: 'utility-water',
    layer: 'utilities',
    icon: '💧',
    defaultStyle: { stroke: '#0ea5e9', strokeWidth: 3, fill: 'transparent', opacity: 1, dashArray: '5,5' },
    defaultMetadata: { utilityType: 'water' },
    requirementIds: [17]
  },
  {
    id: 'sewer-line',
    name: 'Sewer Line',
    description: 'Sanitary sewer line',
    category: 'utility-sewer',
    layer: 'utilities',
    icon: '🚽',
    defaultStyle: { stroke: '#7c2d12', strokeWidth: 3, fill: 'transparent', opacity: 1, dashArray: '10,5' },
    defaultMetadata: { utilityType: 'sewer' },
    requirementIds: [15]
  },
  {
    id: 'storm-drain',
    name: 'Storm Drain',
    description: 'Storm drainage line',
    category: 'utility-storm',
    layer: 'utilities',
    icon: '🌧️',
    defaultStyle: { stroke: '#1e40af', strokeWidth: 3, fill: 'transparent', opacity: 1, dashArray: '8,4' },
    defaultMetadata: { utilityType: 'storm' },
    requirementIds: [16, 20]
  },
  {
    id: 'power-line',
    name: 'Power Line',
    description: 'Electrical power line',
    category: 'utility-power',
    layer: 'utilities',
    icon: '⚡',
    defaultStyle: { stroke: '#eab308', strokeWidth: 2, fill: 'transparent', opacity: 1, dashArray: '3,3' },
    defaultMetadata: { utilityType: 'electrical' },
    requirementIds: [18]
  },
  
  // Easements & Paths
  {
    id: 'easement',
    name: 'Easement',
    description: 'Property easement',
    category: 'easement',
    layer: 'easements',
    icon: '📋',
    defaultStyle: { stroke: '#dc2626', strokeWidth: 2, fill: '#fee2e2', opacity: 0.3, dashArray: '10,5' },
    requirementIds: [11]
  },
  {
    id: 'pedestrian-path',
    name: 'Pedestrian Path',
    description: 'Walkway to entrance',
    category: 'pedestrian-path',
    layer: 'proposed',
    icon: '🚶',
    defaultStyle: { stroke: '#6b7280', strokeWidth: 3, fill: '#e5e7eb', opacity: 0.6 },
    requirementIds: [12]
  },
  
  // Property Lines & Setbacks
  {
    id: 'property-line',
    name: 'Property Line',
    description: 'Property boundary',
    category: 'property-line',
    layer: 'existing',
    icon: '📏',
    defaultStyle: { stroke: '#000000', strokeWidth: 4, fill: 'transparent', opacity: 1 },
    requirementIds: [5]
  },
  {
    id: 'setback-line',
    name: 'Setback Line',
    description: 'Required setback boundary',
    category: 'setback-line',
    layer: 'annotations',
    icon: '📐',
    defaultStyle: { stroke: '#dc2626', strokeWidth: 2, fill: 'transparent', opacity: 1, dashArray: '5,5' },
    requirementIds: [7, 21]
  }
];

// ============================================================================
// COMPONENT
// ============================================================================

export const SiteMapDesigner: React.FC = () => {
  // Canvas and SVG refs
  const svgRef = useRef<SVGSVGElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);

  // Property Configuration
  const [propertyConfig, setPropertyConfig] = useState<PropertyConfig>({
    width: 50, // 50 feet default
    height: 100, // 100 feet default
    scale: 4, // 4 pixels per foot (1/4" scale at 96 DPI)
    address: '',
    legalDescription: '',
    parcelNumber: '',
    frontStreet: '',
    northDirection: 'north', // Default: north is up
    frontStreetSide: 'top', // Default: front street is at top
  });

  // Drawing State
  const [selectedTool, setSelectedTool] = useState<DrawingTool>('select');
  const [selectedTemplate, setSelectedTemplate] = useState<ElementTemplate | null>(null);
  const [activeLayer, setActiveLayer] = useState<LayerType>('proposed');
  const [elements, setElements] = useState<DrawingElement[]>([]);
  const [selectedElementId, setSelectedElementId] = useState<string | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentPoints, setCurrentPoints] = useState<Point[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState<Point>({ x: 0, y: 0 });
  
  // Viewport State
  const [viewport, setViewport] = useState<ViewportState>({
    zoom: 1,
    panX: 0,
    panY: 0,
  });

  // UI State
  const [showGrid, setShowGrid] = useState(true);
  const [showDimensions, setShowDimensions] = useState(true);
  const [showPropertyInfo, setShowPropertyInfo] = useState(true);
  const [snapToGrid, setSnapToGrid] = useState(true);
  const [textInput, setTextInput] = useState('');
  const [showTextDialog, setShowTextDialog] = useState(false);
  const [pendingTextElement, setPendingTextElement] = useState<Point | null>(null);
  const [selectedRequirementType, setSelectedRequirementType] = useState<RequirementType>('basic');
  
  // Checklist & Requirements
  const [checklistProgress, setChecklistProgress] = useState<ChecklistProgress>({});
  const [showChecklistPanel, setShowChecklistPanel] = useState(false);
  
  // Layer Visibility
  const [layerVisibility, setLayerVisibility] = useState<Record<LayerType, boolean>>({
    existing: true,
    proposed: true,
    utilities: true,
    trees: true,
    annotations: true,
    easements: true,
    environmental: true,
  });
  
  // Undo/Redo History
  const [history, setHistory] = useState<HistoryState[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [showPropertiesPanel, setShowPropertiesPanel] = useState(false);
  const [showTemplateLibrary, setShowTemplateLibrary] = useState(false);
  const [highlightedElementId, setHighlightedElementId] = useState<string | null>(null);

  // ============================================================================
  // COMPUTED VALUES
  // ============================================================================

  const canvasWidth = propertyConfig.width * propertyConfig.scale;
  const canvasHeight = propertyConfig.height * propertyConfig.scale;
  const gridSize = 5 * propertyConfig.scale; // 5 feet grid
  const streetWidth = 30; // pixels for street representation

  // Get current requirements based on selected type
  const currentRequirements = selectedRequirementType === 'basic' 
    ? SITE_MAP_REQUIREMENTS
    : selectedRequirementType === 'enhanced'
    ? ENHANCED_SITE_MAP_REQUIREMENTS
    : ENVIRONMENTAL_CRITICAL_AREA_SITE_MAP_REQUIREMENTS;

  // Calculate checklist completion
  const completedRequirements = Object.values(checklistProgress).filter(p => p.completed).length;
  const totalRequirements = currentRequirements.filter(r => r.required).length;
  const completionPercentage = totalRequirements > 0 
    ? Math.round((completedRequirements / totalRequirements) * 100)
    : 0;

  // Filter visible elements by layer
  const visibleElements = elements.filter(el => 
    layerVisibility[el.layer] && (el.visible !== false)
  );

  // Get selected element
  const selectedElement = elements.find(el => el.id === selectedElementId);

  // ============================================================================
  // HISTORY MANAGEMENT
  // ============================================================================

  const saveToHistory = useCallback(() => {
    const newHistoryState: HistoryState = {
      elements: JSON.parse(JSON.stringify(elements)),
      propertyConfig: JSON.parse(JSON.stringify(propertyConfig)),
      timestamp: Date.now(),
    };

    // Remove any future history if we're not at the end
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newHistoryState);

    // Limit history to 50 states
    if (newHistory.length > 50) {
      newHistory.shift();
    } else {
      setHistoryIndex(historyIndex + 1);
    }

    setHistory(newHistory);
  }, [elements, propertyConfig, history, historyIndex]);

  const undo = useCallback(() => {
    if (historyIndex > 0) {
      const prevState = history[historyIndex - 1];
      setElements(JSON.parse(JSON.stringify(prevState.elements)));
      setPropertyConfig(JSON.parse(JSON.stringify(prevState.propertyConfig)));
      setHistoryIndex(historyIndex - 1);
    }
  }, [history, historyIndex]);

  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const nextState = history[historyIndex + 1];
      setElements(JSON.parse(JSON.stringify(nextState.elements)));
      setPropertyConfig(JSON.parse(JSON.stringify(nextState.propertyConfig)));
      setHistoryIndex(historyIndex + 1);
    }
  }, [history, historyIndex]);

  // ============================================================================
  // CHECKLIST MANAGEMENT
  // ============================================================================

  const updateChecklistItem = useCallback((requirementId: number, completed: boolean, elementId?: string) => {
    setChecklistProgress(prev => {
      const current = prev[requirementId] || { completed: false, linkedElementIds: [] };
      const linkedElementIds = elementId 
        ? completed 
          ? [...current.linkedElementIds, elementId]
          : current.linkedElementIds.filter(id => id !== elementId)
        : current.linkedElementIds;

      return {
        ...prev,
        [requirementId]: {
          ...current,
          completed,
          linkedElementIds,
        }
      };
    });
  }, []);

  const autoCheckRequirements = useCallback((element: DrawingElement) => {
    // Automatically check off requirements when relevant elements are added
    if (element.relatedRequirementIds) {
      element.relatedRequirementIds.forEach(reqId => {
        updateChecklistItem(reqId, true, element.id);
      });
    }
  }, [updateChecklistItem]);

  // ============================================================================
  // UTILITY FUNCTIONS
  // ============================================================================

  const snapToGridPoint = (point: Point): Point => {
    if (!snapToGrid) return point;
    return {
      x: Math.round(point.x / gridSize) * gridSize,
      y: Math.round(point.y / gridSize) * gridSize,
    };
  };

  const getSVGPoint = (clientX: number, clientY: number): Point => {
    if (!svgRef.current) return { x: 0, y: 0 };
    const svg = svgRef.current;
    const rect = svg.getBoundingClientRect();
    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  };

  const pixelsToFeet = (pixels: number): number => {
    return Number((pixels / propertyConfig.scale).toFixed(2));
  };

  const feetToPixels = (feet: number): number => {
    return feet * propertyConfig.scale;
  };

  const calculateDistance = (p1: Point, p2: Point): number => {
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const generateId = (): string => {
    return `element-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  };

  // ============================================================================
  // DRAWING HANDLERS
  // ============================================================================

  const handleMouseDown = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
    const point = getSVGPoint(e.clientX, e.clientY);
    
    // Handle select tool - check if clicking on an element to drag
    if (selectedTool === 'select' && selectedElementId) {
      const selectedElement = elements.find(el => el.id === selectedElementId);
      if (selectedElement) {
        setIsDragging(true);
        // Calculate offset between click point and element's first point
        setDragOffset({
          x: point.x - selectedElement.points[0].x,
          y: point.y - selectedElement.points[0].y
        });
        return;
      }
    }
    
    if (selectedTool === 'select') return;
    
    const snappedPoint = snapToGridPoint(point);
    
    // Text tool uses click-to-place instead of drag
    if (selectedTool === 'text') {
      setPendingTextElement(snappedPoint);
      setShowTextDialog(true);
      return;
    }
    
    setIsDrawing(true);
    setCurrentPoints([snappedPoint]);
  }, [selectedTool, snapToGrid, selectedElementId, elements]);

  const handleMouseMove = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
    const point = getSVGPoint(e.clientX, e.clientY);
    
    // Handle dragging selected element
    if (isDragging && selectedElementId && selectedTool === 'select') {
      const newPoint = snapToGrid 
        ? snapToGridPoint({ x: point.x - dragOffset.x, y: point.y - dragOffset.y })
        : { x: point.x - dragOffset.x, y: point.y - dragOffset.y };
      
      setElements(prev => prev.map(el => {
        if (el.id !== selectedElementId) return el;
        
        const dx = newPoint.x - el.points[0].x;
        const dy = newPoint.y - el.points[0].y;
        
        return {
          ...el,
          points: el.points.map(p => ({
            x: p.x + dx,
            y: p.y + dy
          }))
        };
      }));
      return;
    }
    
    if (!isDrawing || selectedTool === 'select' || selectedTool === 'text') return;
    
    const snappedPoint = snapToGridPoint(point);
    setCurrentPoints(prev => {
      if (prev.length === 0) return [snappedPoint];
      if (selectedTool === 'line' || selectedTool === 'rectangle' || selectedTool === 'circle') {
        return [prev[0], snappedPoint];
      }
      return [...prev, snappedPoint];
    });
  }, [isDrawing, selectedTool, snapToGrid, isDragging, selectedElementId, dragOffset, elements, snapToGridPoint]);

  const handleMouseUp = useCallback(() => {
    // Stop dragging
    if (isDragging) {
      setIsDragging(false);
      return;
    }
    
    if (!isDrawing || currentPoints.length < 2) {
      setIsDrawing(false);
      setCurrentPoints([]);
      return;
    }

    // Check if the user actually dragged (not just clicked)
    const p1 = currentPoints[0];
    const p2 = currentPoints[1];
    const distance = Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
    
    // Require at least 5 pixels of movement
    if (distance < 5) {
      setIsDrawing(false);
      setCurrentPoints([]);
      return;
    }

    // Create the element based on selected tool and template
    const dimensions = calculateDimensions(currentPoints, selectedTool);
    const newElement: DrawingElement = {
      id: generateId(),
      type: getElementTypeFromTool(selectedTool),
      category: selectedTemplate?.category || 'other',
      layer: selectedTemplate?.layer || activeLayer,
      shape: getShapeFromTool(selectedTool),
      points: currentPoints,
      style: selectedTemplate?.defaultStyle || getDefaultStyle(selectedTool),
      dimensions,
      metadata: selectedTemplate?.defaultMetadata ? { ...selectedTemplate.defaultMetadata } : undefined,
      relatedRequirementIds: selectedTemplate?.requirementIds,
      visible: true,
      locked: false,
    };

    setElements(prev => [...prev, newElement]);
    saveToHistory();
    autoCheckRequirements(newElement);
    setIsDrawing(false);
    setCurrentPoints([]);
  }, [isDrawing, currentPoints, selectedTool, activeLayer, isDragging, selectedTemplate, saveToHistory, autoCheckRequirements]);

  // ============================================================================
  // TEXT HANDLING
  // ============================================================================

  const handleTextSubmit = () => {
    if (!pendingTextElement || !textInput.trim()) {
      setShowTextDialog(false);
      setPendingTextElement(null);
      setTextInput('');
      return;
    }

    const newElement: DrawingElement = {
      id: generateId(),
      type: 'text',
      category: 'annotation',
      layer: activeLayer,
      shape: 'text',
      points: [pendingTextElement],
      style: getDefaultStyle('text'),
      text: textInput,
      fontSize: 16,
      visible: true,
      locked: false,
    };

    setElements(prev => [...prev, newElement]);
    saveToHistory();
    setShowTextDialog(false);
    setPendingTextElement(null);
    setTextInput('');
  };

  // ============================================================================
  // ELEMENT MANAGEMENT
  // ============================================================================

  const deleteElement = (id: string) => {
    setElements(prev => prev.filter(el => el.id !== id));
    if (selectedElementId === id) {
      setSelectedElementId(null);
    }
    saveToHistory();
  };

  const rotateElement = (id: string) => {
    setElements(prev => prev.map(el => {
      if (el.id !== id) return el;
      
      // For rectangles and other shapes, rotate 90 degrees by swapping points
      if (el.shape === 'rectangle' && el.points.length === 2) {
        const [p1, p2] = el.points;
        const centerX = (p1.x + p2.x) / 2;
        const centerY = (p1.y + p2.y) / 2;
        const width = Math.abs(p2.x - p1.x);
        const height = Math.abs(p2.y - p1.y);
        
        // Swap width and height by creating new points
        const newP1 = {
          x: centerX - height / 2,
          y: centerY - width / 2
        };
        const newP2 = {
          x: centerX + height / 2,
          y: centerY + width / 2
        };
        
        return {
          ...el,
          points: [newP1, newP2],
          dimensions: el.dimensions ? {
            ...el.dimensions,
            width: el.dimensions.height,
            height: el.dimensions.width,
          } : undefined
        };
      }
      
      // For lines, rotate around center
      if (el.shape === 'line' && el.points.length === 2) {
        const [p1, p2] = el.points;
        const centerX = (p1.x + p2.x) / 2;
        const centerY = (p1.y + p2.y) / 2;
        
        // Rotate 90 degrees clockwise
        const rotatePoint = (p: Point, cx: number, cy: number) => {
          const dx = p.x - cx;
          const dy = p.y - cy;
          return {
            x: cx - dy,
            y: cy + dx
          };
        };
        
        return {
          ...el,
          points: [
            rotatePoint(p1, centerX, centerY),
            rotatePoint(p2, centerX, centerY)
          ]
        };
      }
      
      return el;
    }));
    saveToHistory();
  };

  const updateElementDimensions = (id: string, widthFeet: number, heightFeet: number) => {
    setElements(prev => prev.map(el => {
      if (el.id !== id) return el;
      
      // Only update rectangles and circles
      if (el.shape === 'rectangle' && el.points.length === 2) {
        const [p1, p2] = el.points;
        const centerX = (p1.x + p2.x) / 2;
        const centerY = (p1.y + p2.y) / 2;
        
        // Convert feet to pixels
        const widthPx = widthFeet * propertyConfig.scale;
        const heightPx = heightFeet * propertyConfig.scale;
        
        // Create new points maintaining center position
        const newP1 = {
          x: centerX - widthPx / 2,
          y: centerY - heightPx / 2
        };
        const newP2 = {
          x: centerX + widthPx / 2,
          y: centerY + heightPx / 2
        };
        
        return {
          ...el,
          points: [newP1, newP2],
          dimensions: {
            ...el.dimensions,
            width: widthFeet,
            height: heightFeet,
            area: widthFeet * heightFeet
          }
        };
      }
      
      // For circles, update radius based on width (treating width as diameter)
      if (el.shape === 'circle' && el.points.length === 2) {
        const [center, edge] = el.points;
        const radiusPx = (widthFeet / 2) * propertyConfig.scale;
        
        return {
          ...el,
          points: [
            center,
            { x: center.x + radiusPx, y: center.y }
          ],
          dimensions: {
            ...el.dimensions,
            width: widthFeet,
            height: widthFeet,
            area: Math.PI * Math.pow(widthFeet / 2, 2)
          }
        };
      }
      
      return el;
    }));
    saveToHistory();
  };

  const deleteAllElements = () => {
    if (window.confirm('Are you sure you want to delete all elements?')) {
      setElements([]);
      setSelectedElementId(null);
      saveToHistory();
    }
  };

  const handleElementListClick = (elementId: string) => {
    setSelectedElementId(elementId);
    setHighlightedElementId(elementId);
    
    // Remove highlight after 2 seconds
    setTimeout(() => {
      setHighlightedElementId(null);
    }, 2000);
  };

  const exportToSVG = () => {
    if (!svgRef.current) return;
    const svgData = new XMLSerializer().serializeToString(svgRef.current);
    const blob = new Blob([svgData], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `site-plan-${propertyConfig.address || 'untitled'}.svg`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const exportToJSON = () => {
    const data = {
      propertyConfig,
      elements,
      metadata: {
        created: new Date().toISOString(),
        version: '1.0',
      },
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `site-plan-${propertyConfig.address || 'untitled'}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const loadBoilerplate = () => {
    /**
     * Load Boilerplate - Pre-populate site map with property data
     * 
     * Data Sources:
     * 1. King County Assessor (exampleProperty):
     *    - Lot size (landData.landSqFt, landData.acres)
     *    - Building footprint (buildings[0].totalFinishedArea)
     *    - Building details (yearBuilt, stories, bedrooms, bathrooms)
     *    - Deck/patio area (deckAreaSqFt)
     *    - Garage area (attachedGarage, basementGarage)
     *    - Property address and parcel number
     *    - Zoning designation
     * 
     * 2. Seattle SDCI (mockHouseData):
     *    - Development site ID and legal description
     *    - GIS calculated area
     *    - Zoning history and overlays
     *    - Environmental critical areas
     *    - Design review requirements
     * 
     * Generated Elements:
     *    - Property boundary lines
     *    - Existing building(s) with accurate dimensions
     *    - Deck/patio structures
     *    - Setback lines (front, side, rear)
     *    - Property information annotation
     */
    
    // Extract data from King County and Seattle SDCI sources
    const kingCounty: KingCountyProperty = exampleProperty;
    const seattle: SeattlePropertyData = mockHouseData;
    
    // Extract property information
    const lotSqFt = kingCounty.landData.landSqFt; // 8160 sq ft
    const buildingInfo = kingCounty.buildings[0];
    
    // Calculate property dimensions
    // Assume a typical lot depth-to-width ratio (e.g., 2:1 for urban lots)
    // For 8160 sq ft, we could have ~60ft x ~136ft
    const lotWidth = Math.sqrt(lotSqFt / 2); // ~64 feet
    const lotDepth = lotSqFt / lotWidth; // ~127 feet
    
    // Calculate building footprint from finished area
    // For a 1-story house, footprint ≈ total finished area
    const buildingSqFt = buildingInfo.totalFinishedArea; // 1160 sq ft
    const buildingWidth = Math.sqrt(buildingSqFt * 0.75); // Assume rectangular ~29 ft
    const buildingDepth = buildingSqFt / buildingWidth; // ~40 ft
    
    // Assume typical setbacks for NR2 zoning
    const frontSetback = 20; // feet from front property line
    const sideSetback = 5; // feet from side property line
    const rearSetback = 25; // feet from rear property line
    
    // Calculate building position (in feet from origin)
    const buildingX = sideSetback;
    const buildingY = frontSetback;
    
    // Calculate deck position (adjacent to building if present)
    const deckSqFt = buildingInfo.deckAreaSqFt; // 140 sq ft
    const deckWidth = 10; // Assume 10 ft width
    const deckDepth = deckSqFt > 0 ? deckSqFt / deckWidth : 0; // 14 ft
    
    // Determine orientation based on street name
    // 1st Ave NW runs north-south, so house faces west (perpendicular to street)
    // For a vertical lot (depth > width), the street is typically on the narrow side
    const isVerticalLot = lotDepth > lotWidth;
    const streetName = kingCounty.parcelData.siteAddress.split(' ').slice(-2).join(' '); // "AVE NW"
    
    // Default orientation: north is up, street at top
    let northDirection: CompassDirection = 'north';
    let frontStreetSide: StreetSide = 'top';
    let actualWidth = lotWidth;
    let actualDepth = lotDepth;
    
    // If the street runs north-south (like "1st Ave"), and lot is vertical,
    // then north should point left or right to make the street run vertically
    if (streetName.includes('AVE') && isVerticalLot) {
      // Avenue runs north-south, house faces west
      northDirection = 'west'; // North points to the left
      frontStreetSide = 'left'; // Front street is on the left (west side)
      // Swap dimensions since we're rotating the view
      actualWidth = lotDepth;
      actualDepth = lotWidth;
    } else if (streetName.includes('ST') && !isVerticalLot) {
      // Street runs east-west, house faces north/south
      northDirection = 'north'; // Keep north up
      frontStreetSide = 'top';
    }
    
    // Update property configuration
    setPropertyConfig({
      width: Math.round(actualWidth),
      height: Math.round(actualDepth),
      scale: 4, // 4 pixels per foot
      address: kingCounty.parcelData.siteAddress,
      legalDescription: kingCounty.parcelData.legalDescription.subdivision,
      parcelNumber: kingCounty.parcelData.parcel,
      frontStreet: '1st Ave NW',
      lotNumber: kingCounty.parcelData.platLot,
      plat: kingCounty.parcelData.legalDescription.subdivision,
      northDirection: northDirection,
      frontStreetSide: frontStreetSide,
    });
    
    // Create elements array
    const newElements: DrawingElement[] = [];
    
    // 1. Property boundary line (this is drawn by default, but we can add it explicitly if needed)
    const propertyLineTemplate = ELEMENT_TEMPLATES.find(t => t.id === 'property-line');
    if (propertyLineTemplate) {
      const propLineId = generateId();
      newElements.push({
        id: propLineId,
        type: 'line',
        category: 'property-line',
        layer: 'existing',
        shape: 'line',
        points: [
          { x: streetWidth, y: streetWidth },
          { x: streetWidth + lotWidth * propertyConfig.scale, y: streetWidth },
          { x: streetWidth + lotWidth * propertyConfig.scale, y: streetWidth + lotDepth * propertyConfig.scale },
          { x: streetWidth, y: streetWidth + lotDepth * propertyConfig.scale },
          { x: streetWidth, y: streetWidth }
        ],
        style: propertyLineTemplate.defaultStyle,
        visible: true,
        locked: false,
        relatedRequirementIds: propertyLineTemplate.requirementIds,
      });
    }
    
    // 2. Existing building
    const existingBuildingTemplate = ELEMENT_TEMPLATES.find(t => t.id === 'existing-building');
    if (existingBuildingTemplate) {
      const buildingId = generateId();
      const buildingStartX = streetWidth + buildingX * propertyConfig.scale;
      const buildingStartY = streetWidth + buildingY * propertyConfig.scale;
      const buildingEndX = buildingStartX + buildingWidth * propertyConfig.scale;
      const buildingEndY = buildingStartY + buildingDepth * propertyConfig.scale;
      
      newElements.push({
        id: buildingId,
        type: 'rectangle',
        category: 'structure-existing',
        layer: 'existing',
        shape: 'rectangle',
        points: [
          { x: buildingStartX, y: buildingStartY },
          { x: buildingEndX, y: buildingEndY }
        ],
        style: existingBuildingTemplate.defaultStyle,
        dimensions: {
          width: buildingWidth,
          height: buildingDepth,
          area: buildingSqFt,
        },
        metadata: {
          structureType: 'building',
          squareFootage: buildingSqFt,
          numberOfStories: buildingInfo.stories,
          description: `Existing ${buildingInfo.yearBuilt} ${buildingInfo.bedrooms}BR/${buildingInfo.fullBaths}BA house`
        },
        visible: true,
        locked: false,
        relatedRequirementIds: existingBuildingTemplate.requirementIds,
      });
      
      // Auto-check related requirements
      autoCheckRequirements(newElements[newElements.length - 1]);
    }
    
    // 3. Deck (if present)
    if (deckSqFt > 0) {
      const deckTemplate = ELEMENT_TEMPLATES.find(t => t.id === 'deck-patio');
      if (deckTemplate) {
        const deckId = generateId();
        // Position deck at back of house
        const deckStartX = streetWidth + buildingX * propertyConfig.scale;
        const deckStartY = streetWidth + (buildingY + buildingDepth) * propertyConfig.scale;
        const deckEndX = deckStartX + deckWidth * propertyConfig.scale;
        const deckEndY = deckStartY + deckDepth * propertyConfig.scale;
        
        newElements.push({
          id: deckId,
          type: 'rectangle',
          category: 'structure-existing',
          layer: 'existing',
          shape: 'rectangle',
          points: [
            { x: deckStartX, y: deckStartY },
            { x: deckEndX, y: deckEndY }
          ],
          style: deckTemplate.defaultStyle,
          dimensions: {
            width: deckWidth,
            height: deckDepth,
            area: deckSqFt,
          },
          metadata: {
            structureType: 'deck',
            squareFootage: deckSqFt,
            description: 'Existing deck'
          },
          visible: true,
          locked: false,
          relatedRequirementIds: deckTemplate.requirementIds,
        });
        
        autoCheckRequirements(newElements[newElements.length - 1]);
      }
    }
    
    // 4. Add setback lines to visualize required setbacks
    const setbackTemplate = ELEMENT_TEMPLATES.find(t => t.id === 'setback-line');
    if (setbackTemplate) {
      // Front setback
      const frontSetbackId = generateId();
      newElements.push({
        id: frontSetbackId,
        type: 'line',
        category: 'setback-line',
        layer: 'annotations',
        shape: 'line',
        points: [
          { x: streetWidth, y: streetWidth + frontSetback * propertyConfig.scale },
          { x: streetWidth + lotWidth * propertyConfig.scale, y: streetWidth + frontSetback * propertyConfig.scale }
        ],
        style: setbackTemplate.defaultStyle,
        metadata: {
          frontSetback: frontSetback,
          description: `Front setback: ${frontSetback}ft`
        },
        visible: true,
        locked: false,
        relatedRequirementIds: setbackTemplate.requirementIds,
      });
      
      // Side setbacks
      const leftSetbackId = generateId();
      newElements.push({
        id: leftSetbackId,
        type: 'line',
        category: 'setback-line',
        layer: 'annotations',
        shape: 'line',
        points: [
          { x: streetWidth + sideSetback * propertyConfig.scale, y: streetWidth },
          { x: streetWidth + sideSetback * propertyConfig.scale, y: streetWidth + lotDepth * propertyConfig.scale }
        ],
        style: setbackTemplate.defaultStyle,
        metadata: {
          sideSetback: sideSetback,
          description: `Side setback: ${sideSetback}ft`
        },
        visible: true,
        locked: false,
        relatedRequirementIds: setbackTemplate.requirementIds,
      });
      
      const rightSetbackId = generateId();
      newElements.push({
        id: rightSetbackId,
        type: 'line',
        category: 'setback-line',
        layer: 'annotations',
        shape: 'line',
        points: [
          { x: streetWidth + (lotWidth - sideSetback) * propertyConfig.scale, y: streetWidth },
          { x: streetWidth + (lotWidth - sideSetback) * propertyConfig.scale, y: streetWidth + lotDepth * propertyConfig.scale }
        ],
        style: setbackTemplate.defaultStyle,
        metadata: {
          sideSetback: sideSetback,
          description: `Side setback: ${sideSetback}ft`
        },
        visible: true,
        locked: false,
        relatedRequirementIds: setbackTemplate.requirementIds,
      });
      
      // Rear setback
      const rearSetbackId = generateId();
      newElements.push({
        id: rearSetbackId,
        type: 'line',
        category: 'setback-line',
        layer: 'annotations',
        shape: 'line',
        points: [
          { x: streetWidth, y: streetWidth + (lotDepth - rearSetback) * propertyConfig.scale },
          { x: streetWidth + lotWidth * propertyConfig.scale, y: streetWidth + (lotDepth - rearSetback) * propertyConfig.scale }
        ],
        style: setbackTemplate.defaultStyle,
        metadata: {
          rearSetback: rearSetback,
          description: `Rear setback: ${rearSetback}ft`
        },
        visible: true,
        locked: false,
        relatedRequirementIds: setbackTemplate.requirementIds,
      });
    }
    
    // 5. Add annotation with property details (positioned below property to avoid street label interference)
    const propertyInfoId = generateId();
    const annotationY = frontStreetSide === 'top' 
      ? streetWidth + actualDepth * propertyConfig.scale + streetWidth + 20  // Below property if street is on top
      : streetWidth - 30; // Above property if street is elsewhere
    
    newElements.push({
      id: propertyInfoId,
      type: 'text',
      category: 'annotation',
      layer: 'annotations',
      shape: 'text',
      points: [
        { x: streetWidth + 10, y: annotationY }
      ],
      style: getDefaultStyle('text'),
      text: `Lot: ${Math.round(lotSqFt)} sq ft | Zoning: ${kingCounty.landData.zoning} | Building: ${buildingSqFt} sq ft`,
      fontSize: 12,
      visible: true,
      locked: false,
    });
    
    // Set all new elements
    setElements(newElements);
    saveToHistory();
    
    // Show success message or notification
    console.log(`✅ Loaded boilerplate for ${kingCounty.parcelData.siteAddress}`);
    console.log(`- Lot size: ${Math.round(actualWidth)}' x ${Math.round(actualDepth)}' (${lotSqFt} sq ft)`);
    console.log(`- Building: ${Math.round(buildingWidth)}' x ${Math.round(buildingDepth)}' (${buildingSqFt} sq ft)`);
    console.log(`- Year built: ${buildingInfo.yearBuilt}`);
    console.log(`- Bedrooms: ${buildingInfo.bedrooms}`);
    console.log(`- Orientation: North is ${northDirection.toUpperCase()}, front street on ${frontStreetSide}`);
    console.log(`- Zoning: ${kingCounty.landData.zoning}`);
  };

  // ============================================================================
  // KEYBOARD SHORTCUTS
  // ============================================================================

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      // Delete selected element
      if ((e.key === 'Delete' || e.key === 'Backspace') && selectedElementId) {
        e.preventDefault();
        deleteElement(selectedElementId);
      }
      
      // Undo/Redo
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        undo();
      } else if ((e.ctrlKey || e.metaKey) && (e.key === 'Z' || (e.key === 'z' && e.shiftKey))) {
        e.preventDefault();
        redo();
      }

      // Save (export JSON)
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        exportToJSON();
      }
      
      // Tool shortcuts (only if not pressing Ctrl/Cmd)
      if (!e.ctrlKey && !e.metaKey) {
        if (e.key === 'v' || e.key === 'V') {
          setSelectedTool('select');
          setSelectedTemplate(null);
        } else if (e.key === 'l' || e.key === 'L') {
          setSelectedTool('line');
        } else if (e.key === 'r' || e.key === 'R') {
          setSelectedTool('rectangle');
        } else if (e.key === 'c' || e.key === 'C') {
          setSelectedTool('circle');
        } else if (e.key === 't' || e.key === 'T') {
          setSelectedTool('text');
        } else if (e.key === 'm' || e.key === 'M') {
          setSelectedTool('measurement');
        }
      }
      
      // Escape to deselect
      if (e.key === 'Escape') {
        setSelectedElementId(null);
        setSelectedTool('select');
        setSelectedTemplate(null);
      }

      // Grid toggle
      if (e.key === 'g' || e.key === 'G') {
        setShowGrid(prev => !prev);
      }

      // Snap to grid toggle
      if (e.key === 's' || e.key === 'S') {
        setSnapToGrid(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedElementId, undo, redo, exportToJSON]);

  // ============================================================================
  // HELPER FUNCTIONS FOR DRAWING
  // ============================================================================

  const getElementTypeFromTool = (tool: DrawingTool): ElementType => {
    switch (tool) {
      case 'line': return 'line';
      case 'rectangle': return 'rectangle';
      case 'circle': return 'circle';
      case 'text': return 'text';
      default: return 'line';
    }
  };

  const getShapeFromTool = (tool: DrawingTool): DrawingElement['shape'] => {
    switch (tool) {
      case 'line': return 'line';
      case 'circle': return 'circle';
      case 'rectangle': return 'rectangle';
      case 'text': return 'text';
      default: return 'line';
    }
  };

  const getDefaultStyle = (tool: DrawingTool): DrawingElement['style'] => {
    const baseStyle = {
      stroke: '#2563eb',
      strokeWidth: 2,
      fill: 'transparent',
      opacity: 1,
    };

    switch (tool) {
      case 'line':
        return baseStyle;
      case 'rectangle':
        return { ...baseStyle, fill: '#dbeafe', opacity: 0.5 };
      case 'circle':
        return { ...baseStyle, fill: '#86efac', opacity: 0.3 };
      case 'text':
        return { ...baseStyle, stroke: '#000000', fill: '#000000', strokeWidth: 0 };
      default:
        return baseStyle;
    }
  };

  const calculateDimensions = (
    points: Point[], 
    tool: DrawingTool
  ): DrawingElement['dimensions'] | undefined => {
    if (points.length < 2) return undefined;

    const [p1, p2] = points;
    const widthPx = Math.abs(p2.x - p1.x);
    const heightPx = Math.abs(p2.y - p1.y);
    const length = calculateDistance(p1, p2);

    const widthFt = pixelsToFeet(widthPx);
    const heightFt = pixelsToFeet(heightPx);
    const area = widthFt * heightFt;

    return {
      width: widthFt,
      height: heightFt,
      length: pixelsToFeet(length),
      area: tool === 'rectangle' || tool === 'circle' ? area : undefined,
    };
  };

  // ============================================================================
  // RENDERING FUNCTIONS
  // ============================================================================

  const renderGrid = () => {
    if (!showGrid) return null;

    const lines = [];
    const totalWidth = canvasWidth + streetWidth * 2;
    const totalHeight = canvasHeight + streetWidth * 2;

    // Vertical lines
    for (let x = 0; x <= totalWidth; x += gridSize) {
      lines.push(
        <line
          key={`v-${x}`}
          x1={x}
          y1={0}
          x2={x}
          y2={totalHeight}
          stroke="#e5e7eb"
          strokeWidth={0.5}
        />
      );
    }

    // Horizontal lines
    for (let y = 0; y <= totalHeight; y += gridSize) {
      lines.push(
        <line
          key={`h-${y}`}
          x1={0}
          y1={y}
          x2={totalWidth}
          y2={y}
          stroke="#e5e7eb"
          strokeWidth={0.5}
        />
      );
    }

    // Major grid lines every 10 feet
    const majorGridSize = 10 * propertyConfig.scale;
    for (let x = 0; x <= totalWidth; x += majorGridSize) {
      lines.push(
        <line
          key={`vmajor-${x}`}
          x1={x}
          y1={0}
          x2={x}
          y2={totalHeight}
          stroke="#9ca3af"
          strokeWidth={1}
        />
      );
    }
    for (let y = 0; y <= totalHeight; y += majorGridSize) {
      lines.push(
        <line
          key={`hmajor-${y}`}
          x1={0}
          y1={y}
          x2={totalWidth}
          y2={y}
          stroke="#9ca3af"
          strokeWidth={1}
        />
      );
    }

    return <g className="grid">{lines}</g>;
  };

  const renderPropertyBoundary = () => {
    const x = streetWidth;
    const y = streetWidth;
    
    return (
      <g className="property-boundary">
        <rect
          x={x}
          y={y}
          width={canvasWidth}
          height={canvasHeight}
          stroke="#000000"
          strokeWidth={3}
          fill="transparent"
        />
        
        {/* Dimension labels */}
        {showDimensions && (
          <>
            {/* Width dimension (top) */}
            <text
              x={x + canvasWidth / 2}
              y={y - 10}
              textAnchor="middle"
              fontSize="12"
              fontWeight="bold"
              fill="#000"
            >
              {propertyConfig.width}'
            </text>
            
            {/* Height dimension (left) */}
            <text
              x={x - 15}
              y={y + canvasHeight / 2}
              textAnchor="middle"
              fontSize="12"
              fontWeight="bold"
              fill="#000"
              transform={`rotate(-90, ${x - 15}, ${y + canvasHeight / 2})`}
            >
              {propertyConfig.height}'
            </text>
          </>
        )}
      </g>
    );
  };

  const renderStreets = () => {
    const x = streetWidth;
    const y = streetWidth;
    const totalWidth = canvasWidth + streetWidth * 2;
    const totalHeight = canvasHeight + streetWidth * 2;
    
    const frontStreetSide = propertyConfig.frontStreetSide;

    return (
      <g className="streets">
        {/* Front street - position based on frontStreetSide */}
        {frontStreetSide === 'top' && (
          <>
            <rect
              x={0}
              y={0}
              width={totalWidth}
              height={streetWidth}
              fill="#6b7280"
              opacity={0.3}
            />
            {propertyConfig.frontStreet && (
              <text
                x={totalWidth / 2}
                y={streetWidth / 2 + 5}
                textAnchor="middle"
                fontSize="14"
                fontWeight="600"
                fill="#1f2937"
              >
                {propertyConfig.frontStreet}
              </text>
            )}
          </>
        )}
        
        {frontStreetSide === 'left' && (
          <>
            <rect
              x={0}
              y={0}
              width={streetWidth}
              height={totalHeight}
              fill="#6b7280"
              opacity={0.3}
            />
            {propertyConfig.frontStreet && (
              <text
                x={streetWidth / 2}
                y={totalHeight / 2}
                textAnchor="middle"
                fontSize="14"
                fontWeight="600"
                fill="#1f2937"
                transform={`rotate(-90, ${streetWidth / 2}, ${totalHeight / 2})`}
              >
                {propertyConfig.frontStreet}
              </text>
            )}
          </>
        )}

        {frontStreetSide === 'bottom' && (
          <>
            <rect
              x={0}
              y={totalHeight - streetWidth}
              width={totalWidth}
              height={streetWidth}
              fill="#6b7280"
              opacity={0.3}
            />
            {propertyConfig.frontStreet && (
              <text
                x={totalWidth / 2}
                y={totalHeight - streetWidth / 2 + 5}
                textAnchor="middle"
                fontSize="14"
                fontWeight="600"
                fill="#1f2937"
              >
                {propertyConfig.frontStreet}
              </text>
            )}
          </>
        )}
        
        {frontStreetSide === 'right' && (
          <>
            <rect
              x={totalWidth - streetWidth}
              y={0}
              width={streetWidth}
              height={totalHeight}
              fill="#6b7280"
              opacity={0.3}
            />
            {propertyConfig.frontStreet && (
              <text
                x={totalWidth - streetWidth / 2}
                y={totalHeight / 2}
                textAnchor="middle"
                fontSize="14"
                fontWeight="600"
                fill="#1f2937"
                transform={`rotate(-90, ${totalWidth - streetWidth / 2}, ${totalHeight / 2})`}
              >
                {propertyConfig.frontStreet}
              </text>
            )}
          </>
        )}

        {/* Rear street - opposite of front street */}
        {propertyConfig.rearStreet && frontStreetSide === 'top' && (
          <>
            <rect
              x={0}
              y={totalHeight - streetWidth}
              width={totalWidth}
              height={streetWidth}
              fill="#6b7280"
              opacity={0.3}
            />
            <text
              x={totalWidth / 2}
              y={totalHeight - streetWidth / 2 + 5}
              textAnchor="middle"
              fontSize="14"
              fontWeight="600"
              fill="#1f2937"
            >
              {propertyConfig.rearStreet}
            </text>
          </>
        )}
        
        {propertyConfig.rearStreet && frontStreetSide === 'bottom' && (
          <>
            <rect
              x={0}
              y={0}
              width={totalWidth}
              height={streetWidth}
              fill="#6b7280"
              opacity={0.3}
            />
            <text
              x={totalWidth / 2}
              y={streetWidth / 2 + 5}
              textAnchor="middle"
              fontSize="14"
              fontWeight="600"
              fill="#1f2937"
            >
              {propertyConfig.rearStreet}
            </text>
          </>
        )}

        {/* Left street - only show if not front street */}
        {propertyConfig.leftStreet && frontStreetSide !== 'left' && (
          <>
            <rect
              x={0}
              y={0}
              width={streetWidth}
              height={totalHeight}
              fill="#6b7280"
              opacity={0.3}
            />
            <text
              x={streetWidth / 2}
              y={totalHeight / 2}
              textAnchor="middle"
              fontSize="14"
              fontWeight="600"
              fill="#1f2937"
              transform={`rotate(-90, ${streetWidth / 2}, ${totalHeight / 2})`}
            >
              {propertyConfig.leftStreet}
            </text>
          </>
        )}

        {/* Right street - only show if not front street */}
        {propertyConfig.rightStreet && frontStreetSide !== 'right' && (
          <>
            <rect
              x={totalWidth - streetWidth}
              y={0}
              width={streetWidth}
              height={totalHeight}
              fill="#6b7280"
              opacity={0.3}
            />
            <text
              x={totalWidth - streetWidth / 2}
              y={totalHeight / 2}
              textAnchor="middle"
              fontSize="14"
              fontWeight="600"
              fill="#1f2937"
              transform={`rotate(-90, ${totalWidth - streetWidth / 2}, ${totalHeight / 2})`}
            >
              {propertyConfig.rightStreet}
            </text>
          </>
        )}
      </g>
    );
  };

  const renderNorthArrow = () => {
    const arrowX = canvasWidth + streetWidth + 40;
    const arrowY = streetWidth + 40;
    const arrowSize = 30;
    
    // Calculate rotation based on north direction
    // Default (north='north'): arrow points up (0 degrees)
    // north='east': arrow points right (90 degrees)
    // north='south': arrow points down (180 degrees)
    // north='west': arrow points left (270 degrees)
    const rotationMap: Record<CompassDirection, number> = {
      'north': 0,
      'east': 90,
      'south': 180,
      'west': 270,
    };
    const rotation = rotationMap[propertyConfig.northDirection];

    return (
      <g className="north-arrow" transform={`rotate(${rotation}, ${arrowX}, ${arrowY})`}>
        {/* Arrow */}
        <polygon
          points={`${arrowX},${arrowY - arrowSize} ${arrowX - 10},${arrowY} ${arrowX + 10},${arrowY}`}
          fill="#000"
          stroke="#000"
          strokeWidth={1}
        />
        <line
          x1={arrowX}
          y1={arrowY}
          x2={arrowX}
          y2={arrowY + arrowSize}
          stroke="#000"
          strokeWidth={2}
        />
        <text
          x={arrowX}
          y={arrowY - arrowSize - 10}
          textAnchor="middle"
          fontSize="16"
          fontWeight="bold"
          fill="#000"
          transform={`rotate(${-rotation}, ${arrowX}, ${arrowY - arrowSize - 10})`}
        >
          N
        </text>
      </g>
    );
  };

  const renderCompassLabels = () => {
    // Map from canvas position to actual compass direction
    const getCompassDirection = (canvasDirection: StreetSide): string => {
      const directionOffsets: Record<CompassDirection, number> = {
        'north': 0,
        'east': 1,
        'south': 2,
        'west': 3,
      };
      const canvasPositions: StreetSide[] = ['top', 'right', 'bottom', 'left'];
      const compassDirections = ['N', 'E', 'S', 'W'];
      
      const canvasIndex = canvasPositions.indexOf(canvasDirection);
      const offset = directionOffsets[propertyConfig.northDirection];
      const actualIndex = (canvasIndex - offset + 4) % 4;
      
      return compassDirections[actualIndex];
    };

    const totalWidth = canvasWidth + streetWidth * 2;
    const totalHeight = canvasHeight + streetWidth * 2;
    const x = streetWidth;
    const y = streetWidth;

    return (
      <g className="compass-labels" opacity={0.5}>
        {/* Top */}
        <text
          x={totalWidth / 2}
          y={y - 8}
          textAnchor="middle"
          fontSize="12"
          fontWeight="600"
          fill="#4b5563"
        >
          {getCompassDirection('top')}
        </text>
        
        {/* Right */}
        <text
          x={x + canvasWidth + 8}
          y={totalHeight / 2}
          textAnchor="start"
          fontSize="12"
          fontWeight="600"
          fill="#4b5563"
        >
          {getCompassDirection('right')}
        </text>
        
        {/* Bottom */}
        <text
          x={totalWidth / 2}
          y={y + canvasHeight + 18}
          textAnchor="middle"
          fontSize="12"
          fontWeight="600"
          fill="#4b5563"
        >
          {getCompassDirection('bottom')}
        </text>
        
        {/* Left */}
        <text
          x={x - 8}
          y={totalHeight / 2}
          textAnchor="end"
          fontSize="12"
          fontWeight="600"
          fill="#4b5563"
        >
          {getCompassDirection('left')}
        </text>
      </g>
    );
  };

  const renderElement = (element: DrawingElement) => {
    const { shape, points, style } = element;
    const isSelected = selectedElementId === element.id;
    const isHighlighted = highlightedElementId === element.id;

    if (shape === 'line' && points.length >= 2) {
      return (
        <g key={element.id}>
          {isHighlighted && (
            <line
              x1={points[0].x}
              y1={points[0].y}
              x2={points[1].x}
              y2={points[1].y}
              stroke="#fbbf24"
              strokeWidth={style.strokeWidth + 6}
              opacity={0.6}
              className="animate-pulse"
            />
          )}
          <line
            x1={points[0].x}
            y1={points[0].y}
            x2={points[1].x}
            y2={points[1].y}
            {...style}
            strokeDasharray={style.dashArray}
            onClick={() => selectedTool === 'select' && setSelectedElementId(element.id)}
            style={{ cursor: selectedTool === 'select' ? 'grab' : 'default' }}
          />
          {isSelected && (
            <>
              <circle cx={points[0].x} cy={points[0].y} r={4} fill="#3b82f6" />
              <circle cx={points[1].x} cy={points[1].y} r={4} fill="#3b82f6" />
            </>
          )}
        </g>
      );
    }

    if (shape === 'rectangle' && points.length >= 2) {
      const x = Math.min(points[0].x, points[1].x);
      const y = Math.min(points[0].y, points[1].y);
      const width = Math.abs(points[1].x - points[0].x);
      const height = Math.abs(points[1].y - points[0].y);

      return (
        <g key={element.id}>
          {isHighlighted && (
            <rect
              x={x - 4}
              y={y - 4}
              width={width + 8}
              height={height + 8}
              fill="#fbbf24"
              stroke="#fbbf24"
              strokeWidth={4}
              opacity={0.4}
              className="animate-pulse"
            />
          )}
          <rect
            x={x}
            y={y}
            width={width}
            height={height}
            {...style}
            strokeDasharray={style.dashArray}
            onClick={() => selectedTool === 'select' && setSelectedElementId(element.id)}
            style={{ cursor: selectedTool === 'select' ? 'grab' : 'default' }}
          />
          {isSelected && (
            <rect
              x={x - 2}
              y={y - 2}
              width={width + 4}
              height={height + 4}
              fill="none"
              stroke="#3b82f6"
              strokeWidth={2}
              strokeDasharray="5,5"
            />
          )}
          {showDimensions && element.dimensions && width > 10 && height > 10 && (
            <>
              <text
                x={x + width / 2}
                y={y - 5}
                textAnchor="middle"
                fontSize="10"
                fontWeight="600"
                fill="#374151"
              >
                {element.dimensions.width?.toFixed(1)}'
              </text>
              <text
                x={x - 5}
                y={y + height / 2}
                textAnchor="end"
                fontSize="10"
                fontWeight="600"
                fill="#374151"
              >
                {element.dimensions.height?.toFixed(1)}'
              </text>
            </>
          )}
          {/* {element.label && (
            <text
              x={x + width / 2}
              y={y + height / 2}
              textAnchor="middle"
              fontSize="12"
              fontWeight="600"
              fill="#1f2937"
            >
              {element.label}
            </text>
          )} */}
        </g>
      );
    }

    if (shape === 'circle' && points.length >= 2) {
      const radius = calculateDistance(points[0], points[1]);
      return (
        <g key={element.id}>
          {isHighlighted && (
            <circle
              cx={points[0].x}
              cy={points[0].y}
              r={radius + 6}
              fill="#fbbf24"
              stroke="#fbbf24"
              strokeWidth={4}
              opacity={0.4}
              className="animate-pulse"
            />
          )}
          <circle
            cx={points[0].x}
            cy={points[0].y}
            r={radius}
            {...style}
            strokeDasharray={style.dashArray}
            onClick={() => selectedTool === 'select' && setSelectedElementId(element.id)}
            style={{ cursor: selectedTool === 'select' ? 'grab' : 'default' }}
          />
          {isSelected && (
            <circle
              cx={points[0].x}
              cy={points[0].y}
              r={radius + 3}
              fill="none"
              stroke="#3b82f6"
              strokeWidth={2}
              strokeDasharray="5,5"
            />
          )}
          {showDimensions && element.dimensions && (
            <text
              x={points[0].x}
              y={points[0].y - radius - 8}
              textAnchor="middle"
              fontSize="10"
              fontWeight="600"
              fill="#374151"
            >
              ⌀ {(pixelsToFeet(radius) * 2).toFixed(1)}'
            </text>
          )}
        </g>
      );
    }

    if (shape === 'text' && points.length >= 1 && element.text) {
      return (
        <g key={element.id}>
          {isHighlighted && (
            <rect
              x={points[0].x - 8}
              y={points[0].y - (element.fontSize || 16) - 3}
              width={element.text.length * (element.fontSize || 16) * 0.6 + 10}
              height={(element.fontSize || 16) + 10}
              fill="#fbbf24"
              stroke="#fbbf24"
              strokeWidth={3}
              opacity={0.4}
              className="animate-pulse"
              rx={4}
            />
          )}
          <text
            x={points[0].x}
            y={points[0].y}
            fontSize={element.fontSize || 16}
            fontWeight="500"
            fill={style.fill}
            onClick={() => selectedTool === 'select' && setSelectedElementId(element.id)}
            style={{ cursor: selectedTool === 'select' ? 'pointer' : 'default', userSelect: 'none' }}
          >
            {element.text}
          </text>
          {isSelected && (
            <rect
              x={points[0].x - 5}
              y={points[0].y - (element.fontSize || 16)}
              width={element.text.length * (element.fontSize || 16) * 0.6}
              height={(element.fontSize || 16) + 5}
              fill="none"
              stroke="#3b82f6"
              strokeWidth={2}
              strokeDasharray="5,5"
            />
          )}
        </g>
      );
    }

    return null;
  };

  const renderCurrentDrawing = () => {
    if (!isDrawing || currentPoints.length === 0) return null;

    const style = getDefaultStyle(selectedTool);
    const shape = getShapeFromTool(selectedTool);

    // Render lines
    if (shape === 'line' && currentPoints.length === 2) {
      return (
        <line
          x1={currentPoints[0].x}
          y1={currentPoints[0].y}
          x2={currentPoints[1].x}
          y2={currentPoints[1].y}
          {...style}
          opacity={0.5}
        />
      );
    }

    // Render rectangles (structure, driveway, parking, deck, patio, etc.)
    if (shape === 'rectangle' && currentPoints.length === 2) {
      const x = Math.min(currentPoints[0].x, currentPoints[1].x);
      const y = Math.min(currentPoints[0].y, currentPoints[1].y);
      const width = Math.abs(currentPoints[1].x - currentPoints[0].x);
      const height = Math.abs(currentPoints[1].y - currentPoints[0].y);

      return (
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          {...style}
          opacity={0.5}
        />
      );
    }

    // Render circles (tree, circle tool)
    if (shape === 'circle' && currentPoints.length === 2) {
      const radius = calculateDistance(currentPoints[0], currentPoints[1]);
      return (
        <circle
          cx={currentPoints[0].x}
          cy={currentPoints[0].y}
          r={radius}
          {...style}
          opacity={0.5}
        />
      );
    }

    return null;
  };

  // ============================================================================
  // RENDER COMPONENT
  // ============================================================================

  return (
    <div className="site-map-designer flex flex-col h-screen bg-gray-50">
      {/* Top Section: Sidebars and Canvas */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Tools & Configuration */}
        <div className="w-80 bg-white border-r border-gray-200 overflow-y-auto flex-shrink-0">
        <div className="p-4 space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Site Map Designer</h1>
            <p className="text-sm text-gray-600 mt-1">Professional site plan design tool</p>
          </div>

          {/* Property Configuration */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">Property Details</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Property Width (feet)
              </label>
              <input
                type="number"
                value={propertyConfig.width}
                onChange={(e) => setPropertyConfig(prev => ({ ...prev, width: Number(e.target.value) }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                min="10"
                max="500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Property Height (feet)
              </label>
              <input
                type="number"
                value={propertyConfig.height}
                onChange={(e) => setPropertyConfig(prev => ({ ...prev, height: Number(e.target.value) }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                min="10"
                max="500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Scale (pixels per foot)
              </label>
              <select
                value={propertyConfig.scale}
                onChange={(e) => setPropertyConfig(prev => ({ ...prev, scale: Number(e.target.value) }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value={2}>1/8" = 1' (Small)</option>
                <option value={4}>1/4" = 1' (Standard)</option>
                <option value={6}>3/8" = 1' (Medium)</option>
                <option value={8}>1/2" = 1' (Large)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Project Address
              </label>
              <input
                type="text"
                value={propertyConfig.address}
                onChange={(e) => setPropertyConfig(prev => ({ ...prev, address: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="123 Main St, Seattle, WA"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Front Street Name
              </label>
              <input
                type="text"
                value={propertyConfig.frontStreet}
                onChange={(e) => setPropertyConfig(prev => ({ ...prev, frontStreet: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Main Street"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Rear Street (optional)
              </label>
              <input
                type="text"
                value={propertyConfig.rearStreet || ''}
                onChange={(e) => setPropertyConfig(prev => ({ ...prev, rearStreet: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Alley or Street Name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                North Direction
              </label>
              <select
                value={propertyConfig.northDirection}
                onChange={(e) => setPropertyConfig(prev => ({ ...prev, northDirection: e.target.value as CompassDirection }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="north">⬆️ North (Up)</option>
                <option value="east">➡️ East (Right)</option>
                <option value="south">⬇️ South (Down)</option>
                <option value="west">⬅️ West (Left)</option>
              </select>
              <p className="text-xs text-gray-500 mt-1">Which direction is north on your map?</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Front Street Side
              </label>
              <select
                value={propertyConfig.frontStreetSide}
                onChange={(e) => setPropertyConfig(prev => ({ ...prev, frontStreetSide: e.target.value as StreetSide }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="top">Top</option>
                <option value="bottom">Bottom</option>
                <option value="left">Left</option>
                <option value="right">Right</option>
              </select>
              <p className="text-xs text-gray-500 mt-1">Which side has the front street?</p>
            </div>
          </div>

          {/* Drawing Tools */}
          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-gray-900">Drawing Tools</h2>
            
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setSelectedTool('select')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  selectedTool === 'select'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                ✋ Select
              </button>
              <button
                onClick={() => setSelectedTool('line')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  selectedTool === 'line'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                📏 Line
              </button>
              <button
                onClick={() => setSelectedTool('rectangle')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  selectedTool === 'rectangle'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                ▭ Rectangle
              </button>
              <button
                onClick={() => setSelectedTool('circle')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  selectedTool === 'circle'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                ● Circle
              </button>
              <button
                onClick={() => setSelectedTool('text')}
                className={`px-3 py-2 rounded-md text-sm font-medium col-span-2 ${
                  selectedTool === 'text'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                📝 Text Box
              </button>
            </div>
          </div>


          {/* Layer Control */}
          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-gray-900">Active Layer</h2>
            <div className="grid grid-cols-2 gap-2">
              {(['existing', 'proposed', 'utilities', 'trees', 'annotations', 'easements', 'environmental'] as LayerType[]).map(layer => (
                <button
                  key={layer}
                  onClick={() => setActiveLayer(layer)}
                  className={`px-3 py-2 rounded-md text-xs font-medium capitalize ${
                    activeLayer === layer
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {layer.replace('-', ' ')}
                </button>
              ))}
            </div>
            
            <div className="mt-3 space-y-1.5">
              <h3 className="text-sm font-semibold text-gray-700">Layer Visibility</h3>
              {(['existing', 'proposed', 'utilities', 'trees', 'annotations', 'easements', 'environmental'] as LayerType[]).map(layer => (
                <label key={layer} className="flex items-center text-xs">
                  <input
                    type="checkbox"
                    checked={layerVisibility[layer]}
                    onChange={(e) => setLayerVisibility(prev => ({ ...prev, [layer]: e.target.checked }))}
                    className="mr-2"
                  />
                  <span className="text-gray-700 capitalize">{layer.replace('-', ' ')}</span>
                  <span className="ml-auto text-gray-500">
                    ({elements.filter(el => el.layer === layer).length})
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Checklist Progress */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Checklist Progress</h2>
              <span className="text-sm font-semibold text-blue-600">{completionPercentage}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
            <p className="text-xs text-gray-600">
              {completedRequirements} of {totalRequirements} required items completed
            </p>
            <button
              onClick={() => setShowChecklistPanel(!showChecklistPanel)}
              className="w-full px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 font-medium text-sm"
            >
              {showChecklistPanel ? '✓ Hide' : '📋 Show'} Checklist
            </button>
          </div>

          {/* View Options */}
          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-gray-900">View Options</h2>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={showGrid}
                  onChange={(e) => setShowGrid(e.target.checked)}
                  className="mr-2"
                />
                <span className="text-sm text-gray-700">Show Grid</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={showDimensions}
                  onChange={(e) => setShowDimensions(e.target.checked)}
                  className="mr-2"
                />
                <span className="text-sm text-gray-700">Show Dimensions</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={snapToGrid}
                  onChange={(e) => setSnapToGrid(e.target.checked)}
                  className="mr-2"
                />
                <span className="text-sm text-gray-700">Snap to Grid</span>
              </label>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-gray-900">Actions</h2>
            <div className="space-y-2">
              <button
                onClick={loadBoilerplate}
                className="w-full px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 font-medium"
              >
                🏗️ Load Boilerplate
              </button>
              <button
                onClick={exportToSVG}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium"
              >
                📥 Export as SVG
              </button>
              <button
                onClick={exportToJSON}
                className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 font-medium"
              >
                💾 Save as JSON
              </button>
              <button
                onClick={deleteAllElements}
                className="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 font-medium"
              >
                🗑️ Clear All
              </button>
            </div>
          </div>

          {/* Elements List */}
          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-gray-900">Elements ({elements.length})</h2>
            <div className="max-h-64 overflow-y-auto space-y-1">
              {elements.length === 0 ? (
                <p className="text-sm text-gray-500 italic">No elements yet. Use templates or draw tools to add elements.</p>
              ) : (
                elements.map(element => {
                  const template = ELEMENT_TEMPLATES.find(t => t.category === element.category);
                  return (
                    <div
                      key={element.id}
                      onClick={() => handleElementListClick(element.id)}
                      className={`flex items-center justify-between p-2 rounded text-sm cursor-pointer transition-all ${
                        selectedElementId === element.id
                          ? 'bg-blue-100 border border-blue-300'
                          : 'bg-gray-50 hover:bg-gray-100'
                      } ${!element.visible ? 'opacity-50' : ''}`}
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1">
                          {template && <span>{template.icon}</span>}
                          <span className="font-medium truncate capitalize">
                            {element.category.replace('-', ' ')}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-600 mt-0.5">
                          <span className="capitalize">{element.layer}</span>
                          {element.dimensions && element.dimensions.area && (
                            <span>• {element.dimensions.area.toFixed(0)} sq ft</span>
                          )}
                          {element.metadata?.structureType && (
                            <span>• {element.metadata.structureType}</span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setElements(prev => prev.map(el => 
                              el.id === element.id ? { ...el, visible: !el.visible } : el
                            ));
                          }}
                          className="text-gray-500 hover:text-gray-700 p-1"
                          title={element.visible ? 'Hide' : 'Show'}
                        >
                          {element.visible ? '👁️' : '👁️‍🗨️'}
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteElement(element.id);
                          }}
                          className="text-red-600 hover:text-red-800 p-1"
                          title="Delete element"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Keyboard Shortcuts */}
          <div className="space-y-2">
            <h2 className="text-lg font-semibold text-gray-900">Shortcuts</h2>
            <div className="text-xs text-gray-600 space-y-1 max-h-48 overflow-y-auto">
              <div className="font-semibold text-gray-700 mt-2">Tools</div>
              <div className="flex justify-between">
                <span>Select:</span>
                <kbd className="px-1.5 py-0.5 bg-gray-200 rounded font-mono">V</kbd>
              </div>
              <div className="flex justify-between">
                <span>Line:</span>
                <kbd className="px-1.5 py-0.5 bg-gray-200 rounded font-mono">L</kbd>
              </div>
              <div className="flex justify-between">
                <span>Rectangle:</span>
                <kbd className="px-1.5 py-0.5 bg-gray-200 rounded font-mono">R</kbd>
              </div>
              <div className="flex justify-between">
                <span>Circle:</span>
                <kbd className="px-1.5 py-0.5 bg-gray-200 rounded font-mono">C</kbd>
              </div>
              <div className="flex justify-between">
                <span>Text:</span>
                <kbd className="px-1.5 py-0.5 bg-gray-200 rounded font-mono">T</kbd>
              </div>
              <div className="flex justify-between">
                <span>Measure:</span>
                <kbd className="px-1.5 py-0.5 bg-gray-200 rounded font-mono">M</kbd>
              </div>
              
              <div className="font-semibold text-gray-700 mt-2">Actions</div>
              <div className="flex justify-between">
                <span>Undo:</span>
                <kbd className="px-1.5 py-0.5 bg-gray-200 rounded font-mono">Ctrl+Z</kbd>
              </div>
              <div className="flex justify-between">
                <span>Redo:</span>
                <kbd className="px-1.5 py-0.5 bg-gray-200 rounded font-mono">Ctrl+Shift+Z</kbd>
              </div>
              <div className="flex justify-between">
                <span>Save:</span>
                <kbd className="px-1.5 py-0.5 bg-gray-200 rounded font-mono">Ctrl+S</kbd>
              </div>
              <div className="flex justify-between">
                <span>Delete:</span>
                <kbd className="px-1.5 py-0.5 bg-gray-200 rounded font-mono">Del</kbd>
              </div>
              <div className="flex justify-between">
                <span>Deselect:</span>
                <kbd className="px-1.5 py-0.5 bg-gray-200 rounded font-mono">Esc</kbd>
              </div>
              
              <div className="font-semibold text-gray-700 mt-2">View</div>
              <div className="flex justify-between">
                <span>Toggle Grid:</span>
                <kbd className="px-1.5 py-0.5 bg-gray-200 rounded font-mono">G</kbd>
              </div>
              <div className="flex justify-between">
                <span>Toggle Snap:</span>
                <kbd className="px-1.5 py-0.5 bg-gray-200 rounded font-mono">S</kbd>
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="pt-4 border-t border-gray-200 space-y-2">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <p className="text-xs text-gray-500">Elements</p>
                <p className="font-semibold text-gray-900">{elements.length}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Visible</p>
                <p className="font-semibold text-gray-900">{visibleElements.length}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Scale</p>
                <p className="font-semibold text-gray-900">{propertyConfig.scale}px/ft</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Grid</p>
                <p className="font-semibold text-gray-900">5 feet</p>
              </div>
            </div>
            
            <div className="pt-2 border-t border-gray-200">
              <p className="text-xs text-gray-500">
                Active Tool: <span className="font-semibold text-gray-900 capitalize">{selectedTool}</span>
              </p>
              {selectedTemplate && (
                <p className="text-xs text-blue-600 mt-1">
                  Template: {selectedTemplate.icon} {selectedTemplate.name}
                </p>
              )}
              {selectedElementId && selectedElement && (
                <div className="text-xs mt-2 bg-blue-50 p-3 rounded space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-blue-900">Selected Element</p>
                    {(selectedElement.shape === 'rectangle' || selectedElement.shape === 'circle' || selectedElement.shape === 'line') && (
                      <button
                        onClick={() => rotateElement(selectedElementId)}
                        className="px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-xs flex items-center gap-1"
                        title="Rotate 90°"
                      >
                        ↻ 90°
                      </button>
                    )}
                  </div>
                  
                  <p className="text-blue-700 capitalize">{selectedElement.category.replace('-', ' ')}</p>
                  
                  {/* Dimension Inputs */}
                  {selectedElement.dimensions && (selectedElement.shape === 'rectangle' || selectedElement.shape === 'circle') && (
                    <div className="space-y-2 pt-2 border-t border-blue-200">
                      <p className="font-semibold text-blue-900">Dimensions</p>
                      
                      {selectedElement.shape === 'rectangle' && (
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-blue-700 mb-1">Width (ft)</label>
                            <input
                              type="number"
                              value={selectedElement.dimensions.width?.toFixed(1) || '0'}
                              onChange={(e) => {
                                const newWidth = parseFloat(e.target.value) || 0;
                                if (newWidth > 0 && selectedElement.dimensions?.height) {
                                  updateElementDimensions(selectedElementId, newWidth, selectedElement.dimensions.height);
                                }
                              }}
                              className="w-full px-2 py-1 border border-blue-300 rounded text-xs"
                              step="0.1"
                              min="0.1"
                            />
                          </div>
                          <div>
                            <label className="block text-blue-700 mb-1">Height (ft)</label>
                            <input
                              type="number"
                              value={selectedElement.dimensions.height?.toFixed(1) || '0'}
                              onChange={(e) => {
                                const newHeight = parseFloat(e.target.value) || 0;
                                if (newHeight > 0 && selectedElement.dimensions?.width) {
                                  updateElementDimensions(selectedElementId, selectedElement.dimensions.width, newHeight);
                                }
                              }}
                              className="w-full px-2 py-1 border border-blue-300 rounded text-xs"
                              step="0.1"
                              min="0.1"
                            />
                          </div>
                        </div>
                      )}
                      
                      {selectedElement.shape === 'circle' && (
                        <div>
                          <label className="block text-blue-700 mb-1">Diameter (ft)</label>
                          <input
                            type="number"
                            value={selectedElement.dimensions.width?.toFixed(1) || '0'}
                            onChange={(e) => {
                              const newDiameter = parseFloat(e.target.value) || 0;
                              if (newDiameter > 0) {
                                updateElementDimensions(selectedElementId, newDiameter, newDiameter);
                              }
                            }}
                            className="w-full px-2 py-1 border border-blue-300 rounded text-xs"
                            step="0.1"
                            min="0.1"
                          />
                        </div>
                      )}
                      
                      {selectedElement.dimensions.area && (
                        <p className="text-blue-600 text-xs pt-1">
                          Area: <span className="font-semibold">{selectedElement.dimensions.area.toFixed(1)} sq ft</span>
                        </p>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-2 pt-2 border-t border-gray-200">
              <button
                onClick={undo}
                disabled={historyIndex <= 0}
                className="flex-1 px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                title="Undo (Ctrl+Z)"
              >
                ↶ Undo
              </button>
              <button
                onClick={redo}
                disabled={historyIndex >= history.length - 1}
                className="flex-1 px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                title="Redo (Ctrl+Shift+Z)"
              >
                ↷ Redo
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Canvas Area */}
      <div className="flex-1 overflow-auto bg-white flex flex-col" ref={canvasContainerRef}>
        {/* Text Input Dialog */}
        {showTextDialog && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 shadow-xl max-w-md w-full mx-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Add Text</h3>
              <input
                type="text"
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleTextSubmit();
                  } else if (e.key === 'Escape') {
                    setShowTextDialog(false);
                    setPendingTextElement(null);
                    setTextInput('');
                  }
                }}
                placeholder="Enter your text..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoFocus
              />
              <div className="flex gap-2 justify-end">
                <button
                  onClick={() => {
                    setShowTextDialog(false);
                    setPendingTextElement(null);
                    setTextInput('');
                  }}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleTextSubmit}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Add Text
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Checklist Panel */}
        {showChecklistPanel && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-green-50">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Site Map Requirements Checklist</h2>
                  <p className="text-sm text-gray-600 mt-1">
                    Track your progress: {completedRequirements} of {totalRequirements} completed ({completionPercentage}%)
                  </p>
                </div>
                <button
                  onClick={() => setShowChecklistPanel(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ✕
                </button>
              </div>

              {/* Progress Bar */}
              <div className="px-6 py-3 bg-gray-50 border-b border-gray-200">
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div 
                    className="bg-gradient-to-r from-blue-600 to-green-600 h-4 rounded-full transition-all duration-300 flex items-center justify-end pr-2"
                    style={{ width: `${completionPercentage}%` }}
                  >
                    {completionPercentage > 10 && (
                      <span className="text-white text-xs font-bold">{completionPercentage}%</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Checklist Content */}
              <div className="flex-1 overflow-y-auto p-6">
                <div className="space-y-4">
                  {currentRequirements.map((req) => {
                    const progress = checklistProgress[req.id] || { completed: false, linkedElementIds: [] };
                    const linkedElements = elements.filter(el => progress.linkedElementIds.includes(el.id));
                    
                    return (
                      <div 
                        key={req.id}
                        className={`border-2 rounded-lg p-4 transition-all ${
                          progress.completed 
                            ? 'border-green-500 bg-green-50' 
                            : req.required 
                            ? 'border-red-200 bg-white' 
                            : 'border-gray-200 bg-gray-50'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <input
                            type="checkbox"
                            checked={progress.completed}
                            onChange={(e) => updateChecklistItem(req.id, e.target.checked)}
                            className="mt-1 w-5 h-5 text-green-600 rounded focus:ring-green-500"
                          />
                          <div className="flex-1">
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex-1">
                                <h3 className="font-semibold text-gray-900">
                                  {req.id}. {req.category}
                                </h3>
                                <p className="text-sm text-gray-700 mt-1">{req.description}</p>
                              </div>
                              <div className="flex-shrink-0">
                                {req.required ? (
                                  <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-700">
                                    Required
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-amber-100 text-amber-700">
                                    Conditional
                                  </span>
                                )}
                              </div>
                            </div>
                            
                            {linkedElements.length > 0 && (
                              <div className="mt-2 pt-2 border-t border-gray-200">
                                <p className="text-xs font-semibold text-gray-700 mb-1">
                                  Linked Elements ({linkedElements.length}):
                                </p>
                                <div className="flex flex-wrap gap-1">
                                  {linkedElements.map(el => {
                                    const template = ELEMENT_TEMPLATES.find(t => t.category === el.category);
                                    return (
                                      <span 
                                        key={el.id}
                                        className="inline-flex items-center px-2 py-1 rounded text-xs bg-blue-100 text-blue-700"
                                      >
                                        {template?.icon} {el.category.replace('-', ' ')}
                                      </span>
                                    );
                                  })}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Footer */}
              <div className="border-t border-gray-200 p-4 bg-gray-50 flex justify-between items-center">
                <div className="text-sm text-gray-600">
                  <span className="font-semibold">{completedRequirements}</span> of <span className="font-semibold">{totalRequirements}</span> required items completed
                </div>
                <button
                  onClick={() => setShowChecklistPanel(false)}
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Top Bar with Legend and Info */}
        <div className="flex-shrink-0 border-b border-gray-200 px-8 py-4">
          <div className="flex items-center justify-between gap-8">
            {/* Legend */}
            <div className="flex items-center gap-6">
              <h3 className="font-semibold text-gray-900 text-sm">Legend:</h3>
              <div className="flex items-center gap-4 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-1 bg-blue-600"></div>
                  <span>Line</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-blue-200 border-2 border-blue-600"></div>
                  <span>Rectangle</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-green-300 border-2 border-blue-600"></div>
                  <span>Circle</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Aa</span>
                  <span>Text</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-amber-100 border-2 border-amber-600"></div>
                  <span>Existing</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-100 border-2 border-green-600"></div>
                  <span>Proposed</span>
                </div>
              </div>
            </div>

            {/* Canvas Info */}
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span>Width: {propertyConfig.width} ft</span>
              <span>Height: {propertyConfig.height} ft</span>
              <span>Scale: {propertyConfig.scale}px/ft</span>
            </div>
          </div>
        </div>

        {/* Canvas Container - centered and scrollable */}
        <div className="flex-1 overflow-auto p-8 flex items-start justify-center">
          <div className="inline-block">
            <svg
              ref={svgRef}
              width={canvasWidth + streetWidth * 2 + 100}
              height={canvasHeight + streetWidth * 2 + 100}
              className="border border-gray-300 shadow-lg"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              style={{ 
                cursor: isDragging 
                  ? 'grabbing' 
                  : selectedTool === 'select' 
                    ? (selectedElementId ? 'grab' : 'default')
                    : 'crosshair' 
              }}
            >
              {renderGrid()}
              {renderStreets()}
              {renderPropertyBoundary()}
              {renderNorthArrow()}
              {renderCompassLabels()}
              
              {/* Render all visible elements */}
              <g className="elements">
                {visibleElements.map(element => renderElement(element))}
              </g>

              {/* Render current drawing */}
              {renderCurrentDrawing()}
            </svg>

            {/* Status Bar */}
            <div className="mt-4 text-sm text-gray-600">
              {propertyConfig.address && (
                <p className="font-semibold">{propertyConfig.address}</p>
              )}
              {isDrawing && currentPoints.length > 0 && (
                <p className="text-blue-600 font-medium mt-1">
                  Drawing... {currentPoints.length === 2 ? `${pixelsToFeet(Math.abs(currentPoints[1].x - currentPoints[0].x)).toFixed(1)}' × ${pixelsToFeet(Math.abs(currentPoints[1].y - currentPoints[0].y)).toFixed(1)}'` : 'Click and drag'}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

        {/* Right Sidebar - Requirements Visualizer */}
        <div className="w-96 border-l border-gray-200 overflow-hidden flex-shrink-0">
          <SiteMapRequirementsVisualizer 
            compact={true}
            selectedType={selectedRequirementType}
            onTypeChange={setSelectedRequirementType}
          />
        </div>
      </div>

      {/* Bottom Sidebar - Element Templates Library */}
      <div className={`border-t border-gray-200 bg-white transition-all duration-300 ${
        showTemplateLibrary ? 'h-64' : 'h-12'
      }`}>
        {/* Header Bar */}
        <div className="h-12 flex items-center justify-between px-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-bold text-gray-900">📚 Element Templates Library</h2>
            {selectedTemplate && (
              <div className="flex items-center gap-2 px-3 py-1 bg-blue-100 rounded-full">
                <span className="text-sm">
                  <span className="mr-1">{selectedTemplate.icon}</span>
                  <span className="font-medium text-blue-900">{selectedTemplate.name}</span>
                </span>
                <button
                  onClick={() => setSelectedTemplate(null)}
                  className="text-blue-600 hover:text-blue-800 font-bold"
                  title="Clear template selection"
                >
                  ✕
                </button>
              </div>
            )}
          </div>
          <button
            onClick={() => setShowTemplateLibrary(!showTemplateLibrary)}
            className="px-4 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium text-sm transition-colors"
          >
            {showTemplateLibrary ? '▼ Hide Templates' : '▲ Show Templates'}
          </button>
        </div>

        {/* Templates Content */}
        {showTemplateLibrary && (
          <div className="h-52 overflow-y-auto p-4">
            <div className="flex gap-4">
              {['Structures', 'Paved Areas', 'Trees', 'Utilities', 'Other'].map(category => {
                const categoryTemplates = ELEMENT_TEMPLATES.filter(t => {
                  if (category === 'Structures') return t.category.includes('structure');
                  if (category === 'Paved Areas') return ['driveway', 'parking', 'paved-area'].includes(t.category);
                  if (category === 'Trees') return t.category === 'tree';
                  if (category === 'Utilities') return t.category.startsWith('utility-');
                  return ['property-line', 'setback-line', 'easement', 'pedestrian-path'].includes(t.category);
                });
                
                if (categoryTemplates.length === 0) return null;
                
                return (
                  <div key={category} className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide border-b-2 border-blue-200 pb-1">
                      {category}
                    </h3>
                    <div className="space-y-1.5">
                      {categoryTemplates.map(template => (
                        <button
                          key={template.id}
                          onClick={() => {
                            setSelectedTemplate(template);
                            setSelectedTool('rectangle');
                            setActiveLayer(template.layer);
                          }}
                          className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all hover:scale-102 ${
                            selectedTemplate?.id === template.id
                              ? 'bg-blue-600 text-white shadow-lg scale-105'
                              : 'bg-gray-50 hover:bg-blue-50 text-gray-700 border border-gray-200'
                          }`}
                          title={template.description}
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{template.icon}</span>
                            <span className="font-medium">{template.name}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SiteMapDesigner;

