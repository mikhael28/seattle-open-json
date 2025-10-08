// ============================================================================
// HISTORY MANAGER HOOK
// ============================================================================

import { useState, useCallback } from 'react';
import { DrawingElement, PropertyConfig, ChecklistProgress } from '../types';

interface HistoryState {
  elements: DrawingElement[];
  checklistProgress: ChecklistProgress;
}

export const useHistoryManager = (
  elements: DrawingElement[],
  checklistProgress: ChecklistProgress,
  onRestore: (state: HistoryState) => void
) => {
  const [history, setHistory] = useState<HistoryState[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const saveToHistory = useCallback(() => {
    const newHistoryState: HistoryState = {
      elements: JSON.parse(JSON.stringify(elements)),
      checklistProgress: JSON.parse(JSON.stringify(checklistProgress)),
    };

    // Remove any future history if we're not at the end
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newHistoryState);

    // Limit history to 50 states
    if (newHistory.length > 50) {
      newHistory.shift();
    } else {
      setHistoryIndex(historyIndex + 1);
    }

    setHistory(newHistory);
  }, [elements, checklistProgress, history, historyIndex]);

  const undo = useCallback(() => {
    if (historyIndex > 0) {
      const prevState = history[historyIndex - 1];
      onRestore(JSON.parse(JSON.stringify(prevState)));
      setHistoryIndex(historyIndex - 1);
    }
  }, [history, historyIndex, onRestore]);

  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const nextState = history[historyIndex + 1];
      onRestore(JSON.parse(JSON.stringify(nextState)));
      setHistoryIndex(historyIndex + 1);
    }
  }, [history, historyIndex, onRestore]);

  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < history.length - 1;

  return {
    saveToHistory,
    undo,
    redo,
    canUndo,
    canRedo,
  };
};
