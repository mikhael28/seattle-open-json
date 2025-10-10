// ============================================================================
// SITE MAP EVALUATION MODAL COMPONENT
// ============================================================================

import React from 'react';

type SiteMapEvaluationStatus = 'ready_for_review' | 'needs_attention';
type SiteMapFindingStatus = 'met' | 'missing' | 'unclear';

interface SiteMapEvaluationFinding {
  requirement: string;
  status: SiteMapFindingStatus;
  notes?: string;
}

interface SiteMapEvaluation {
  overallStatus: SiteMapEvaluationStatus;
  summary: string;
  findings: SiteMapEvaluationFinding[];
  timestamp?: string;
  imageName?: string;
}

interface EvaluationModalProps {
  isOpen: boolean;
  isLoading: boolean;
  evaluation: SiteMapEvaluation | null;
  error: string | null;
  imageName: string;
  onClose: () => void;
}

const LOADING_MESSAGES = [
  "🏗️ Analyzing your site plan blueprints...",
  "📐 Measuring setbacks and dimensions...",
  "🌳 Checking tree preservation areas...",
  "🚧 Reviewing construction access routes...",
  "📋 Verifying permit requirements...",
  "🏛️ Cross-referencing building codes...",
  "🗺️ Mapping property boundaries...",
  "✨ Putting the finishing touches...",
];

export const EvaluationModal: React.FC<EvaluationModalProps> = ({
  isOpen,
  isLoading,
  evaluation,
  error,
  imageName,
  onClose,
}) => {
  const [currentMessageIndex, setCurrentMessageIndex] = React.useState(0);

  React.useEffect(() => {
    if (!isLoading) return;

    const interval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [isLoading]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white bg-opacity-20 rounded-lg p-2">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Site Map Analysis</h2>
              <p className="text-sm text-blue-100">{imageName}</p>
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

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Loading State */}
          {isLoading && (
            <div className="flex flex-col items-center justify-center py-12 space-y-6">
              <div className="relative">
                <div className="w-20 h-20 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-10 h-10 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
                  </svg>
                </div>
              </div>
              <div className="text-center space-y-2">
                <p className="text-lg font-semibold text-gray-800 animate-pulse">
                  {LOADING_MESSAGES[currentMessageIndex]}
                </p>
                <p className="text-sm text-gray-500">This may take a few moments</p>
              </div>
            </div>
          )}

          {/* Error State */}
          {error && !isLoading && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <h3 className="font-semibold text-red-900 mb-1">Analysis Failed</h3>
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Success State */}
          {evaluation && !isLoading && !error && (
            <div className="space-y-6">
              {/* Overall Status Banner */}
              <div className={`rounded-lg p-6 ${
                evaluation.overallStatus === 'ready_for_review'
                  ? 'bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200'
                  : 'bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200'
              }`}>
                <div className="flex items-start gap-4">
                  <div className={`rounded-full p-3 ${
                    evaluation.overallStatus === 'ready_for_review'
                      ? 'bg-emerald-100'
                      : 'bg-amber-100'
                  }`}>
                    {evaluation.overallStatus === 'ready_for_review' ? (
                      <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    ) : (
                      <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className={`text-xl font-bold mb-2 ${
                      evaluation.overallStatus === 'ready_for_review'
                        ? 'text-emerald-900'
                        : 'text-amber-900'
                    }`}>
                      {evaluation.overallStatus === 'ready_for_review'
                        ? 'Ready for Review'
                        : 'Needs Attention'}
                    </h3>
                    <p className={`text-sm ${
                      evaluation.overallStatus === 'ready_for_review'
                        ? 'text-emerald-800'
                        : 'text-amber-800'
                    }`}>
                      {evaluation.summary}
                    </p>
                  </div>
                </div>
              </div>

              {/* Findings List */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  Detailed Findings ({evaluation.findings.length})
                </h4>
                <div className="space-y-3">
                  {evaluation.findings.map((finding, index) => (
                    <div
                      key={`${finding.requirement}-${index}`}
                      className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start gap-3">
                        <span className={`rounded-full px-3 py-1 text-xs font-semibold flex-shrink-0 ${
                          finding.status === 'met'
                            ? 'bg-emerald-100 text-emerald-800'
                            : finding.status === 'missing'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {finding.status === 'met' ? '✓ Met' : finding.status === 'missing' ? '✗ Missing' : '? Unclear'}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-gray-900 mb-1">{finding.requirement}</p>
                          {finding.notes && (
                            <p className="text-sm text-gray-600">{finding.notes}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Timestamp */}
              {evaluation.timestamp && (
                <div className="text-xs text-gray-500 text-center pt-4 border-t border-gray-200">
                  Analysis completed on {new Date(evaluation.timestamp).toLocaleString()}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        {!isLoading && (
          <div className="bg-gray-50 px-6 py-4 flex items-center justify-end gap-3 border-t border-gray-200">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
