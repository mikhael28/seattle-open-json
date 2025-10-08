// ============================================================================
// ELEMENT TEMPLATES LIBRARY
// ============================================================================

import { ElementTemplate } from './types';

export const ELEMENT_TEMPLATES: ElementTemplate[] = [
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
