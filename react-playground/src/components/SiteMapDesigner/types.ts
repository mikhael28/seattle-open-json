// ============================================================================
// TYPES & INTERFACES FOR SITE MAP DESIGNER
// ============================================================================

export type DrawingTool =
  | 'select'
  | 'line'
  | 'rectangle'
  | 'circle'
  | 'text'
  | 'measurement';

export type ElementType =
  | 'line'
  | 'rectangle'
  | 'circle'
  | 'text'
  | 'measurement';

export type ElementCategory =
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

export type LayerType =
  | 'existing'
  | 'proposed'
  | 'utilities'
  | 'trees'
  | 'annotations'
  | 'easements'
  | 'environmental';

export type RequirementType = 'basic' | 'enhanced' | 'environmental';

export interface Point {
  x: number;
  y: number;
}

export interface ElementMetadata {
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
  notes?: string;
  label?: string;
}

export interface ElementStyle {
  stroke: string;
  strokeWidth: number;
  fill: string;
  opacity: number;
  dashArray?: string;
  fontSize?: number;
  fontFamily?: string;
}

export interface ElementDimensions {
  width: number;    // in feet
  height: number;   // in feet
  length: number;   // in feet
  area?: number;    // in square feet
}

export interface DrawingElement {
  id: string;
  type: ElementType;
  shape: 'line' | 'rectangle' | 'circle' | 'text';
  points: Point[];
  style: ElementStyle;
  label?: string;
  metadata?: ElementMetadata;
  category: ElementCategory;
  layer: LayerType;
  visible: boolean;
  dimensions?: ElementDimensions;
  rotation?: number;  // in degrees
  linkedRequirements?: number[];  // requirement IDs from checklist
}

export interface ElementTemplate {
  id: string;
  name: string;
  description: string;
  category: ElementCategory;
  layer: LayerType;
  icon: string;
  defaultStyle: Partial<ElementStyle>;
  defaultMetadata?: ElementMetadata;
  requirementIds?: number[];
}

export interface PropertyConfig {
  width: number;           // in feet
  depth: number;           // in feet
  scale: number;           // pixels per foot
  address: string;
  northDirection: number;  // degrees from top (0 = north is up)
  streetSide: 'north' | 'south' | 'east' | 'west';
  streetName?: string;
  lotNumber?: string;
  zoning?: string;
}

export interface ChecklistProgress {
  [requirementId: number]: {
    completed: boolean;
    linkedElements: string[];  // element IDs
    notes?: string;
  };
}

export interface HistoryState {
  elements: DrawingElement[];
  checklistProgress: ChecklistProgress;
}

export interface ViewportState {
  zoom: number;
  panX: number;
  panY: number;
}
