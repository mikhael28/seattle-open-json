// ============================================================================
// ELEMENTS LIST COMPONENT
// ============================================================================

import React from 'react';
import { DrawingElement, ElementTemplate } from '../types';

interface ElementsListProps {
  elements: DrawingElement[];
  selectedElementId: string | null;
  templates: ElementTemplate[];
  onElementClick: (id: string) => void;
  onElementDelete: (id: string) => void;
  onElementVisibilityToggle: (id: string) => void;
  onRotateElement?: (id: string) => void;
  onUpdateDimensions?: (id: string, width: number, height: number) => void;
}

export const ElementsList: React.FC<ElementsListProps> = ({
  elements,
  selectedElementId,
  templates,
  onElementClick,
  onElementDelete,
  onElementVisibilityToggle,
  onRotateElement,
  onUpdateDimensions,
}) => {
  const selectedElement = elements.find(el => el.id === selectedElementId);

  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold text-gray-900">Elements ({elements.length})</h2>

      <div className="max-h-64 overflow-y-auto space-y-1">
        {elements.length === 0 ? (
          <p className="text-sm text-gray-500 italic">
            No elements yet. Use templates or draw tools to add elements.
          </p>
        ) : (
          elements.map(element => {
            const template = templates.find(t => t.category === element.category);
            return (
              <div
                key={element.id}
                onClick={() => onElementClick(element.id)}
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
                      onElementVisibilityToggle(element.id);
                    }}
                    className="text-gray-500 hover:text-gray-700 p-1"
                    title={element.visible ? 'Hide' : 'Show'}
                  >
                    {element.visible ? '👁️' : '👁️‍🗨️'}
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onElementDelete(element.id);
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

      {/* Selected Element Details */}
      {selectedElementId && selectedElement && (
        <div className="text-xs mt-2 bg-blue-50 p-3 rounded space-y-2">
          <div className="flex items-center justify-between">
            <p className="font-semibold text-blue-900">Selected Element</p>
            {(selectedElement.shape === 'rectangle' ||
              selectedElement.shape === 'circle' ||
              selectedElement.shape === 'line') && onRotateElement && (
              <button
                onClick={() => onRotateElement(selectedElementId)}
                className="px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-xs flex items-center gap-1"
                title="Rotate 90°"
              >
                ↻ 90°
              </button>
            )}
          </div>

          <p className="text-blue-700 capitalize">
            {selectedElement.category.replace('-', ' ')}
          </p>

          {/* Dimension Inputs */}
          {selectedElement.dimensions &&
           (selectedElement.shape === 'rectangle' || selectedElement.shape === 'circle') &&
           onUpdateDimensions && (
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
                          onUpdateDimensions(selectedElementId, newWidth, selectedElement.dimensions.height);
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
                          onUpdateDimensions(selectedElementId, selectedElement.dimensions.width, newHeight);
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
                        onUpdateDimensions(selectedElementId, newDiameter, newDiameter);
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
  );
};
