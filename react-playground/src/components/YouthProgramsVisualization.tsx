import React, { useState, useMemo } from "react";
import { Search, Filter, Users, MapPin, Calendar, DollarSign, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "./ui/button";

// Import the youth programs data - using relative path since it's in the same project
import { youth_programs, YouthProgram } from "seattle-open-json";

interface YouthProgramsVisualizationProps {
  className?: string;
}

const YouthProgramsVisualization: React.FC<YouthProgramsVisualizationProps> = ({ className }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAgeFilter, setSelectedAgeFilter] = useState<string>("all");
  const [selectedCostFilter, setSelectedCostFilter] = useState<string>("all");
  const [expandedProgram, setExpandedProgram] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  // Extract unique age ranges and cost categories for filtering
  const ageRanges = useMemo(() => {
    const ages = new Set<string>();
    youth_programs.forEach(program => {
      if (program.ageRange && program.ageRange !== "Varies") {
        ages.add(program.ageRange);
      }
    });
    return Array.from(ages).sort();
  }, []);

  const costCategories = useMemo(() => {
    const costs = new Set<string>();
    youth_programs.forEach(program => {
      if (program.cost) {
        if (program.cost.toLowerCase().includes("free")) {
          costs.add("Free");
        } else if (program.cost.toLowerCase().includes("contact")) {
          costs.add("Contact for pricing");
        } else if (program.cost.includes("$")) {
          costs.add("Paid");
        } else {
          costs.add("Other");
        }
      }
    });
    return Array.from(costs).sort();
  }, []);

  // Filter programs based on search and filters
  const filteredPrograms = useMemo(() => {
    return youth_programs.filter(program => {
      const matchesSearch = searchTerm === "" || 
        program.organizationName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        program.programDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
        program.activityName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        program.activityDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
        program.location.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesAge = selectedAgeFilter === "all" || 
        program.ageRange === selectedAgeFilter;

      const matchesCost = selectedCostFilter === "all" || 
        (selectedCostFilter === "Free" && program.cost.toLowerCase().includes("free")) ||
        (selectedCostFilter === "Contact for pricing" && program.cost.toLowerCase().includes("contact")) ||
        (selectedCostFilter === "Paid" && program.cost.includes("$") && !program.cost.toLowerCase().includes("free")) ||
        (selectedCostFilter === "Other" && !program.cost.toLowerCase().includes("free") && !program.cost.toLowerCase().includes("contact") && !program.cost.includes("$"));

      return matchesSearch && matchesAge && matchesCost;
    });
  }, [searchTerm, selectedAgeFilter, selectedCostFilter]);

  const getCostBadgeColor = (cost: string) => {
    if (cost.toLowerCase().includes("free")) {
      return "bg-green-100 text-green-800 border-green-200";
    } else if (cost.includes("$")) {
      return "bg-blue-100 text-blue-800 border-blue-200";
    } else {
      return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const toggleProgramExpansion = (programId: string) => {
    setExpandedProgram(expandedProgram === programId ? null : programId);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Users className="h-6 w-6 text-purple-600" />
          <h3 className="text-xl font-semibold">Youth Programs ({filteredPrograms.length})</h3>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center space-x-1"
        >
          <Filter className="h-4 w-4" />
          <span>Filters</span>
          {showFilters ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="space-y-3">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search programs, organizations, or locations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-3 bg-gray-50 rounded-md">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Age Range</label>
              <select
                value={selectedAgeFilter}
                onChange={(e) => setSelectedAgeFilter(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="all">All Ages</option>
                {ageRanges.map(age => (
                  <option key={age} value={age}>{age}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cost</label>
              <select
                value={selectedCostFilter}
                onChange={(e) => setSelectedCostFilter(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="all">All Costs</option>
                {costCategories.map(cost => (
                  <option key={cost} value={cost}>{cost}</option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Programs List */}
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {filteredPrograms.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Users className="h-12 w-12 mx-auto mb-2 text-gray-300" />
            <p>No programs found matching your criteria.</p>
            <p className="text-sm">Try adjusting your search or filters.</p>
          </div>
        ) : (
          filteredPrograms.map(program => (
            <div key={program.id} className="border border-gray-200 rounded-lg p-4 bg-white hover:shadow-md transition-shadow">
              {/* Program Header */}
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h4 className="font-semibold text-lg text-gray-900">{program.activityName}</h4>
                  <p className="text-sm text-gray-600">{program.organizationName}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 text-xs rounded-full border ${getCostBadgeColor(program.cost)}`}>
                    {program.cost.length > 20 ? program.cost.substring(0, 20) + "..." : program.cost}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleProgramExpansion(program.id)}
                    className="p-1"
                  >
                    {expandedProgram === program.id ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              {/* Program Quick Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-gray-600 mb-3">
                <div className="flex items-center space-x-1">
                  <Users className="h-3 w-3" />
                  <span>{program.ageRange}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MapPin className="h-3 w-3" />
                  <span>{program.location}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="h-3 w-3" />
                  <span>{program.day}</span>
                </div>
              </div>

              {/* Program Description */}
              <p className="text-sm text-gray-700 mb-3">
                {program.programDescription}
              </p>

              {/* Expanded Details */}
              {expandedProgram === program.id && (
                <div className="border-t pt-3 mt-3 space-y-3">
                  <div>
                    <h5 className="font-medium text-gray-900 mb-1">Activity Description</h5>
                    <p className="text-sm text-gray-700">{program.activityDescription}</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="font-medium text-gray-700">Dates:</span>
                      <p className="text-gray-600">{program.dates}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Times:</span>
                      <p className="text-gray-600">{program.times}</p>
                    </div>
                  </div>

                  {program.url && (
                    <div className="pt-2">
                      <a
                        href={program.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-1 text-purple-600 hover:text-purple-800 text-sm"
                      >
                        <span>Learn More</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Summary Stats */}
      <div className="bg-purple-50 rounded-lg p-4 mt-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-purple-600">{filteredPrograms.length}</div>
            <div className="text-sm text-gray-600">Programs Found</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-600">
              {new Set(filteredPrograms.map(p => p.organizationName)).size}
            </div>
            <div className="text-sm text-gray-600">Organizations</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-600">
              {filteredPrograms.filter(p => p.cost.toLowerCase().includes("free")).length}
            </div>
            <div className="text-sm text-gray-600">Free Programs</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-600">
              {new Set(filteredPrograms.map(p => p.location)).size}
            </div>
            <div className="text-sm text-gray-600">Locations</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YouthProgramsVisualization;
