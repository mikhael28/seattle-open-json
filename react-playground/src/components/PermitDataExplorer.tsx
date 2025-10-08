import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  Building,
  MessageSquare,
  FileText,
  MapPin,
  Calendar,
  DollarSign,
  Users,
  Clock,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  X,
  Copy,
  Check
} from 'lucide-react';
import { Button } from './ui/button';
import { 
  buildingPermits, 
  planComments, 
  planReview,
  type BuildingPermit,
  type PlanComment,
  type PlanReview
} from 'seattle-open-json';

type DataType = 'permits' | 'comments' | 'reviews' | 'report';

interface FilterState {
  searchTerm: string;
  permitClass: string;
  permitType: string;
  status: string;
  minCost: string;
  maxCost: string;
  minReviewCycles: string;
  maxReviewCycles: string;
  reviewType: string;
  reviewResult: string;
}

const PermitDataExplorer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<DataType>('permits');
  const [reportPermitNum, setReportPermitNum] = useState<string>('');
  const [selectedItem, setSelectedItem] = useState<BuildingPermit | PlanComment | PlanReview | null>(null);
  const [modalTab, setModalTab] = useState<'pretty' | 'json'>('pretty');
  const [copied, setCopied] = useState(false);
  const [reportCopied, setReportCopied] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    searchTerm: '',
    permitClass: '',
    permitType: '',
    status: '',
    minCost: '',
    maxCost: '',
    minReviewCycles: '',
    maxReviewCycles: '',
    reviewType: '',
    reviewResult: ''
  });
  const [showFilters, setShowFilters] = useState(false);

  // Get unique values for filter dropdowns
  const uniqueValues = useMemo(() => {
    return {
      permitClasses: [...new Set(buildingPermits.map(p => p.PermitClassMapped))].sort(),
      permitTypes: [...new Set(buildingPermits.map(p => p.PermitTypeDesc))].sort(),
      statuses: [...new Set(buildingPermits.map(p => p.StatusCurrent))].sort(),
      reviewTypes: [...new Set([...planComments.map(c => c.ReviewType), ...planReview.map(r => r.ReviewType)])].sort(),
      reviewResults: [...new Set(planReview.map(r => r.ReviewResultDesc))].sort()
    };
  }, []);

  // Filter data based on current filters
  const filteredData = useMemo(() => {
    let data: any[] = [];
    
    switch (activeTab) {
      case 'permits':
        data = buildingPermits;
        break;
      case 'comments':
        data = planComments;
        break;
      case 'reviews':
        data = planReview;
        break;
    }

    return data.filter((item) => {
      // Search term filter
      if (filters.searchTerm) {
        const searchLower = filters.searchTerm.toLowerCase();
        const searchableText = [
          item.PermitNum,
          item.Description || item.Comment || '',
          item.OriginalAddress1 || '',
          item.Reviewer || '',
          item.Subject || ''
        ].join(' ').toLowerCase();
        
        if (!searchableText.includes(searchLower)) return false;
      }

      // Permit-specific filters
      if (activeTab === 'permits') {
        if (filters.permitClass && item.PermitClassMapped !== filters.permitClass) return false;
        if (filters.permitType && item.PermitTypeDesc !== filters.permitType) return false;
        if (filters.status && item.StatusCurrent !== filters.status) return false;
        
        if (filters.minCost && item.EstProjectCost < parseInt(filters.minCost)) return false;
        if (filters.maxCost && item.EstProjectCost > parseInt(filters.maxCost)) return false;
        
        if (filters.minReviewCycles && item.NumberReviewCycles < parseInt(filters.minReviewCycles)) return false;
        if (filters.maxReviewCycles && item.NumberReviewCycles > parseInt(filters.maxReviewCycles)) return false;
      }

      // Review-specific filters
      if (activeTab === 'reviews' || activeTab === 'comments') {
        if (filters.reviewType && item.ReviewType !== filters.reviewType) return false;
        if (filters.reviewResult && item.ReviewResultDesc && item.ReviewResultDesc !== filters.reviewResult) return false;
      }

      return true;
    });
  }, [activeTab, filters]);

  // Collect all data for a specific permit number
  const reportData = useMemo(() => {
    if (!reportPermitNum) return null;

    return {
      permit: buildingPermits.find(p => p.PermitNum === reportPermitNum),
      comments: planComments.filter(c => c.PermitNum === reportPermitNum),
      reviews: planReview.filter(r => r.PermitNum === reportPermitNum)
    };
  }, [reportPermitNum]);

  const handlePermitNumClick = (permitNum: string) => {
    setReportPermitNum(permitNum);
    setActiveTab('report');
  };

  const copyToClipboard = async (text: string, setCopiedState: (value: boolean) => void) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedState(true);
      setTimeout(() => setCopiedState(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleCopyReport = () => {
    if (!reportData) return;

    const reportJson = {
      permitNumber: reportPermitNum,
      permit: reportData.permit,
      comments: reportData.comments,
      reviews: reportData.reviews
    };

    copyToClipboard(JSON.stringify(reportJson, null, 2), setReportCopied);
  };

  const clearFilters = () => {
    setFilters({
      searchTerm: '',
      permitClass: '',
      permitType: '',
      status: '',
      minCost: '',
      maxCost: '',
      minReviewCycles: '',
      maxReviewCycles: '',
      reviewType: '',
      reviewResult: ''
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  const renderPermitCard = (permit: BuildingPermit, idx: number) => (
    <div
      key={idx}
      className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => {
        setSelectedItem(permit);
        setModalTab('pretty');
      }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <Building className="h-5 w-5 text-blue-600" />
          <h3
            className="font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              handlePermitNumClick(permit.PermitNum);
            }}
          >
            {permit.PermitNum}
          </h3>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          permit.StatusCurrent === 'Issued' ? 'bg-green-100 text-green-800' :
          permit.StatusCurrent === 'Applied' ? 'bg-yellow-100 text-yellow-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {permit.StatusCurrent}
        </span>
      </div>
      
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
        {permit.Description}
      </p>
      
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-gray-400" />
          <span className="text-gray-600 dark:text-gray-300 truncate">{permit.OriginalAddress1}</span>
        </div>
        <div className="flex items-center gap-2">
          <DollarSign className="h-4 w-4 text-gray-400" />
          <span className="text-gray-600 dark:text-gray-300">{formatCurrency(permit.EstProjectCost)}</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-gray-400" />
          <span className="text-gray-600 dark:text-gray-300">{formatDate(permit.AppliedDate)}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-gray-400" />
          <span className="text-gray-600 dark:text-gray-300">{permit.NumberReviewCycles} cycles</span>
        </div>
      </div>
      
      <div className="mt-3 flex items-center justify-between">
        <span className="text-xs text-gray-500 dark:text-gray-400">
          {permit.PermitClassMapped} • {permit.PermitTypeDesc}
        </span>
        <ExternalLink className="h-4 w-4 text-gray-400" />
      </div>
    </div>
  );

  const renderCommentCard = (comment: PlanComment, idx: number) => (
    <div
      key={idx}
      className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => {
        setSelectedItem(comment);
        setModalTab('pretty');
      }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-orange-600" />
          <h3
            className="font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              handlePermitNumClick(comment.PermitNum);
            }}
          >
            {comment.PermitNum}
          </h3>
        </div>
        <span className="px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
          Cycle {comment.ReviewCycle}
        </span>
      </div>
      
      <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">{comment.Subject}</h4>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-3">
        {comment.Comment}
      </p>
      
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-500 dark:text-gray-400">{comment.ReviewType}</span>
        <span className="text-gray-500 dark:text-gray-400">{formatDate(comment.DocumentDate)}</span>
      </div>
    </div>
  );

  const renderReviewCard = (review: PlanReview, idx: number) => (
    <div
      key={idx}
      className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => {
        setSelectedItem(review);
        setModalTab('pretty');
      }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-purple-600" />
          <h3
            className="font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              handlePermitNumClick(review.PermitNum);
            }}
          >
            {review.PermitNum}
          </h3>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          review.ReviewResultDesc === 'Approved' ? 'bg-green-100 text-green-800' :
          review.ReviewResultDesc === 'Rejected' ? 'bg-red-100 text-red-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {review.ReviewResultDesc}
        </span>
      </div>
      
      <div className="mb-3">
        <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-1">{review.ReviewType}</h4>
        <p className="text-sm text-gray-600 dark:text-gray-300">Reviewer: {review.Reviewer}</p>
      </div>
      
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-gray-400" />
          <span className="text-gray-600 dark:text-gray-300">{review.ReviewTeam}</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-gray-400" />
          <span className="text-gray-600 dark:text-gray-300">{formatDate(review.ReviewerFinishDate)}</span>
        </div>
      </div>
      
      <div className="mt-3 flex items-center justify-between">
        <span className="text-xs text-gray-500 dark:text-gray-400">
          Cycle {review.ReviewCycle} • {review.ReviewComplexityDesc}
        </span>
        <ExternalLink className="h-4 w-4 text-gray-400" />
      </div>
    </div>
  );

  const renderPermitReport = () => {
    if (!reportData) {
      return (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-300">
            Enter a Permit Number above to view its comprehensive report
          </p>
        </div>
      );
    }

    const { permit, comments, reviews } = reportData;

    if (!permit && comments.length === 0 && reviews.length === 0) {
      return (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-300">
            No data found for Permit Number: {reportPermitNum}
          </p>
        </div>
      );
    }

    // Sort reviews and comments by date (most recent first)
    const sortedReviews = [...reviews].sort((a, b) => {
      const dateA = new Date(a.ReviewerFinishDate).getTime();
      const dateB = new Date(b.ReviewerFinishDate).getTime();
      return dateB - dateA; // Descending order
    });

    const sortedComments = [...comments].sort((a, b) => {
      const dateA = new Date(a.DocumentDate).getTime();
      const dateB = new Date(b.DocumentDate).getTime();
      return dateB - dateA; // Descending order
    });

    return (
      <div className="space-y-6">
        {/* Copy Report Button */}
        <div className="flex justify-end">
          <Button
            variant="outline"
            onClick={handleCopyReport}
            className="flex items-center gap-2"
          >
            {reportCopied ? (
              <>
                <Check className="h-4 w-4" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                Copy Report JSON
              </>
            )}
          </Button>
        </div>
        {/* Building Permit Section */}
        {permit && (
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Building className="h-6 w-6 text-blue-600" />
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Building Permit</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Basic Information</h3>
                <dl className="space-y-2">
                  <div>
                    <dt className="text-xs text-gray-500 dark:text-gray-400">Permit Number</dt>
                    <dd className="text-sm font-medium text-gray-900 dark:text-white">{permit.PermitNum}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-gray-500 dark:text-gray-400">Status</dt>
                    <dd>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                        permit.StatusCurrent === 'Issued' ? 'bg-green-100 text-green-800' :
                        permit.StatusCurrent === 'Applied' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {permit.StatusCurrent}
                      </span>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-gray-500 dark:text-gray-400">Description</dt>
                    <dd className="text-sm text-gray-900 dark:text-white">{permit.Description}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-gray-500 dark:text-gray-400">Address</dt>
                    <dd className="text-sm text-gray-900 dark:text-white">{permit.OriginalAddress1}</dd>
                  </div>
                </dl>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Project Details</h3>
                <dl className="space-y-2">
                  <div>
                    <dt className="text-xs text-gray-500 dark:text-gray-400">Permit Class</dt>
                    <dd className="text-sm text-gray-900 dark:text-white">{permit.PermitClassMapped}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-gray-500 dark:text-gray-400">Permit Type</dt>
                    <dd className="text-sm text-gray-900 dark:text-white">{permit.PermitTypeDesc}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-gray-500 dark:text-gray-400">Estimated Cost</dt>
                    <dd className="text-sm font-medium text-gray-900 dark:text-white">{formatCurrency(permit.EstProjectCost)}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-gray-500 dark:text-gray-400">Applied Date</dt>
                    <dd className="text-sm text-gray-900 dark:text-white">{formatDate(permit.AppliedDate)}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-gray-500 dark:text-gray-400">Review Cycles</dt>
                    <dd className="text-sm text-gray-900 dark:text-white">{permit.NumberReviewCycles}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        )}

        {/* Plan Reviews and Comments Section - Side by Side */}
        {(sortedReviews.length > 0 || sortedComments.length > 0) && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Plan Reviews Section */}
            {sortedReviews.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 flex flex-col">
                <div className="flex items-center gap-2 p-6 pb-4 border-b border-gray-200 dark:border-gray-700">
                  <FileText className="h-6 w-6 text-purple-600" />
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    Plan Reviews ({sortedReviews.length})
                  </h2>
                </div>

                <div className="flex-1 overflow-auto p-6 pt-4 space-y-4 max-h-[600px]">
                  {sortedReviews.map((review, idx) => (
                    <div
                      key={idx}
                      className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                      onClick={() => {
                        setSelectedItem(review);
                        setModalTab('pretty');
                      }}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-gray-900 dark:text-white">{review.ReviewType}</h3>
                            {review.GreenBuildingProject && (
                              <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
                                Green
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-300">Cycle {review.ReviewCycle} • Priority: {review.ReviewPriority || 'Standard'}</p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium flex-shrink-0 ml-2 ${
                          review.ReviewResultDesc === 'Approved' ? 'bg-green-100 text-green-800' :
                          review.ReviewResultDesc === 'Rejected' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {review.ReviewResultDesc}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                        <div>
                          <dt className="text-xs text-gray-500 dark:text-gray-400">Reviewer</dt>
                          <dd className="text-sm text-gray-900 dark:text-white">{review.Reviewer}</dd>
                        </div>
                        <div>
                          <dt className="text-xs text-gray-500 dark:text-gray-400">Team</dt>
                          <dd className="text-sm text-gray-900 dark:text-white">{review.ReviewTeam}</dd>
                        </div>
                        <div>
                          <dt className="text-xs text-gray-500 dark:text-gray-400">Complexity</dt>
                          <dd className="text-sm text-gray-900 dark:text-white">{review.ReviewComplexityDesc}</dd>
                        </div>
                        <div>
                          <dt className="text-xs text-gray-500 dark:text-gray-400">Finish Date</dt>
                          <dd className="text-sm text-gray-900 dark:text-white">{formatDate(review.ReviewerFinishDate)}</dd>
                        </div>
                      </div>

                      <div className="flex items-center justify-end">
                        {review.Link && (
                          <a
                            href={review.Link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Plan Comments Section */}
            {sortedComments.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 flex flex-col">
                <div className="flex items-center gap-2 p-6 pb-4 border-b border-gray-200 dark:border-gray-700">
                  <MessageSquare className="h-6 w-6 text-orange-600" />
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    Plan Comments ({sortedComments.length})
                  </h2>
                </div>

                <div className="flex-1 overflow-auto p-6 pt-4 space-y-4 max-h-[600px]">
                  {sortedComments.map((comment, idx) => (
                    <div
                      key={idx}
                      className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                      onClick={() => {
                        setSelectedItem(comment);
                        setModalTab('pretty');
                      }}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 dark:text-white">{comment.Subject}</h3>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{comment.DocumentTitle}</p>
                        </div>
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800 flex-shrink-0 ml-2">
                          Cycle {comment.ReviewCycle}
                        </span>
                      </div>

                      <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                        {comment.Comment}
                      </p>

                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500 dark:text-gray-400">{comment.ReviewType}</span>
                        <div className="flex items-center gap-3">
                          <span className="text-gray-500 dark:text-gray-400">{formatDate(comment.DocumentDate)}</span>
                          {comment.URL && (
                            <a
                              href={comment.URL}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  const renderPermitDetails = (permit: BuildingPermit) => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Basic Information</h3>
        <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Permit Number</dt>
            <dd className="mt-1 text-sm text-gray-900 dark:text-white">{permit.PermitNum}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Status</dt>
            <dd className="mt-1">
              <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                permit.StatusCurrent === 'Issued' ? 'bg-green-100 text-green-800' :
                permit.StatusCurrent === 'Applied' ? 'bg-yellow-100 text-yellow-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {permit.StatusCurrent}
              </span>
            </dd>
          </div>
          <div className="md:col-span-2">
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Description</dt>
            <dd className="mt-1 text-sm text-gray-900 dark:text-white">{permit.Description}</dd>
          </div>
          <div className="md:col-span-2">
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Address</dt>
            <dd className="mt-1 text-sm text-gray-900 dark:text-white">{permit.OriginalAddress1}</dd>
          </div>
        </dl>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Project Details</h3>
        <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Permit Class</dt>
            <dd className="mt-1 text-sm text-gray-900 dark:text-white">{permit.PermitClassMapped}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Permit Type</dt>
            <dd className="mt-1 text-sm text-gray-900 dark:text-white">{permit.PermitTypeDesc}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Estimated Cost</dt>
            <dd className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">{formatCurrency(permit.EstProjectCost)}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Contractor</dt>
            <dd className="mt-1 text-sm text-gray-900 dark:text-white">{permit.ContractorCompanyName || 'N/A'}</dd>
          </div>
          {permit.HousingUnits > 0 && (
            <>
              <div>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Housing Units</dt>
                <dd className="mt-1 text-sm text-gray-900 dark:text-white">{permit.HousingUnits}</dd>
              </div>
              {(permit.HousingUnitsAdded > 0 || permit.HousingUnitsRemoved > 0) && (
                <div>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Units Added/Removed</dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                    +{permit.HousingUnitsAdded} / -{permit.HousingUnitsRemoved}
                  </dd>
                </div>
              )}
            </>
          )}
          {permit.Zoning && (
            <div>
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Zoning</dt>
              <dd className="mt-1 text-sm text-gray-900 dark:text-white">{permit.Zoning}</dd>
            </div>
          )}
          {permit.RelatedMup && (
            <div>
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Related MUP</dt>
              <dd className="mt-1 text-sm text-gray-900 dark:text-white">{permit.RelatedMup}</dd>
            </div>
          )}
        </dl>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Timeline</h3>
        <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Applied Date</dt>
            <dd className="mt-1 text-sm text-gray-900 dark:text-white">{formatDate(permit.AppliedDate)}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Issued Date</dt>
            <dd className="mt-1 text-sm text-gray-900 dark:text-white">{formatDate(permit.IssuedDate)}</dd>
          </div>
          {permit.CompletedDate && (
            <div>
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Completed Date</dt>
              <dd className="mt-1 text-sm text-gray-900 dark:text-white">{formatDate(permit.CompletedDate)}</dd>
            </div>
          )}
          {permit.ExpiresDate && (
            <div>
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Expires Date</dt>
              <dd className="mt-1 text-sm text-gray-900 dark:text-white">{formatDate(permit.ExpiresDate)}</dd>
            </div>
          )}
          <div>
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Review Cycles</dt>
            <dd className="mt-1 text-sm text-gray-900 dark:text-white">{permit.NumberReviewCycles}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Days Plan Review</dt>
            <dd className="mt-1 text-sm text-gray-900 dark:text-white">{permit.TotalDaysPlanReview || 'N/A'}</dd>
          </div>
          {permit.DaysOutCorrections > 0 && (
            <div>
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Days Out for Corrections</dt>
              <dd className="mt-1 text-sm text-gray-900 dark:text-white">{permit.DaysOutCorrections}</dd>
            </div>
          )}
        </dl>
      </div>

      {permit.Link && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Additional Info</h3>
          <a
            href={permit.Link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
          >
            View on City of Seattle Portal
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      )}
    </div>
  );

  const renderCommentDetails = (comment: PlanComment) => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Comment Information</h3>
        <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Permit Number</dt>
            <dd className="mt-1 text-sm text-gray-900 dark:text-white">{comment.PermitNum}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Review Cycle</dt>
            <dd className="mt-1">
              <span className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                Cycle {comment.ReviewCycle}
              </span>
            </dd>
          </div>
          <div className="md:col-span-2">
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Document Title</dt>
            <dd className="mt-1 text-sm font-medium text-gray-900 dark:text-white">{comment.DocumentTitle}</dd>
          </div>
          <div className="md:col-span-2">
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Subject</dt>
            <dd className="mt-1 text-base font-semibold text-gray-900 dark:text-white">{comment.Subject}</dd>
          </div>
          <div className="md:col-span-2">
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Comment</dt>
            <dd className="mt-1 text-sm text-gray-900 dark:text-white whitespace-pre-wrap">{comment.Comment}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Review Type</dt>
            <dd className="mt-1 text-sm text-gray-900 dark:text-white">{comment.ReviewType}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Document Date</dt>
            <dd className="mt-1 text-sm text-gray-900 dark:text-white">{formatDate(comment.DocumentDate)}</dd>
          </div>
        </dl>
      </div>

      {comment.URL && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Document Link</h3>
          <a
            href={comment.URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
          >
            View Document on City of Seattle Portal
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      )}
    </div>
  );

  const renderReviewDetails = (review: PlanReview) => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Review Information</h3>
        <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Permit Number</dt>
            <dd className="mt-1 text-sm text-gray-900 dark:text-white">{review.PermitNum}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Review Result</dt>
            <dd className="mt-1">
              <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                review.ReviewResultDesc === 'Approved' ? 'bg-green-100 text-green-800' :
                review.ReviewResultDesc === 'Rejected' ? 'bg-red-100 text-red-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {review.ReviewResultDesc}
              </span>
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Review Type</dt>
            <dd className="mt-1 text-sm text-gray-900 dark:text-white">{review.ReviewType}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Review Cycle</dt>
            <dd className="mt-1 text-sm text-gray-900 dark:text-white">Cycle {review.ReviewCycle}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Reviewer</dt>
            <dd className="mt-1 text-sm text-gray-900 dark:text-white">{review.Reviewer}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Review Team</dt>
            <dd className="mt-1 text-sm text-gray-900 dark:text-white">{review.ReviewTeam}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Complexity</dt>
            <dd className="mt-1 text-sm text-gray-900 dark:text-white">{review.ReviewComplexityDesc}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Priority</dt>
            <dd className="mt-1 text-sm text-gray-900 dark:text-white">{review.ReviewPriority || 'N/A'}</dd>
          </div>
          {review.GreenBuildingProject && (
            <div className="md:col-span-2">
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Green Building Project</dt>
              <dd className="mt-1">
                <span className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  {review.GreenBuildingProject}
                </span>
              </dd>
            </div>
          )}
        </dl>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Timeline</h3>
        <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Team Assigned</dt>
            <dd className="mt-1 text-sm text-gray-900 dark:text-white">{formatDate(review.ReviewTeamAssignDate)}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Reviewer Assigned</dt>
            <dd className="mt-1 text-sm text-gray-900 dark:text-white">{formatDate(review.ReviewerAssignDate)}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Review Finished</dt>
            <dd className="mt-1 text-sm text-gray-900 dark:text-white">{formatDate(review.ReviewerFinishDate)}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Days Out for Corrections</dt>
            <dd className="mt-1 text-sm text-gray-900 dark:text-white">{review.DaysOutCorrections}</dd>
          </div>
        </dl>
      </div>

      {review.OriginalAddress1 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Project Location</h3>
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Address</dt>
              <dd className="mt-1 text-sm text-gray-900 dark:text-white">{review.OriginalAddress1}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">City, State ZIP</dt>
              <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                {review.OriginalCity}, {review.OriginalState} {review.OriginalZip}
              </dd>
            </div>
            {review.Zoning && (
              <div>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Zoning</dt>
                <dd className="mt-1 text-sm text-gray-900 dark:text-white">{review.Zoning}</dd>
              </div>
            )}
          </dl>
        </div>
      )}

      {review.Link && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Additional Info</h3>
          <a
            href={review.Link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
          >
            View on City of Seattle Portal
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      )}
    </div>
  );

  const renderDetailModal = () => {
    if (!selectedItem) return null;

    const isPlanComment = 'Comment' in selectedItem;
    const isPlanReview = 'ReviewResultDesc' in selectedItem;
    const isBuildingPermit = !isPlanComment && !isPlanReview;

    return (
      <div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        onClick={() => {
          setSelectedItem(null);
          setModalTab('pretty');
          setCopied(false);
        }}
      >
        <div
          className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {selectedItem.PermitNum} Details
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSelectedItem(null);
                setModalTab('pretty');
              }}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
            <button
              className={`px-6 py-3 font-medium text-sm transition-colors ${
                modalTab === 'pretty'
                  ? 'border-b-2 border-blue-600 text-blue-600 dark:text-blue-400 bg-white dark:bg-gray-800'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
              onClick={() => setModalTab('pretty')}
            >
              Details
            </button>
            <button
              className={`px-6 py-3 font-medium text-sm transition-colors ${
                modalTab === 'json'
                  ? 'border-b-2 border-blue-600 text-blue-600 dark:text-blue-400 bg-white dark:bg-gray-800'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
              onClick={() => setModalTab('json')}
            >
              Raw JSON
            </button>
          </div>

          <div className="flex-1 overflow-auto p-6">
            {modalTab === 'pretty' ? (
              <>
                {isBuildingPermit && renderPermitDetails(selectedItem as BuildingPermit)}
                {isPlanComment && renderCommentDetails(selectedItem as PlanComment)}
                {isPlanReview && renderReviewDetails(selectedItem as PlanReview)}
              </>
            ) : (
              <div className="relative">
                <Button
                  variant="outline"
                  size="sm"
                  className="absolute top-2 right-2 z-10"
                  onClick={() => copyToClipboard(JSON.stringify(selectedItem, null, 2), setCopied)}
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4 mr-2" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 mr-2" />
                      Copy JSON
                    </>
                  )}
                </Button>
                <pre className="text-sm text-gray-600 dark:text-gray-300 whitespace-pre-wrap overflow-auto pr-32">
                  {JSON.stringify(selectedItem, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Seattle Permit Data Explorer</h1>
            <p className="text-gray-600 dark:text-gray-300">
              Explore building permits, plan comments, and review data from the City of Seattle
            </p>
          </div>
          {activeTab !== 'report' && (
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2"
              >
                <Filter className="h-4 w-4" />
                Filters
                {showFilters ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
            </div>
          )}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 flex-wrap">
          <Button
            variant={activeTab === 'permits' ? 'default' : 'outline'}
            onClick={() => setActiveTab('permits')}
            className="flex items-center gap-2"
          >
            <Building className="h-4 w-4" />
            Building Permits ({buildingPermits.length.toLocaleString()})
          </Button>
          <Button
            variant={activeTab === 'comments' ? 'default' : 'outline'}
            onClick={() => setActiveTab('comments')}
            className="flex items-center gap-2"
          >
            <MessageSquare className="h-4 w-4" />
            Plan Comments ({planComments.length.toLocaleString()})
          </Button>
          <Button
            variant={activeTab === 'reviews' ? 'default' : 'outline'}
            onClick={() => setActiveTab('reviews')}
            className="flex items-center gap-2"
          >
            <FileText className="h-4 w-4" />
            Plan Reviews ({planReview.length.toLocaleString()})
          </Button>
          <Button
            variant={activeTab === 'report' ? 'default' : 'outline'}
            onClick={() => setActiveTab('report')}
            className="flex items-center gap-2"
          >
            <Search className="h-4 w-4" />
            Permit Report
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="mt-4">
          {activeTab === 'report' ? (
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Enter Permit Number (e.g., AG 6123456)"
                  value={reportPermitNum}
                  onChange={(e) => setReportPermitNum(e.target.value.trim())}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <Button
                variant="outline"
                onClick={() => setReportPermitNum('')}
                className="flex items-center gap-2"
              >
                Clear
              </Button>
            </div>
          ) : (
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search permits, addresses, descriptions..."
                  value={filters.searchTerm}
                  onChange={(e) => setFilters(prev => ({ ...prev, searchTerm: e.target.value }))}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <Button
                variant="outline"
                onClick={clearFilters}
                className="flex items-center gap-2"
              >
                Clear Filters
              </Button>
            </div>
          )}

          {/* Filter Panel */}
          {showFilters && activeTab !== 'report' && (
            <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {activeTab === 'permits' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Permit Class
                      </label>
                      <select
                        value={filters.permitClass}
                        onChange={(e) => setFilters(prev => ({ ...prev, permitClass: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      >
                        <option value="">All Classes</option>
                        {uniqueValues.permitClasses.map((cls, idx) => (
                          <option key={idx} value={cls}>{cls}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Status
                      </label>
                      <select
                        value={filters.status}
                        onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      >
                        <option value="">All Statuses</option>
                        {uniqueValues.statuses.map((status, idx)     => (
                          <option key={idx} value={status}>{status}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Min Cost
                      </label>
                      <input
                        type="number"
                        placeholder="0"
                        value={filters.minCost}
                        onChange={(e) => setFilters(prev => ({ ...prev, minCost: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Max Cost
                      </label>
                      <input
                        type="number"
                        placeholder="1000000"
                        value={filters.maxCost}
                        onChange={(e) => setFilters(prev => ({ ...prev, maxCost: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Min Review Cycles
                      </label>
                      <input
                        type="number"
                        placeholder="0"
                        value={filters.minReviewCycles}
                        onChange={(e) => setFilters(prev => ({ ...prev, minReviewCycles: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      />
                    </div>
                  </>
                )}
                
                {(activeTab === 'comments' || activeTab === 'reviews') && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Review Type
                      </label>
                      <select
                        value={filters.reviewType}
                        onChange={(e) => setFilters(prev => ({ ...prev, reviewType: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      >
                        <option value="">All Types</option>
                        {uniqueValues.reviewTypes.map((type, idx) => (
                          <option key={idx} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>
                    {activeTab === 'reviews' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Review Result
                        </label>
                        <select
                          value={filters.reviewResult}
                          onChange={(e) => setFilters(prev => ({ ...prev, reviewResult: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        >
                          <option value="">All Results</option>
                          {uniqueValues.reviewResults.map((result, idx) => (
                            <option key={idx} value={result}>{result}</option>
                          ))}
                        </select>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="flex-1 overflow-auto p-4">
        {activeTab === 'report' ? (
          renderPermitReport()
        ) : (
          <>
            <div className="mb-4">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Showing {filteredData.length.toLocaleString()} of {
                  activeTab === 'permits' ? buildingPermits.length.toLocaleString() :
                  activeTab === 'comments' ? planComments.length.toLocaleString() :
                  planReview.length.toLocaleString()
                } records
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredData.slice(0, 100).map((item, idx) => {
                if (activeTab === 'permits') return renderPermitCard(item as BuildingPermit, idx);
                if (activeTab === 'comments') return renderCommentCard(item as PlanComment, idx);
                if (activeTab === 'reviews') return renderReviewCard(item as PlanReview, idx);
                return null;
              })}
            </div>

            {filteredData.length > 100 && (
              <div className="mt-8 text-center">
                <p className="text-gray-600 dark:text-gray-300">
                  Showing first 100 results. Use filters to narrow down your search.
                </p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Detail Modal */}
      {renderDetailModal()}
    </div>
  );
};

export default PermitDataExplorer;
