// ============================================================================
// SITE MAP DESIGNER - MAIN ORCHESTRATOR COMPONENT
// ============================================================================

import React, { useState, useRef, useCallback } from 'react';
import {
  SITE_MAP_REQUIREMENTS,
  ENHANCED_SITE_MAP_REQUIREMENTS,
  ENVIRONMENTAL_CRITICAL_AREA_SITE_MAP_REQUIREMENTS,
  type SiteMapRequirement
} from '../data/site-map-requirements';
import SiteMapRequirementsVisualizer from './SiteMapRequirementsVisualizer';

// Import types
import {
  DrawingTool,
  LayerType,
  RequirementType,
  Point,
  DrawingElement,
  PropertyConfig,
  ChecklistProgress,
  ElementTemplate,
} from './SiteMapDesigner/types';

// Import utility functions
import {
  snapToGridPoint,
  getSVGPoint,
  pixelsToFeet,
  generateId,
  calculateDistance,
  calculateElementDimensions,
} from './SiteMapDesigner/geometry';

import {
  getElementTypeFromTool,
  getShapeFromTool,
  getDefaultStyle,
} from './SiteMapDesigner/drawing-helpers';

import { exportToSVG, exportToJSON } from './SiteMapDesigner/export-utils';
import { ELEMENT_TEMPLATES } from './SiteMapDesigner/templates';

// Import hooks
import { useHistoryManager } from './SiteMapDesigner/hooks/useHistoryManager';
import { useChecklistProgress } from './SiteMapDesigner/hooks/useChecklistProgress';
import { useKeyboardShortcuts } from './SiteMapDesigner/hooks/useKeyboardShortcuts';

// Import components
import { PropertyConfigPanel } from './SiteMapDesigner/components/PropertyConfigPanel';
import { DrawingToolsPanel } from './SiteMapDesigner/components/DrawingToolsPanel';
import { ElementsList } from './SiteMapDesigner/components/ElementsList';
import { ChecklistPanel } from './SiteMapDesigner/components/ChecklistPanel';
import { TemplateLibrary } from './SiteMapDesigner/components/TemplateLibrary';
import { DrawingCanvas } from './SiteMapDesigner/components/DrawingCanvas';
import { EvaluationModal } from './SiteMapDesigner/components/EvaluationModal';
import { EvaluationHistoryPanel } from './SiteMapDesigner/components/EvaluationHistoryPanel';
import { saveEvaluation, type SiteMapEvaluation as StoredEvaluation } from '../utils/evaluationHistory';

const MCP_SERVER_BASE_URL = 'http://localhost:3100';

type SiteMapEvaluationStatus = 'ready_for_review' | 'needs_attention';

type SiteMapFindingStatus = 'met' | 'missing' | 'unclear';

interface SiteMapEvaluationFinding {
  requirementId?: number;
  requirement: string;
  status: SiteMapFindingStatus;
  notes?: string;
}

interface SiteMapEvaluation {
  overallStatus: SiteMapEvaluationStatus;
  summary: string;
  findings: SiteMapEvaluationFinding[];
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export const SiteMapDesigner: React.FC = () => {
  // Refs
  const svgRef = useRef<SVGSVGElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);

  // Property Configuration
  const [propertyConfig, setPropertyConfig] = useState<PropertyConfig>({
    width: 50,
    depth: 100,
    scale: 4,
    address: '',
    northDirection: 0,
    streetSide: 'north',
  });

  // Zoom and Pan State
  const [zoom, setZoom] = useState(1);
  const [panX, setPanX] = useState(0);
  const [panY, setPanY] = useState(0);
  const [rotation, setRotation] = useState(0); // 0, 90, 180, 270
  const [containerSize, setContainerSize] = useState({ width: 800, height: 600 });

  // Drawing State
  const [selectedTool, setSelectedTool] = useState<DrawingTool>('select');
  const [selectedTemplate, setSelectedTemplate] = useState<ElementTemplate | null>(null);
  const [activeLayer, setActiveLayer] = useState<LayerType>('proposed');
  const [elements, setElements] = useState<DrawingElement[]>([]);
  const [selectedElementId, setSelectedElementId] = useState<string | null>(null);
  const [highlightedElementId, setHighlightedElementId] = useState<string | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentPoints, setCurrentPoints] = useState<Point[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState<Point>({ x: 0, y: 0 });

  // UI State
  const [showGrid, setShowGrid] = useState(true);
  const [showDimensions, setShowDimensions] = useState(true);
  const [snapToGrid, setSnapToGrid] = useState(true);
  const [textInput, setTextInput] = useState('');
  const [showTextDialog, setShowTextDialog] = useState(false);
  const [pendingTextElement, setPendingTextElement] = useState<Point | null>(null);
  const [selectedRequirementType, setSelectedRequirementType] = useState<RequirementType>('basic');
  const [showChecklistPanel, setShowChecklistPanel] = useState(false);
  const [showTemplateLibrary, setShowTemplateLibrary] = useState(false);
  const [siteMapImage, setSiteMapImage] = useState<string | null>(null);
  const [siteMapImageName, setSiteMapImageName] = useState('');
  const [evaluationState, setEvaluationState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [evaluationError, setEvaluationError] = useState<string | null>(null);
  const [siteMapEvaluation, setSiteMapEvaluation] = useState<SiteMapEvaluation | null>(null);
  const [showEvaluationModal, setShowEvaluationModal] = useState(false);
  const [showHistoryPanel, setShowHistoryPanel] = useState(false);

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

  // Use custom hooks
  const { checklistProgress, setChecklistProgress, updateChecklistItem, autoCheckRequirements } =
    useChecklistProgress();

  const { saveToHistory, undo, redo, canUndo, canRedo } = useHistoryManager(
    elements,
    checklistProgress,
    (state) => {
      setElements(state.elements);
      setChecklistProgress(state.checklistProgress);
    }
  );

  // Constants
  const streetWidth = 30;
  const gridSize = 5 * propertyConfig.scale;

  // Get current requirements based on selected type
  const currentRequirements =
    selectedRequirementType === 'basic'
      ? SITE_MAP_REQUIREMENTS
      : selectedRequirementType === 'enhanced'
      ? ENHANCED_SITE_MAP_REQUIREMENTS
      : ENVIRONMENTAL_CRITICAL_AREA_SITE_MAP_REQUIREMENTS;

  // Calculate checklist completion
  const completedRequirements = Object.values(checklistProgress).filter((p) => p.completed).length;
  const totalRequirements = currentRequirements.filter((r) => r.required).length;
  const completionPercentage =
    totalRequirements > 0 ? Math.round((completedRequirements / totalRequirements) * 100) : 0;

  // Filter visible elements by layer
  const visibleElements = elements.filter(
    (el) => layerVisibility[el.layer] && el.visible !== false
  );

  // Calculate element counts by layer
  const elementCounts = elements.reduce((acc, el) => {
    acc[el.layer] = (acc[el.layer] || 0) + 1;
    return acc;
  }, {} as Record<LayerType, number>);

  // ============================================================================
  // RESIZE OBSERVER FOR CONTAINER
  // ============================================================================

  React.useEffect(() => {
    const container = canvasContainerRef.current;
    if (!container) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        setContainerSize({ width, height });
      }
    });

    resizeObserver.observe(container);
    return () => resizeObserver.disconnect();
  }, []);

  // ============================================================================
  // ZOOM AND PAN HANDLERS
  // ============================================================================

  const handleZoomIn = useCallback(() => {
    setZoom((prev) => Math.min(5, prev + 0.25));
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoom((prev) => Math.max(0.1, prev - 0.25));
  }, []);

  const handleZoomReset = useCallback(() => {
    setZoom(1);
    setPanX(0);
    setPanY(0);
  }, []);

  const handleRotateClockwise = useCallback(() => {
    setRotation((prev) => (prev + 90) % 360);
  }, []);

  const handleRotateCounterClockwise = useCallback(() => {
    setRotation((prev) => (prev - 90 + 360) % 360);
  }, []);

  const handlePanChange = useCallback((newPanX: number, newPanY: number) => {
    setPanX(newPanX);
    setPanY(newPanY);
  }, []);

  // ============================================================================
  // EVENT HANDLERS
  // ============================================================================

  const handleSiteMapUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setSiteMapImage(reader.result);
        setSiteMapImageName(file.name);
        setSiteMapEvaluation(null);
        setEvaluationError(null);
        setEvaluationState('idle');
      }
    };

    reader.readAsDataURL(file);
    event.target.value = '';
  }, []);

  const handleRemoveSiteMapImage = useCallback(() => {
    setSiteMapImage(null);
    setSiteMapImageName('');
    setSiteMapEvaluation(null);
    setEvaluationError(null);
    setEvaluationState('idle');
  }, []);

  const handleAnalyzeSiteMap = useCallback(async () => {
    if (!siteMapImage) {
      return;
    }

    setEvaluationState('loading');
    setEvaluationError(null);
    setShowEvaluationModal(true);

    const requirementsPayload = currentRequirements.map((requirement) => ({
      id: requirement.id,
      description: requirement.description,
      category: requirement.category,
      required: requirement.required,
    }));

    const propertyPayload = {
      width: propertyConfig.width,
      depth: propertyConfig.depth,
      scale: propertyConfig.scale,
      address: propertyConfig.address,
      streetSide: propertyConfig.streetSide,
      northDirection: propertyConfig.northDirection,
    };

    try {
      const response = await fetch(`${MCP_SERVER_BASE_URL}/site-map/evaluate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imageData: siteMapImage,
          requirementType: selectedRequirementType,
          requirements: requirementsPayload,
          property: propertyPayload,
        }),
      });

      if (!response.ok) {
        const message = await response.text();
        throw new Error(message || 'Failed to evaluate site map');
      }

      const payload = await response.json();
      const evaluationData = payload?.data ?? payload;

      if (
        evaluationData &&
        typeof evaluationData === 'object' &&
        'overallStatus' in evaluationData &&
        'summary' in evaluationData &&
        'findings' in evaluationData
      ) {
        const evaluation = evaluationData as SiteMapEvaluation;
        setSiteMapEvaluation(evaluation);

        // Save to localStorage (without id and timestamp, they'll be added by saveEvaluation)
        saveEvaluation({
          overallStatus: evaluation.overallStatus,
          summary: evaluation.summary,
          findings: evaluation.findings,
        }, siteMapImageName);
      } else {
        setSiteMapEvaluation(null);
      }
      setEvaluationState('success');
    } catch (error) {
      setEvaluationState('error');
      if (error instanceof Error) {
        setEvaluationError(error.message);
      } else {
        setEvaluationError('Unexpected error evaluating site map');
      }
    }
  }, [currentRequirements, propertyConfig, selectedRequirementType, siteMapImage, siteMapImageName]);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent<SVGSVGElement>) => {
      const point = getSVGPoint(e.clientX, e.clientY, svgRef.current);

      // Handle select tool - check if clicking on an element to drag
      if (selectedTool === 'select' && selectedElementId) {
        const selectedElement = elements.find((el) => el.id === selectedElementId);
        if (selectedElement) {
          setIsDragging(true);
          setDragOffset({
            x: point.x - selectedElement.points[0].x,
            y: point.y - selectedElement.points[0].y,
          });
          return;
        }
      }

      if (selectedTool === 'select') return;

      const snappedPoint = snapToGridPoint(point, gridSize, snapToGrid);

      // Text tool uses click-to-place instead of drag
      if (selectedTool === 'text') {
        setPendingTextElement(snappedPoint);
        setShowTextDialog(true);
        return;
      }

      setIsDrawing(true);
      setCurrentPoints([snappedPoint]);
    },
    [selectedTool, snapToGrid, selectedElementId, elements, gridSize]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<SVGSVGElement>) => {
      const point = getSVGPoint(e.clientX, e.clientY, svgRef.current);

      // Handle dragging selected element
      if (isDragging && selectedElementId && selectedTool === 'select') {
        const newPoint = snapToGrid
          ? snapToGridPoint({ x: point.x - dragOffset.x, y: point.y - dragOffset.y }, gridSize, true)
          : { x: point.x - dragOffset.x, y: point.y - dragOffset.y };

        setElements((prev) =>
          prev.map((el) => {
            if (el.id !== selectedElementId) return el;

            const dx = newPoint.x - el.points[0].x;
            const dy = newPoint.y - el.points[0].y;

            return {
              ...el,
              points: el.points.map((p) => ({
                x: p.x + dx,
                y: p.y + dy,
              })),
            };
          })
        );
        return;
      }

      if (!isDrawing || selectedTool === 'select' || selectedTool === 'text') return;

      const snappedPoint = snapToGridPoint(point, gridSize, snapToGrid);
      setCurrentPoints((prev) => {
        if (prev.length === 0) return [snappedPoint];
        if (selectedTool === 'line' || selectedTool === 'rectangle' || selectedTool === 'circle') {
          return [prev[0], snappedPoint];
        }
        return [...prev, snappedPoint];
      });
    },
    [isDrawing, selectedTool, snapToGrid, isDragging, selectedElementId, dragOffset, gridSize]
  );

  const handleMouseUp = useCallback(() => {
    if (isDragging) {
      setIsDragging(false);
      saveToHistory();
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

    if (distance < 5) {
      setIsDrawing(false);
      setCurrentPoints([]);
      return;
    }

    // Create the element
    const dimensions = calculateElementDimensions(
      currentPoints,
      propertyConfig.scale,
      selectedTool === 'rectangle' || selectedTool === 'circle'
    );

    const newElement: DrawingElement = {
      id: generateId(),
      type: getElementTypeFromTool(selectedTool),
      category: selectedTemplate?.category || 'other',
      layer: selectedTemplate?.layer || activeLayer,
      shape: getShapeFromTool(selectedTool),
      points: currentPoints,
      style: selectedTemplate?.defaultStyle
        ? { ...getDefaultStyle(selectedTool), ...selectedTemplate.defaultStyle }
        : getDefaultStyle(selectedTool),
      dimensions,
      metadata: selectedTemplate?.defaultMetadata ? { ...selectedTemplate.defaultMetadata } : undefined,
      linkedRequirements: selectedTemplate?.requirementIds,
      visible: true,
    };

    setElements((prev) => [...prev, newElement]);
    saveToHistory();
    autoCheckRequirements(newElement);
    setIsDrawing(false);
    setCurrentPoints([]);
  }, [
    isDrawing,
    currentPoints,
    selectedTool,
    activeLayer,
    isDragging,
    selectedTemplate,
    saveToHistory,
    autoCheckRequirements,
    propertyConfig.scale,
  ]);

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
      label: textInput,
      visible: true,
    };

    setElements((prev) => [...prev, newElement]);
    saveToHistory();
    setShowTextDialog(false);
    setPendingTextElement(null);
    setTextInput('');
  };

  const handleElementListClick = (elementId: string) => {
    setSelectedElementId(elementId);
    setHighlightedElementId(elementId);

    setTimeout(() => {
      setHighlightedElementId(null);
    }, 2000);
  };

  const deleteElement = (id: string) => {
    setElements((prev) => prev.filter((el) => el.id !== id));
    if (selectedElementId === id) {
      setSelectedElementId(null);
    }
    saveToHistory();
  };

  const toggleElementVisibility = (id: string) => {
    setElements((prev) =>
      prev.map((el) => (el.id === id ? { ...el, visible: !el.visible } : el))
    );
  };

  const rotateElement = (id: string) => {
    setElements((prev) =>
      prev.map((el) => {
        if (el.id !== id) return el;

        if (el.shape === 'rectangle' && el.points.length === 2) {
          const [p1, p2] = el.points;
          const centerX = (p1.x + p2.x) / 2;
          const centerY = (p1.y + p2.y) / 2;
          const width = Math.abs(p2.x - p1.x);
          const height = Math.abs(p2.y - p1.y);

          const newP1 = { x: centerX - height / 2, y: centerY - width / 2 };
          const newP2 = { x: centerX + height / 2, y: centerY + width / 2 };

          return {
            ...el,
            points: [newP1, newP2],
            dimensions: el.dimensions
              ? {
                  ...el.dimensions,
                  width: el.dimensions.height,
                  height: el.dimensions.width,
                }
              : undefined,
          };
        }

        if (el.shape === 'line' && el.points.length === 2) {
          const [p1, p2] = el.points;
          const centerX = (p1.x + p2.x) / 2;
          const centerY = (p1.y + p2.y) / 2;

          const rotatePoint = (p: Point, cx: number, cy: number) => {
            const dx = p.x - cx;
            const dy = p.y - cy;
            return { x: cx - dy, y: cy + dx };
          };

          return {
            ...el,
            points: [rotatePoint(p1, centerX, centerY), rotatePoint(p2, centerX, centerY)],
          };
        }

        return el;
      })
    );
    saveToHistory();
  };

  const updateElementDimensions = (id: string, widthFeet: number, heightFeet: number) => {
    setElements((prev) =>
      prev.map((el) => {
        if (el.id !== id) return el;

        if (el.shape === 'rectangle' && el.points.length === 2) {
          const [p1, p2] = el.points;
          const centerX = (p1.x + p2.x) / 2;
          const centerY = (p1.y + p2.y) / 2;

          const widthPx = widthFeet * propertyConfig.scale;
          const heightPx = heightFeet * propertyConfig.scale;

          const newP1 = { x: centerX - widthPx / 2, y: centerY - heightPx / 2 };
          const newP2 = { x: centerX + widthPx / 2, y: centerY + heightPx / 2 };

          return {
            ...el,
            points: [newP1, newP2],
            dimensions: {
              width: widthFeet,
              height: heightFeet,
              length: 0,
              area: widthFeet * heightFeet,
            },
          };
        }

        if (el.shape === 'circle' && el.points.length === 2) {
          const [center] = el.points;
          const radiusPx = (widthFeet / 2) * propertyConfig.scale;

          return {
            ...el,
            points: [center, { x: center.x + radiusPx, y: center.y }],
            dimensions: {
              width: widthFeet,
              height: widthFeet,
              length: 0,
              area: Math.PI * Math.pow(widthFeet / 2, 2),
            },
          };
        }

        return el;
      })
    );
    saveToHistory();
  };

  const deleteAllElements = () => {
    if (window.confirm('Are you sure you want to delete all elements?')) {
      setElements([]);
      setSelectedElementId(null);
      saveToHistory();
    }
  };

  const handleExportSVG = () => {
    exportToSVG(svgRef.current, propertyConfig);
  };

  const handleExportJSON = () => {
    exportToJSON(propertyConfig, elements);
  };

  // Keyboard shortcuts
  useKeyboardShortcuts({
    onToolChange: setSelectedTool,
    onDelete: () => selectedElementId && deleteElement(selectedElementId),
    onUndo: undo,
    onRedo: redo,
    onExport: handleExportJSON,
    onToggleGrid: () => setShowGrid((prev) => !prev),
    onToggleSnap: () => setSnapToGrid((prev) => !prev),
    selectedElementId,
  });

  // ============================================================================
  // RENDER
  // ============================================================================

  return (
    <div className="site-map-designer flex flex-col h-screen bg-gray-50">
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar */}
        <div className="w-80 bg-white border-r border-gray-200 overflow-y-auto flex-shrink-0">
          <div className="p-4 space-y-6">
            {/* Header */}
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Site Map Designer</h1>
              <p className="text-sm text-gray-600 mt-1">Professional site plan design tool</p>
            </div>

            {/* Site Map Upload & AI Review */}
            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-900">Site Map Review</h2>
              <div className="space-y-2">
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700" htmlFor="site-map-upload">
                    Upload site map image
                  </label>
                  <input
                    id="site-map-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleSiteMapUpload}
                    className="block w-full text-sm text-gray-700 file:mr-4 file:rounded-md file:border-0 file:bg-gray-100 file:px-3 file:py-2 file:text-sm file:font-medium file:text-gray-700 hover:file:bg-gray-200"
                  />
                </div>

                {siteMapImage && (
                  <div className="space-y-2 rounded-md border border-gray-200 bg-gray-50 p-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm text-gray-700 truncate" title={siteMapImageName}>
                        {siteMapImageName}
                      </span>
                      <button
                        onClick={handleRemoveSiteMapImage}
                        className="text-xs font-medium text-red-600 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="rounded-md border border-gray-200 bg-white">
                      <img
                        src={siteMapImage}
                        alt="Uploaded site map preview"
                        className="h-48 w-full rounded-md object-contain"
                      />
                    </div>
                  </div>
                )}

                <button
                  onClick={handleAnalyzeSiteMap}
                  disabled={!siteMapImage || evaluationState === 'loading'}
                  className={`w-full px-4 py-2 font-medium text-white rounded-md ${
                    !siteMapImage
                      ? 'bg-gray-400 cursor-not-allowed'
                      : evaluationState === 'loading'
                      ? 'bg-blue-400 cursor-wait'
                      : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  {evaluationState === 'loading' ? 'Analyzing…' : 'Analyze Site Map'}
                </button>

                <button
                  onClick={() => setShowHistoryPanel(true)}
                  className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 font-medium text-sm"
                >
                  📚 View Evaluation History
                </button>
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

            {/* Property Configuration */}
            <PropertyConfigPanel
              propertyConfig={propertyConfig}
              onPropertyConfigChange={setPropertyConfig}
            />

            {/* Drawing Tools */}
            <DrawingToolsPanel
              selectedTool={selectedTool}
              onToolChange={setSelectedTool}
              activeLayer={activeLayer}
              onLayerChange={setActiveLayer}
              layerVisibility={layerVisibility}
              onLayerVisibilityChange={(layer, visible) =>
                setLayerVisibility((prev) => ({ ...prev, [layer]: visible }))
              }
              elementCounts={elementCounts}
              showGrid={showGrid}
              onShowGridChange={setShowGrid}
              showDimensions={showDimensions}
              onShowDimensionsChange={setShowDimensions}
              snapToGrid={snapToGrid}
              onSnapToGridChange={setSnapToGrid}
            />

           

            {/* Actions */}
            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-900">Actions</h2>
              <div className="space-y-2">
                <button
                  onClick={handleExportSVG}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium"
                >
                  📥 Export as SVG
                </button>
                <button
                  onClick={handleExportJSON}
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
            <ElementsList
              elements={elements}
              selectedElementId={selectedElementId}
              templates={ELEMENT_TEMPLATES}
              onElementClick={handleElementListClick}
              onElementDelete={deleteElement}
              onElementVisibilityToggle={toggleElementVisibility}
              onRotateElement={rotateElement}
              onUpdateDimensions={updateElementDimensions}
            />

            {/* Undo/Redo */}
            <div className="flex items-center gap-2 pt-2 border-t border-gray-200">
              <button
                onClick={undo}
                disabled={!canUndo}
                className="flex-1 px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                title="Undo (Ctrl+Z)"
              >
                ↶ Undo
              </button>
              <button
                onClick={redo}
                disabled={!canRedo}
                className="flex-1 px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                title="Redo (Ctrl+Shift+Z)"
              >
                ↷ Redo
              </button>
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
          <ChecklistPanel
            show={showChecklistPanel}
            onClose={() => setShowChecklistPanel(false)}
            requirements={currentRequirements}
            checklistProgress={checklistProgress}
            elements={elements}
            templates={ELEMENT_TEMPLATES}
            onUpdateChecklistItem={updateChecklistItem}
            completedCount={completedRequirements}
            totalCount={totalRequirements}
            completionPercentage={completionPercentage}
          />

          {/* Canvas Container */}
          <div className="flex-1 overflow-hidden p-8 flex items-center justify-center relative">
            {/* Zoom and Rotation Controls */}
            <div className="absolute top-4 right-4 z-10 bg-white border border-gray-300 rounded-lg shadow-lg p-2 flex flex-col gap-2">
              <button
                onClick={handleZoomIn}
                className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-bold text-lg"
                title="Zoom In (Scroll Up)"
              >
                +
              </button>
              <div className="text-center text-sm font-semibold text-gray-700 py-1">
                {(zoom * 100).toFixed(0)}%
              </div>
              <button
                onClick={handleZoomOut}
                className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-bold text-lg"
                title="Zoom Out (Scroll Down)"
              >
                −
              </button>
              <button
                onClick={handleZoomReset}
                className="px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-700 text-xs font-medium"
                title="Reset Zoom & Pan"
              >
                Reset
              </button>
              <div className="border-t border-gray-300 my-1"></div>
              <button
                onClick={handleRotateCounterClockwise}
                className="px-3 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 font-bold text-lg"
                title="Rotate Counter-Clockwise"
              >
                ↶
              </button>
              <div className="text-center text-xs font-semibold text-gray-700 py-1">
                {rotation}°
              </div>
              <button
                onClick={handleRotateClockwise}
                className="px-3 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 font-bold text-lg"
                title="Rotate Clockwise"
              >
                ↷
              </button>
            </div>

            <div className="w-full h-full flex items-center justify-center">
              <DrawingCanvas
                svgRef={svgRef}
                propertyConfig={propertyConfig}
                elements={visibleElements}
                selectedElementId={selectedElementId}
                highlightedElementId={highlightedElementId}
                showGrid={showGrid && !siteMapImage}
                showDimensions={showDimensions}
                selectedTool={selectedTool}
                isDrawing={isDrawing}
                currentPoints={currentPoints}
                isDragging={isDragging}
                backgroundImage={siteMapImage}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onElementClick={setSelectedElementId}
                streetWidth={streetWidth}
                zoom={zoom}
                panX={panX}
                panY={panY}
                rotation={rotation}
                onZoomChange={setZoom}
                onPanChange={handlePanChange}
                containerWidth={containerSize.width - 64}
                containerHeight={containerSize.height - 64}
              />
            </div>

            {/* Status Bar */}
            <div className="absolute bottom-4 left-4 text-sm text-gray-600 bg-white px-3 py-2 rounded-lg shadow-md border border-gray-200">
              {propertyConfig.address && (
                <p className="font-semibold">{propertyConfig.address}</p>
              )}
              {isDrawing && currentPoints.length > 0 && (
                <p className="text-blue-600 font-medium mt-1">
                  Drawing...{' '}
                  {currentPoints.length === 2
                    ? `${pixelsToFeet(
                        Math.abs(currentPoints[1].x - currentPoints[0].x),
                        propertyConfig.scale
                      ).toFixed(1)}' × ${pixelsToFeet(
                        Math.abs(currentPoints[1].y - currentPoints[0].y),
                        propertyConfig.scale
                      ).toFixed(1)}'`
                    : 'Click and drag'}
                </p>
              )}
              <p className="text-xs text-gray-500 mt-1">
                💡 Scroll to zoom • Click & drag to pan • Shift+Click to force pan
              </p>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-96 border-l border-gray-200 overflow-hidden flex-shrink-0">
          <SiteMapRequirementsVisualizer
            compact={true}
            selectedType={selectedRequirementType}
            onTypeChange={setSelectedRequirementType}
          />
        </div>
      </div>

      {/* Bottom Template Library */}
      <TemplateLibrary
        show={showTemplateLibrary}
        onShowChange={setShowTemplateLibrary}
        templates={ELEMENT_TEMPLATES}
        selectedTemplate={selectedTemplate}
        onTemplateSelect={setSelectedTemplate}
        onToolChange={setSelectedTool}
        onLayerChange={setActiveLayer}
      />

      {/* Evaluation Modal */}
      <EvaluationModal
        isOpen={showEvaluationModal}
        isLoading={evaluationState === 'loading'}
        evaluation={siteMapEvaluation}
        error={evaluationError}
        imageName={siteMapImageName}
        requirements={currentRequirements}
        onClose={() => setShowEvaluationModal(false)}
      />

      {/* Evaluation History Panel */}
      <EvaluationHistoryPanel
        isOpen={showHistoryPanel}
        onClose={() => setShowHistoryPanel(false)}
        onViewEvaluation={(evaluation) => {
          setSiteMapEvaluation(evaluation);
          setShowHistoryPanel(false);
          setShowEvaluationModal(true);
          setEvaluationState('success');
          setEvaluationError(null);
        }}
      />
    </div>
  );
};

export default SiteMapDesigner;
