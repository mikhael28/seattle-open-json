// ============================================================================
// EXPORT UTILITY FUNCTIONS
// ============================================================================

import { DrawingElement, PropertyConfig } from './types';

/**
 * Exports the SVG canvas to an SVG file
 */
export const exportToSVG = (svgElement: SVGSVGElement | null, propertyConfig: PropertyConfig): void => {
  if (!svgElement) return;
  const svgData = new XMLSerializer().serializeToString(svgElement);
  const blob = new Blob([svgData], { type: 'image/svg+xml' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `site-plan-${propertyConfig.address || 'untitled'}.svg`;
  link.click();
  URL.revokeObjectURL(url);
};

/**
 * Exports the site map data to a JSON file
 */
export const exportToJSON = (
  propertyConfig: PropertyConfig,
  elements: DrawingElement[]
): void => {
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

/**
 * Imports site map data from a JSON file
 */
export const importFromJSON = (
  file: File,
  onSuccess: (data: { propertyConfig: PropertyConfig; elements: DrawingElement[] }) => void,
  onError: (error: Error) => void
): void => {
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const data = JSON.parse(e.target?.result as string);
      onSuccess(data);
    } catch (error) {
      onError(error as Error);
    }
  };
  reader.onerror = () => {
    onError(new Error('Failed to read file'));
  };
  reader.readAsText(file);
};
