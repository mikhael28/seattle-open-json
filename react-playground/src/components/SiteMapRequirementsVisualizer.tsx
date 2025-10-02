import React, { useState } from 'react';
import {
  SITE_MAP_REQUIREMENTS,
  ENHANCED_SITE_MAP_REQUIREMENTS,
  ENVIRONMENTAL_CRITICAL_AREA_SITE_MAP_REQUIREMENTS,
  type SiteMapRequirement
} from '../data/site-map-requirements';
import {
  CheckCircle2,
  Circle,
  MapPin,
  Layers,
  TreePine,
  Building,
  Ruler,
  Droplet,
  Zap,
  FileText,
  AlertCircle,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface ChecklistSectionProps {
  title: string;
  description: string;
  requirements: SiteMapRequirement[];
  color: string;
  icon: React.ElementType;
  totalCount: number;
}

const getCategoryIcon = (category: string): React.ElementType => {
  const categoryLower = category.toLowerCase();
  
  if (categoryLower.includes('basic') || categoryLower.includes('information')) return FileText;
  if (categoryLower.includes('orientation') || categoryLower.includes('north')) return MapPin;
  if (categoryLower.includes('property') || categoryLower.includes('boundaries')) return Ruler;
  if (categoryLower.includes('structure')) return Building;
  if (categoryLower.includes('setback')) return Ruler;
  if (categoryLower.includes('right-of-way')) return MapPin;
  if (categoryLower.includes('paved') || categoryLower.includes('parking')) return Building;
  if (categoryLower.includes('tree')) return TreePine;
  if (categoryLower.includes('environmental') || categoryLower.includes('critical')) return TreePine;
  if (categoryLower.includes('water') || categoryLower.includes('storm') || categoryLower.includes('sewer')) return Droplet;
  if (categoryLower.includes('utilities') || categoryLower.includes('power')) return Zap;
  if (categoryLower.includes('easement')) return MapPin;
  if (categoryLower.includes('access') || categoryLower.includes('pedestrian')) return MapPin;
  if (categoryLower.includes('topography') || categoryLower.includes('elevation')) return Layers;
  if (categoryLower.includes('landscape') || categoryLower.includes('landscaping')) return TreePine;
  if (categoryLower.includes('infrastructure')) return Building;
  if (categoryLower.includes('code') || categoryLower.includes('compliance')) return FileText;
  if (categoryLower.includes('flood')) return Droplet;
  if (categoryLower.includes('shoreline')) return Droplet;
  
  return Circle;
};

const RequirementItem: React.FC<{ requirement: SiteMapRequirement }> = ({ requirement }) => {
  const CategoryIcon = getCategoryIcon(requirement.category);
  
  return (
    <div className="flex items-start gap-3 p-3 rounded-lg bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800 transition-colors border border-gray-100 dark:border-gray-700">
      <div className="flex-shrink-0 mt-0.5">
        <CategoryIcon className="h-4 w-4 text-gray-500" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              {requirement.category}
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300 mt-1 leading-relaxed">
              {requirement.description}
            </p>
          </div>
          <div className="flex-shrink-0">
            {requirement.required ? (
              <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">
                Required
              </span>
            ) : (
              <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                Conditional
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const ChecklistSection: React.FC<ChecklistSectionProps> = ({
  title,
  description,
  requirements,
  color,
  icon: Icon,
  totalCount
}) => {
  const [expanded, setExpanded] = useState(true);
  
  const requiredCount = requirements.filter(r => r.required).length;
  const conditionalCount = requirements.filter(r => !r.required).length;
  
  // Group requirements by category
  const groupedRequirements = requirements.reduce((acc, req) => {
    if (!acc[req.category]) {
      acc[req.category] = [];
    }
    acc[req.category].push(req);
    return acc;
  }, {} as Record<string, SiteMapRequirement[]>);

  return (
    <div className={`rounded-xl border-2 ${color} overflow-hidden transition-all duration-300 h-fit`}>
      {/* Header */}
      <div 
        className="p-6 cursor-pointer hover:bg-opacity-90 transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-start gap-4">
          <div className={`p-3 rounded-lg ${color.replace('border-', 'bg-').replace('500', '100')} dark:${color.replace('border-', 'bg-').replace('500', '900/30')}`}>
            <Icon className={`h-6 w-6 ${color.replace('border-', 'text-')}`} />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {title}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {description}
                </p>
              </div>
              
              <button className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors">
                {expanded ? (
                  <ChevronUp className="h-5 w-5" />
                ) : (
                  <ChevronDown className="h-5 w-5" />
                )}
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-3 mt-4">
              <div className="flex items-center gap-2 text-sm">
                <div className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 font-semibold">
                  {totalCount} Total Items
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="px-3 py-1 rounded-full bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 font-medium">
                  {requiredCount} Required
                </div>
              </div>
              {conditionalCount > 0 && (
                <div className="flex items-center gap-2 text-sm">
                  <div className="px-3 py-1 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 font-medium">
                    {conditionalCount} Conditional
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      {expanded && (
        <div className="px-6 pb-6 border-t border-gray-200 dark:border-gray-700 pt-6">
          <div className="space-y-6">
            {Object.entries(groupedRequirements).map(([category, reqs]) => (
              <div key={category}>
                <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
                  {getCategoryIcon(category) && 
                    React.createElement(getCategoryIcon(category), { 
                      className: 'h-4 w-4' 
                    })
                  }
                  {category}
                  <span className="text-xs font-normal text-gray-500">
                    ({reqs.length} {reqs.length === 1 ? 'item' : 'items'})
                  </span>
                </h3>
                <div className="space-y-2">
                  {reqs.map((req) => (
                    <RequirementItem key={req.id} requirement={req} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

type RequirementType = 'basic' | 'enhanced' | 'environmental';

interface SiteMapRequirementsVisualizerProps {
  selectedType?: RequirementType;
  onTypeChange?: (type: RequirementType) => void;
  compact?: boolean;
}

const SiteMapRequirementsVisualizer: React.FC<SiteMapRequirementsVisualizerProps> = ({ 
  selectedType: controlledType,
  onTypeChange,
  compact = false
}) => {
  const [internalType, setInternalType] = useState<RequirementType>('basic');
  
  // Use controlled or uncontrolled state
  const selectedType = controlledType !== undefined ? controlledType : internalType;
  const handleTypeChange = (type: RequirementType) => {
    if (onTypeChange) {
      onTypeChange(type);
    } else {
      setInternalType(type);
    }
  };

  const getRequirementData = (type: RequirementType) => {
    switch (type) {
      case 'basic':
        return {
          title: 'Basic Site Map',
          description: 'Required for basic construction permits',
          requirements: SITE_MAP_REQUIREMENTS,
          color: 'border-green-500',
          icon: MapPin,
          count: SITE_MAP_REQUIREMENTS.length
        };
      case 'enhanced':
        return {
          title: 'Enhanced Site Map',
          description: 'Includes basic + infrastructure details',
          requirements: ENHANCED_SITE_MAP_REQUIREMENTS,
          color: 'border-blue-500',
          icon: Layers,
          count: ENHANCED_SITE_MAP_REQUIREMENTS.length
        };
      case 'environmental':
        return {
          title: 'Environmental Critical Area',
          description: 'Enhanced + environmental considerations (must be surveyor-stamped)',
          requirements: ENVIRONMENTAL_CRITICAL_AREA_SITE_MAP_REQUIREMENTS,
          color: 'border-purple-500',
          icon: TreePine,
          count: ENVIRONMENTAL_CRITICAL_AREA_SITE_MAP_REQUIREMENTS.length
        };
    }
  };

  const currentData = getRequirementData(selectedType);

  if (compact) {
    return (
      <div className="h-full flex flex-col bg-white dark:bg-gray-900">
        {/* Type Selector */}
        <div className="flex-shrink-0 p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">
            Site Map Requirements
          </h2>
          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input
                type="radio"
                name="requirement-type"
                checked={selectedType === 'basic'}
                onChange={() => handleTypeChange('basic')}
                className="w-4 h-4 text-green-600 focus:ring-green-500"
              />
              <span className="text-sm font-medium text-gray-900 dark:text-gray-100 group-hover:text-green-600">
                Basic Site Map ({SITE_MAP_REQUIREMENTS.length} items)
              </span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer group">
              <input
                type="radio"
                name="requirement-type"
                checked={selectedType === 'enhanced'}
                onChange={() => handleTypeChange('enhanced')}
                className="w-4 h-4 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-900 dark:text-gray-100 group-hover:text-blue-600">
                Enhanced (+{ENHANCED_SITE_MAP_REQUIREMENTS.length - SITE_MAP_REQUIREMENTS.length} more)
              </span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer group">
              <input
                type="radio"
                name="requirement-type"
                checked={selectedType === 'environmental'}
                onChange={() => handleTypeChange('environmental')}
                className="w-4 h-4 text-purple-600 focus:ring-purple-500"
              />
              <span className="text-sm font-medium text-gray-900 dark:text-gray-100 group-hover:text-purple-600">
                Environmental (+{ENVIRONMENTAL_CRITICAL_AREA_SITE_MAP_REQUIREMENTS.length - ENHANCED_SITE_MAP_REQUIREMENTS.length} more)
              </span>
            </label>
          </div>
        </div>

        {/* Requirements Content */}
        <div className="flex-1 overflow-auto p-4">
          <ChecklistSection
            title={currentData.title}
            description={currentData.description}
            requirements={currentData.requirements}
            color={currentData.color}
            icon={currentData.icon}
            totalCount={currentData.count}
          />

          {/* Legend */}
          <div className="mt-6 bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 mb-3">Legend</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">
                  Required
                </span>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Must be included
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                  Conditional
                </span>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  If applicable
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-3">
            Site Map Requirements Overview
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl">
            Three types of site map requirements for construction permits in Seattle. 
            Each builds upon the previous level, adding more detailed requirements.
          </p>
          
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950/30 border-l-4 border-blue-500 rounded">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-blue-900 dark:text-blue-300">
                  Understanding the Hierarchy
                </p>
                <p className="text-sm text-blue-800 dark:text-blue-400 mt-1">
                  <span className="font-semibold">Enhanced</span> includes all <span className="font-semibold">Basic</span> requirements plus 12 additional items. 
                  <span className="font-semibold"> Environmental Critical Area</span> includes all <span className="font-semibold">Enhanced</span> requirements plus 7 more environmental items.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Three Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Basic Site Map */}
          <ChecklistSection
            title="Basic Site Map"
            description="Required for basic construction permits"
            requirements={SITE_MAP_REQUIREMENTS}
            color="border-green-500"
            icon={MapPin}
            totalCount={SITE_MAP_REQUIREMENTS.length}
          />

          {/* Enhanced Site Map */}
          <ChecklistSection
            title="Enhanced Site Map"
            description="Includes basic + infrastructure details"
            requirements={ENHANCED_SITE_MAP_REQUIREMENTS}
            color="border-blue-500"
            icon={Layers}
            totalCount={ENHANCED_SITE_MAP_REQUIREMENTS.length}
          />

          {/* Environmental Critical Area */}
          <ChecklistSection
            title="Environmental Critical Area"
            description="Enhanced + environmental considerations (must be surveyor-stamped)"
            requirements={ENVIRONMENTAL_CRITICAL_AREA_SITE_MAP_REQUIREMENTS}
            color="border-purple-500"
            icon={TreePine}
            totalCount={ENVIRONMENTAL_CRITICAL_AREA_SITE_MAP_REQUIREMENTS.length}
          />
        </div>

        {/* Summary Statistics */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-gray-900 rounded-lg p-6 border-2 border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <MapPin className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Basic Requirements</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {SITE_MAP_REQUIREMENTS.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-lg p-6 border-2 border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Layers className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Enhanced (+12 more)</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {ENHANCED_SITE_MAP_REQUIREMENTS.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-lg p-6 border-2 border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <TreePine className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Environmental (+7 more)</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {ENVIRONMENTAL_CRITICAL_AREA_SITE_MAP_REQUIREMENTS.length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-8 bg-white dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">Legend</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center px-3 py-1 rounded text-xs font-medium bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">
                Required
              </span>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Must be included in the site plan
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center px-3 py-1 rounded text-xs font-medium bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                Conditional
              </span>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Required only if applicable to your project
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SiteMapRequirementsVisualizer;

