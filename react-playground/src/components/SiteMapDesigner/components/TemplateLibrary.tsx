// ============================================================================
// TEMPLATE LIBRARY COMPONENT
// ============================================================================

import React from 'react';
import { ElementTemplate, LayerType, DrawingTool } from '../types';

interface TemplateLibraryProps {
  show: boolean;
  onShowChange: (show: boolean) => void;
  templates: ElementTemplate[];
  selectedTemplate: ElementTemplate | null;
  onTemplateSelect: (template: ElementTemplate | null) => void;
  onToolChange: (tool: DrawingTool) => void;
  onLayerChange: (layer: LayerType) => void;
}

export const TemplateLibrary: React.FC<TemplateLibraryProps> = ({
  show,
  onShowChange,
  templates,
  selectedTemplate,
  onTemplateSelect,
  onToolChange,
  onLayerChange,
}) => {
  const categories = [
    {
      name: 'Structures',
      filter: (t: ElementTemplate) => t.category.includes('structure')
    },
    {
      name: 'Paved Areas',
      filter: (t: ElementTemplate) => ['driveway', 'parking', 'paved-area'].includes(t.category)
    },
    {
      name: 'Trees',
      filter: (t: ElementTemplate) => t.category === 'tree'
    },
    {
      name: 'Utilities',
      filter: (t: ElementTemplate) => t.category.startsWith('utility-')
    },
    {
      name: 'Other',
      filter: (t: ElementTemplate) => ['property-line', 'setback-line', 'easement', 'pedestrian-path'].includes(t.category)
    }
  ];

  return (
    <div className={`border-t border-gray-200 bg-white transition-all duration-300 ${
      show ? 'h-64' : 'h-12'
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
                onClick={() => onTemplateSelect(null)}
                className="text-blue-600 hover:text-blue-800 font-bold"
                title="Clear template selection"
              >
                ✕
              </button>
            </div>
          )}
        </div>
        <button
          onClick={() => onShowChange(!show)}
          className="px-4 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium text-sm transition-colors"
        >
          {show ? '▼ Hide Templates' : '▲ Show Templates'}
        </button>
      </div>

      {/* Templates Content */}
      {show && (
        <div className="h-52 overflow-y-auto p-4">
          <div className="flex gap-4">
            {categories.map(category => {
              const categoryTemplates = templates.filter(category.filter);

              if (categoryTemplates.length === 0) return null;

              return (
                <div key={category.name} className="flex-1 min-w-0">
                  <h3 className="text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide border-b-2 border-blue-200 pb-1">
                    {category.name}
                  </h3>
                  <div className="space-y-1.5">
                    {categoryTemplates.map(template => (
                      <button
                        key={template.id}
                        onClick={() => {
                          onTemplateSelect(template);
                          onToolChange('rectangle');
                          onLayerChange(template.layer);
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
  );
};
