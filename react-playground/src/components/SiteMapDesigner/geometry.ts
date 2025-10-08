// ============================================================================
// GEOMETRY UTILITY FUNCTIONS
// ============================================================================

import { Point } from './types';

/**
 * Snaps a point to the nearest grid intersection
 */
export const snapToGridPoint = (point: Point, gridSize: number, shouldSnap: boolean): Point => {
  if (!shouldSnap) return point;
  return {
    x: Math.round(point.x / gridSize) * gridSize,
    y: Math.round(point.y / gridSize) * gridSize,
  };
};

/**
 * Converts screen coordinates to SVG coordinates
 */
export const getSVGPoint = (
  clientX: number,
  clientY: number,
  svgElement: SVGSVGElement | null
): Point => {
  if (!svgElement) return { x: 0, y: 0 };
  const rect = svgElement.getBoundingClientRect();
  return {
    x: clientX - rect.left,
    y: clientY - rect.top,
  };
};

/**
 * Converts pixels to feet based on scale
 */
export const pixelsToFeet = (pixels: number, scale: number): number => {
  return Number((pixels / scale).toFixed(2));
};

/**
 * Converts feet to pixels based on scale
 */
export const feetToPixels = (feet: number, scale: number): number => {
  return feet * scale;
};

/**
 * Calculates the distance between two points in pixels
 */
export const calculateDistance = (p1: Point, p2: Point): number => {
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  return Math.sqrt(dx * dx + dy * dy);
};

/**
 * Generates a unique ID for elements
 */
export const generateId = (): string => {
  return `element-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Calculates dimensions for an element based on its points
 */
export const calculateElementDimensions = (
  points: Point[],
  scale: number,
  includeArea: boolean
): { width: number; height: number; length: number; area?: number } | undefined => {
  if (points.length < 2) return undefined;

  const [p1, p2] = points;
  const widthPx = Math.abs(p2.x - p1.x);
  const heightPx = Math.abs(p2.y - p1.y);
  const length = calculateDistance(p1, p2);

  const widthFt = pixelsToFeet(widthPx, scale);
  const heightFt = pixelsToFeet(heightPx, scale);
  const area = widthFt * heightFt;

  return {
    width: widthFt,
    height: heightFt,
    length: pixelsToFeet(length, scale),
    area: includeArea ? area : undefined,
  };
};
