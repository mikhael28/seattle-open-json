// ============================================================================
// KEYBOARD SHORTCUTS HOOK
// ============================================================================

import { useEffect } from 'react';
import { DrawingTool } from '../types';

interface KeyboardShortcutsConfig {
  onToolChange: (tool: DrawingTool) => void;
  onDelete: () => void;
  onUndo: () => void;
  onRedo: () => void;
  onExport: () => void;
  onToggleGrid: () => void;
  onToggleSnap: () => void;
  selectedElementId: string | null;
}

export const useKeyboardShortcuts = (config: KeyboardShortcutsConfig) => {
  const {
    onToolChange,
    onDelete,
    onUndo,
    onRedo,
    onExport,
    onToggleGrid,
    onToggleSnap,
    selectedElementId,
  } = config;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing in an input field
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      // Tool shortcuts
      if (e.key === 'v' || e.key === 'V') {
        onToolChange('select');
      } else if (e.key === 'l' || e.key === 'L') {
        onToolChange('line');
      } else if (e.key === 'r' || e.key === 'R') {
        onToolChange('rectangle');
      } else if (e.key === 'c' || e.key === 'C') {
        onToolChange('circle');
      } else if (e.key === 't' || e.key === 'T') {
        onToolChange('text');
      } else if (e.key === 'm' || e.key === 'M') {
        onToolChange('measurement');
      }

      // Delete selected element
      else if ((e.key === 'Delete' || e.key === 'Backspace') && selectedElementId) {
        e.preventDefault();
        onDelete();
      }

      // Undo/Redo
      else if (e.key === 'z' && (e.ctrlKey || e.metaKey) && !e.shiftKey) {
        e.preventDefault();
        onUndo();
      } else if (e.key === 'z' && (e.ctrlKey || e.metaKey) && e.shiftKey) {
        e.preventDefault();
        onRedo();
      } else if (e.key === 'y' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        onRedo();
      }

      // Export
      else if (e.key === 's' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        onExport();
      }

      // View toggles
      else if (e.key === 'g' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        onToggleGrid();
      } else if (e.key === 'n' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        onToggleSnap();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    onToolChange,
    onDelete,
    onUndo,
    onRedo,
    onExport,
    onToggleGrid,
    onToggleSnap,
    selectedElementId,
  ]);
};
