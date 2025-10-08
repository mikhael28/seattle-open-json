// ============================================================================
// CHECKLIST PROGRESS HOOK
// ============================================================================

import { useState, useCallback } from 'react';
import { ChecklistProgress, DrawingElement } from '../types';

export const useChecklistProgress = () => {
  const [checklistProgress, setChecklistProgress] = useState<ChecklistProgress>({});

  const updateChecklistItem = useCallback((
    requirementId: number,
    completed: boolean,
    elementId?: string
  ) => {
    setChecklistProgress(prev => {
      const current = prev[requirementId] || { completed: false, linkedElements: [] };
      const linkedElements = elementId
        ? completed
          ? [...current.linkedElements, elementId]
          : current.linkedElements.filter(id => id !== elementId)
        : current.linkedElements;

      return {
        ...prev,
        [requirementId]: {
          ...current,
          completed,
          linkedElements,
        }
      };
    });
  }, []);

  const autoCheckRequirements = useCallback((element: DrawingElement) => {
    // Automatically check off requirements when relevant elements are added
    if (element.linkedRequirements) {
      element.linkedRequirements.forEach(reqId => {
        updateChecklistItem(reqId, true, element.id);
      });
    }
  }, [updateChecklistItem]);

  return {
    checklistProgress,
    setChecklistProgress,
    updateChecklistItem,
    autoCheckRequirements,
  };
};
