// ============================================================================
// CHECKLIST PANEL COMPONENT
// ============================================================================

import React from 'react';
import { ChecklistProgress, DrawingElement, ElementTemplate } from '../types';

interface SiteMapRequirement {
  id: number;
  category: string;
  description: string;
  required: boolean;
}

interface ChecklistPanelProps {
  show: boolean;
  onClose: () => void;
  requirements: SiteMapRequirement[];
  checklistProgress: ChecklistProgress;
  elements: DrawingElement[];
  templates: ElementTemplate[];
  onUpdateChecklistItem: (requirementId: number, completed: boolean, elementId?: string) => void;
  completedCount: number;
  totalCount: number;
  completionPercentage: number;
}

export const ChecklistPanel: React.FC<ChecklistPanelProps> = ({
  show,
  onClose,
  requirements,
  checklistProgress,
  elements,
  templates,
  onUpdateChecklistItem,
  completedCount,
  totalCount,
  completionPercentage,
}) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-green-50">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Site Map Requirements Checklist</h2>
            <p className="text-sm text-gray-600 mt-1">
              Track your progress: {completedCount} of {totalCount} completed ({completionPercentage}%)
            </p>
          </div>
          <button
            onClick={onClose}
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
            {requirements.map((req) => {
              const progress = checklistProgress[req.id] || { completed: false, linkedElements: [] };
              const linkedElements = elements.filter(el => progress.linkedElements.includes(el.id));

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
                      onChange={(e) => onUpdateChecklistItem(req.id, e.target.checked)}
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
                              const template = templates.find(t => t.category === el.category);
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
            <span className="font-semibold">{completedCount}</span> of{' '}
            <span className="font-semibold">{totalCount}</span> required items completed
          </div>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
