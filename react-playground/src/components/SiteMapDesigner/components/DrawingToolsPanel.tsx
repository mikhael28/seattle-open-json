// ============================================================================
// DRAWING TOOLS PANEL COMPONENT
// ============================================================================

import React from 'react';
import { DrawingTool, LayerType } from '../types';

interface DrawingToolsPanelProps {
  selectedTool: DrawingTool;
  onToolChange: (tool: DrawingTool) => void;
  activeLayer: LayerType;
  onLayerChange: (layer: LayerType) => void;
  layerVisibility: Record<LayerType, boolean>;
  onLayerVisibilityChange: (layer: LayerType, visible: boolean) => void;
  elementCounts: Record<LayerType, number>;
  showGrid: boolean;
  onShowGridChange: (show: boolean) => void;
  showDimensions: boolean;
  onShowDimensionsChange: (show: boolean) => void;
  snapToGrid: boolean;
  onSnapToGridChange: (snap: boolean) => void;
}

export const DrawingToolsPanel: React.FC<DrawingToolsPanelProps> = ({
  selectedTool,
  onToolChange,
  activeLayer,
  onLayerChange,
  layerVisibility,
  onLayerVisibilityChange,
  elementCounts,
  showGrid,
  onShowGridChange,
  showDimensions,
  onShowDimensionsChange,
  snapToGrid,
  onSnapToGridChange,
}) => {
  const layers: LayerType[] = [
    'existing',
    'proposed',
    'utilities',
    'trees',
    'annotations',
    'easements',
    'environmental'
  ];

  return (
    <div className="space-y-6">
      {/* Drawing Tools */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-gray-900">Drawing Tools</h2>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => onToolChange('select')}
            className={`px-3 py-2 rounded-md text-sm font-medium ${
              selectedTool === 'select'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            ✋ Select
          </button>
          <button
            onClick={() => onToolChange('line')}
            className={`px-3 py-2 rounded-md text-sm font-medium ${
              selectedTool === 'line'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            📏 Line
          </button>
          <button
            onClick={() => onToolChange('rectangle')}
            className={`px-3 py-2 rounded-md text-sm font-medium ${
              selectedTool === 'rectangle'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            ▭ Rectangle
          </button>
          <button
            onClick={() => onToolChange('circle')}
            className={`px-3 py-2 rounded-md text-sm font-medium ${
              selectedTool === 'circle'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            ● Circle
          </button>
          <button
            onClick={() => onToolChange('text')}
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
          {layers.map(layer => (
            <button
              key={layer}
              onClick={() => onLayerChange(layer)}
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
          {layers.map(layer => (
            <label key={layer} className="flex items-center text-xs">
              <input
                type="checkbox"
                checked={layerVisibility[layer]}
                onChange={(e) => onLayerVisibilityChange(layer, e.target.checked)}
                className="mr-2"
              />
              <span className="text-gray-700 capitalize">{layer.replace('-', ' ')}</span>
              <span className="ml-auto text-gray-500">
                ({elementCounts[layer] || 0})
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* View Options */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-gray-900">View Options</h2>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={showGrid}
              onChange={(e) => onShowGridChange(e.target.checked)}
              className="mr-2"
            />
            <span className="text-sm text-gray-700">Show Grid</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={showDimensions}
              onChange={(e) => onShowDimensionsChange(e.target.checked)}
              className="mr-2"
            />
            <span className="text-sm text-gray-700">Show Dimensions</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={snapToGrid}
              onChange={(e) => onSnapToGridChange(e.target.checked)}
              className="mr-2"
            />
            <span className="text-sm text-gray-700">Snap to Grid</span>
          </label>
        </div>
      </div>
    </div>
  );
};
