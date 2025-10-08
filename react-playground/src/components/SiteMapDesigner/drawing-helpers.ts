// ============================================================================
// DRAWING HELPER FUNCTIONS
// ============================================================================

import { DrawingTool, ElementType, ElementStyle } from './types';

/**
 * Converts drawing tool to element type
 */
export const getElementTypeFromTool = (tool: DrawingTool): ElementType => {
  switch (tool) {
    case 'line': return 'line';
    case 'rectangle': return 'rectangle';
    case 'circle': return 'circle';
    case 'text': return 'text';
    case 'measurement': return 'measurement';
    default: return 'line';
  }
};

/**
 * Converts drawing tool to shape type
 */
export const getShapeFromTool = (tool: DrawingTool): 'line' | 'rectangle' | 'circle' | 'text' => {
  switch (tool) {
    case 'line': return 'line';
    case 'circle': return 'circle';
    case 'rectangle': return 'rectangle';
    case 'text': return 'text';
    case 'measurement': return 'line';
    default: return 'line';
  }
};

/**
 * Gets default style for a drawing tool
 */
export const getDefaultStyle = (tool: DrawingTool): ElementStyle => {
  const baseStyle: ElementStyle = {
    stroke: '#2563eb',
    strokeWidth: 2,
    fill: 'transparent',
    opacity: 1,
  };

  switch (tool) {
    case 'line':
    case 'measurement':
      return baseStyle;
    case 'rectangle':
      return { ...baseStyle, fill: '#dbeafe', opacity: 0.5 };
    case 'circle':
      return { ...baseStyle, fill: '#86efac', opacity: 0.3 };
    case 'text':
      return {
        ...baseStyle,
        stroke: '#000000',
        fill: '#000000',
        strokeWidth: 0,
        fontSize: 14,
        fontFamily: 'Arial, sans-serif'
      };
    default:
      return baseStyle;
  }
};
