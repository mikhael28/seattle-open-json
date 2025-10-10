// ============================================================================
// EVALUATION HISTORY UTILITIES
// ============================================================================

type SiteMapEvaluationStatus = 'ready_for_review' | 'needs_attention';
type SiteMapFindingStatus = 'met' | 'missing' | 'unclear';

interface SiteMapEvaluationFinding {
  requirement: string;
  status: SiteMapFindingStatus;
  notes?: string;
}

export interface SiteMapEvaluation {
  overallStatus: SiteMapEvaluationStatus;
  summary: string;
  findings: SiteMapEvaluationFinding[];
  timestamp: string;
  imageName: string;
  id: string;
}

const STORAGE_KEY = 'siteMapEvaluationHistory';
const MAX_HISTORY_ITEMS = 50;

/**
 * Save an evaluation to localStorage history
 */
export function saveEvaluation(
  evaluation: Omit<SiteMapEvaluation, 'id' | 'timestamp' | 'imageName'>,
  imageName: string
): SiteMapEvaluation {
  const history = getEvaluationHistory();

  const newEvaluation: SiteMapEvaluation = {
    ...evaluation,
    imageName,
    timestamp: new Date().toISOString(),
    id: `eval_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
  };

  // Add to the beginning of the array (most recent first)
  history.unshift(newEvaluation);

  // Limit the number of stored items
  if (history.length > MAX_HISTORY_ITEMS) {
    history.splice(MAX_HISTORY_ITEMS);
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  } catch (error) {
    console.error('Failed to save evaluation to localStorage:', error);
  }

  return newEvaluation;
}

/**
 * Get all evaluations from localStorage
 */
export function getEvaluationHistory(): SiteMapEvaluation[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];

    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error('Failed to retrieve evaluation history:', error);
    return [];
  }
}

/**
 * Get a specific evaluation by ID
 */
export function getEvaluationById(id: string): SiteMapEvaluation | null {
  const history = getEvaluationHistory();
  return history.find(item => item.id === id) || null;
}

/**
 * Delete an evaluation by ID
 */
export function deleteEvaluation(id: string): void {
  const history = getEvaluationHistory();
  const filtered = history.filter(item => item.id !== id);

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error('Failed to delete evaluation:', error);
  }
}

/**
 * Clear all evaluation history
 */
export function clearEvaluationHistory(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear evaluation history:', error);
  }
}

/**
 * Get statistics about evaluations
 */
export function getEvaluationStats() {
  const history = getEvaluationHistory();

  const total = history.length;
  const readyForReview = history.filter(e => e.overallStatus === 'ready_for_review').length;
  const needsAttention = history.filter(e => e.overallStatus === 'needs_attention').length;

  return {
    total,
    readyForReview,
    needsAttention,
  };
}
