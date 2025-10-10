// ============================================================================
// EVALUATION HISTORY PANEL COMPONENT
// ============================================================================

import React, { useState, useEffect } from 'react';
import {
  getEvaluationHistory,
  deleteEvaluation,
  clearEvaluationHistory,
  getEvaluationStats,
  type SiteMapEvaluation,
} from '../../../utils/evaluationHistory';

interface EvaluationHistoryPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onViewEvaluation: (evaluation: SiteMapEvaluation) => void;
}

export const EvaluationHistoryPanel: React.FC<EvaluationHistoryPanelProps> = ({
  isOpen,
  onClose,
  onViewEvaluation,
}) => {
  const [history, setHistory] = useState<SiteMapEvaluation[]>([]);
  const [stats, setStats] = useState({ total: 0, readyForReview: 0, needsAttention: 0 });

  const refreshHistory = () => {
    setHistory(getEvaluationHistory());
    setStats(getEvaluationStats());
  };

  useEffect(() => {
    if (isOpen) {
      refreshHistory();
    }
  }, [isOpen]);

  const handleDelete = (id: string, imageName: string) => {
    if (window.confirm(`Delete evaluation for "${imageName}"?`)) {
      deleteEvaluation(id);
      refreshHistory();
    }
  };

  const handleClearAll = () => {
    if (window.confirm('Clear all evaluation history? This cannot be undone.')) {
      clearEvaluationHistory();
      refreshHistory();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white bg-opacity-20 rounded-lg p-2">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Evaluation History</h2>
              <p className="text-sm text-indigo-100">View past site map analyses</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-white hover:bg-opacity-20 rounded-lg p-2 transition-colors"
            title="Close"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Stats Bar */}
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-3 border border-gray-200">
              <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
              <div className="text-xs text-gray-600">Total Evaluations</div>
            </div>
            <div className="bg-emerald-50 rounded-lg p-3 border border-emerald-200">
              <div className="text-2xl font-bold text-emerald-700">{stats.readyForReview}</div>
              <div className="text-xs text-emerald-600">Ready for Review</div>
            </div>
            <div className="bg-amber-50 rounded-lg p-3 border border-amber-200">
              <div className="text-2xl font-bold text-amber-700">{stats.needsAttention}</div>
              <div className="text-xs text-amber-600">Needs Attention</div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {history.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="bg-gray-100 rounded-full p-6 mb-4">
                <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Evaluations Yet</h3>
              <p className="text-sm text-gray-600">Upload and analyze a site map to get started</p>
            </div>
          ) : (
            <div className="space-y-3">
              {history.map((evaluation) => (
                <div
                  key={evaluation.id}
                  className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all cursor-pointer group"
                  onClick={() => onViewEvaluation(evaluation)}
                >
                  <div className="flex items-start gap-4">
                    {/* Status Icon */}
                    <div className={`rounded-lg p-3 flex-shrink-0 ${
                      evaluation.overallStatus === 'ready_for_review'
                        ? 'bg-emerald-100'
                        : 'bg-amber-100'
                    }`}>
                      {evaluation.overallStatus === 'ready_for_review' ? (
                        <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      ) : (
                        <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 truncate group-hover:text-blue-600 transition-colors">
                            {evaluation.imageName}
                          </h3>
                          <p className="text-xs text-gray-500 mt-1">
                            {new Date(evaluation.timestamp).toLocaleString()}
                          </p>
                        </div>
                        <span className={`rounded-full px-3 py-1 text-xs font-semibold whitespace-nowrap ${
                          evaluation.overallStatus === 'ready_for_review'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}>
                          {evaluation.overallStatus === 'ready_for_review' ? 'Ready' : 'Needs Attention'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-2">{evaluation.summary}</p>

                      {/* Findings Summary */}
                      <div className="flex items-center gap-4 mt-3 text-xs">
                        <span className="flex items-center gap-1 text-emerald-600">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          {evaluation.findings.filter(f => f.status === 'met').length} met
                        </span>
                        <span className="flex items-center gap-1 text-red-600">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                          </svg>
                          {evaluation.findings.filter(f => f.status === 'missing').length} missing
                        </span>
                        <span className="flex items-center gap-1 text-yellow-600">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                          </svg>
                          {evaluation.findings.filter(f => f.status === 'unclear').length} unclear
                        </span>
                      </div>
                    </div>

                    {/* Delete Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(evaluation.id, evaluation.imageName);
                      }}
                      className="text-gray-400 hover:text-red-600 p-2 rounded-lg hover:bg-red-50 transition-colors opacity-0 group-hover:opacity-100"
                      title="Delete"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 flex items-center justify-between border-t border-gray-200">
          <button
            onClick={handleClearAll}
            disabled={history.length === 0}
            className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Clear All History
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
