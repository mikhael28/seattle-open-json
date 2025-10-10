import { useState, useMemo } from "react";
import { scsData } from "seattle-open-json";
import { MapPin, Maximize2, Minimize2, Database, MapPinned, Filter, X, Search, Globe, DollarSign, Users, Info, Zap, Phone, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../components/ui/button";
import SCSMap from "../components/SCSMap";

const ITEMS_PER_PAGE = 50;

const SCSDashboard = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isFilterFullscreen, setIsFilterFullscreen] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFreeOnly, setShowFreeOnly] = useState(false);
  const [showWithLocationOnly, setShowWithLocationOnly] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showMapOnMobile, setShowMapOnMobile] = useState(false);

  // Get all SCS entities
  const allEntities = useMemo(() => scsData.getAllEntities(), []);

  // Filter entities with coordinates
  const entitiesWithCoords = useMemo(() => {
    return allEntities.filter(entity =>
      typeof entity.location !== 'string' &&
      entity.location.coordinates &&
      entity.location.coordinates.lat &&
      entity.location.coordinates.lng
    );
  }, [allEntities]);

  // Filter all entities (for explorer)
  const filteredAllEntities = useMemo(() => {
    return allEntities.filter((entity) => {
      // Search filter
      const matchesSearch =
        entity.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entity.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entity.type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entity.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (typeof entity.location === 'string' && entity.location.toLowerCase().includes(searchTerm.toLowerCase()));

      // Type filter
      const matchesType = selectedTypes.length === 0 || selectedTypes.includes(entity.type);

      // Free filter
      const matchesFree = !showFreeOnly || (entity.cost && entity.cost.toLowerCase().includes("free"));

      // Location filter
      const matchesLocation = !showWithLocationOnly || (
        typeof entity.location !== 'string' && entity.location.coordinates
      );

      return matchesSearch && matchesType && matchesFree && matchesLocation;
    });
  }, [allEntities, searchTerm, selectedTypes, showFreeOnly, showWithLocationOnly]);

  // Filter entities with coordinates (for map)
  const filteredEntities = useMemo(() => {
    return filteredAllEntities.filter(entity =>
      typeof entity.location !== 'string' &&
      entity.location.coordinates &&
      entity.location.coordinates.lat &&
      entity.location.coordinates.lng
    );
  }, [filteredAllEntities]);

  // Type statistics (count from ALL entities, not just those with coords)
  const typeStats = useMemo(() => {
    const stats = new Map<string, number>();
    allEntities.forEach(entity => {
      const count = stats.get(entity.type) || 0;
      stats.set(entity.type, count + 1);
    });
    return Array.from(stats.entries())
      .map(([type, count]) => ({ type, count }))
      .sort((a, b) => b.count - a.count);
  }, [allEntities]);

  // Pagination
  const totalPages = Math.ceil(filteredAllEntities.length / ITEMS_PER_PAGE);
  const paginatedEntities = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredAllEntities.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredAllEntities, currentPage]);

  // Reset to page 1 when filters change
  useMemo(() => {
    setCurrentPage(1);
  }, [filteredAllEntities.length]);

  const clearFilters = () => {
    setSelectedTypes([]);
    setSearchTerm("");
    setShowFreeOnly(false);
    setShowWithLocationOnly(false);
    setCurrentPage(1);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const renderLocation = (location: string | { address?: string; coordinates?: { lat: number; lng: number } }) => {
    if (typeof location === 'string') {
      return (
        <div className="flex items-start gap-2 text-sm text-gray-600">
          <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
          <span>{location}</span>
        </div>
      );
    }

    return (
      <div className="space-y-1">
        {location.address && (
          <div className="flex items-start gap-2 text-sm text-gray-600">
            <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <span>{location.address}</span>
          </div>
        )}
        {location.coordinates && (
          <div className="text-xs text-gray-400 ml-6">
            {location.coordinates.lat.toFixed(4)}, {location.coordinates.lng.toFixed(4)}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="h-full bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Right Side Drawer for About SCS */}
      {isDrawerOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsDrawerOpen(false)}
          />

          {/* Drawer */}
          <div className="fixed right-0 top-0 h-full w-full sm:w-[500px] md:w-[600px] bg-white shadow-2xl z-50 overflow-y-auto">
            <div className="p-4 sm:p-6 md:p-8">
              {/* Close Button */}
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>

              {/* About SCS Content */}
              <div className="mb-6 sm:mb-8">
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-blue-100 mb-4 sm:mb-6">
                  <Database className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
                  Seattle Civic Standard (SCS)
                </h2>
                <p className="text-base sm:text-lg text-gray-600">
                  A unified, interoperable data standard designed to make civic information
                  accessible, consistent, and easy to use across all municipal systems.
                </p>
              </div>

              {/* The Challenge */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">The Challenge</h3>
                <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg">
                  <p className="text-gray-700 leading-relaxed text-sm">
                    Municipal governments struggle with <strong>data silos</strong> and <strong>incompatible formats</strong>.
                    This fragmentation makes it difficult to build comprehensive civic applications and wastes taxpayer resources.
                  </p>
                </div>
              </div>

              {/* Core Fields */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">6 Required Fields</h3>
                <p className="text-gray-600 mb-6 text-sm">
                  The SCS requires just <strong>6 core fields</strong> that answer fundamental questions
                  about any civic entity.
                </p>

                <div className="space-y-3">
                  {[
                    { field: "id", type: "string", description: "A unique identifier" },
                    { field: "name", type: "string", description: "The official name" },
                    { field: "type", type: "string", description: "Category or classification" },
                    { field: "description", type: "string", description: "Human-readable explanation" },
                    { field: "location", type: "string | LocationInfo", description: "Address and/or coordinates" },
                    { field: "contact", type: "ContactInfo", description: "Phone, email, website" },
                  ].map((field, idx) => (
                    <div key={idx} className="bg-white rounded-lg p-3 border-2 border-blue-200">
                      <div className="flex items-start justify-between mb-1">
                        <code className="text-blue-600 font-mono font-semibold">{field.field}</code>
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded font-mono">{field.type}</span>
                      </div>
                      <p className="text-gray-600 text-sm">{field.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Benefits */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Benefits</h3>
                <div className="space-y-4">
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Zap className="w-5 h-5 text-yellow-500" />
                      <h4 className="font-semibold">Efficiency</h4>
                    </div>
                    <p className="text-gray-600 text-sm">
                      Build once, work everywhere. Applications can consume any civic data using the same interface.
                    </p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Globe className="w-5 h-5 text-blue-500" />
                      <h4 className="font-semibold">Interoperability</h4>
                    </div>
                    <p className="text-gray-600 text-sm">
                      Different departments and systems can share data seamlessly without custom integrations.
                    </p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="w-5 h-5 text-green-500" />
                      <h4 className="font-semibold">Accessibility</h4>
                    </div>
                    <p className="text-gray-600 text-sm">
                      Citizens and developers get consistent, easy-to-understand data about their community.
                    </p>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg p-6 text-white">
                <h3 className="text-lg font-bold mb-4 text-center">Current Implementation</h3>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-3xl font-bold mb-1">{allEntities.length.toLocaleString()}</div>
                    <div className="text-blue-100 text-sm">Total Entities</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold mb-1">9</div>
                    <div className="text-blue-100 text-sm">Data Sources</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold mb-1">100%</div>
                    <div className="text-blue-100 text-sm">Compliant</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold mb-1">1</div>
                    <div className="text-blue-100 text-sm">Standard</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Fullscreen Map */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-white">
          <div className="absolute top-4 right-4 z-10 flex gap-2">
            <Button
              onClick={() => setIsFullscreen(false)}
              variant="default"
              className="shadow-lg"
            >
              <Minimize2 className="w-5 h-5 mr-2" />
              Exit Fullscreen
            </Button>
          </div>
          <SCSMap
            entities={filteredEntities}
            width={window.innerWidth}
            height={window.innerHeight}
          />
        </div>
      )}

      {/* Fullscreen Filter View */}
      {isFilterFullscreen && (
        <div className="fixed inset-0 z-50 bg-white overflow-y-auto">
          <div className="max-w-7xl mx-auto p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-8 sticky top-0 bg-white py-4 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Filter className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Advanced Filters</h2>
                  <p className="text-gray-600">
                    {filteredAllEntities.length.toLocaleString()} of {allEntities.length.toLocaleString()} entities match your criteria
                  </p>
                </div>
              </div>
              <Button
                onClick={() => setIsFilterFullscreen(false)}
                variant="default"
                className="shadow-lg"
              >
                <Minimize2 className="w-5 h-5 mr-2" />
                Close Filters
              </Button>
            </div>

            {/* Search */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search Keywords
              </label>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-6 w-6" />
                <input
                  type="text"
                  placeholder="Search by name, description, type, tags, or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Type Filter - Grid View */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Entity Type</h3>
                {selectedTypes.length > 0 && (
                  <Button
                    onClick={() => setSelectedTypes([])}
                    variant="ghost"
                    size="sm"
                  >
                    <X className="w-4 h-4 mr-1" />
                    Clear Type Filter
                  </Button>
                )}
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                <button
                  onClick={() => setSelectedTypes([])}
                  className={`p-4 rounded-lg border text-left transition-all ${
                    selectedTypes.length === 0
                      ? 'bg-blue-100 border-blue-300 text-blue-800 shadow-md'
                      : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <div className="font-semibold text-lg mb-1">All Types</div>
                  <div className="text-sm opacity-75">{allEntities.length.toLocaleString()} total</div>
                </button>
                {typeStats.map(({ type, count }) => (
                  <button
                    key={type}
                    onClick={() => setSelectedTypes([type])}
                    className={`p-4 rounded-lg border text-left transition-all ${
                      selectedTypes.includes(type)
                        ? 'bg-blue-100 border-blue-300 text-blue-800 shadow-md'
                        : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <div className="font-semibold mb-1">{type}</div>
                    <div className="text-sm opacity-75">{count.toLocaleString()} entities</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Additional Filters */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Filters</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="flex items-start gap-3 p-4 bg-white border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                  <input
                    type="checkbox"
                    checked={showFreeOnly}
                    onChange={(e) => setShowFreeOnly(e.target.checked)}
                    className="w-5 h-5 mt-0.5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <div>
                    <div className="font-medium text-gray-900">Free Only</div>
                    <div className="text-sm text-gray-600">Show only entities that are free to access</div>
                  </div>
                </label>
                <label className="flex items-start gap-3 p-4 bg-white border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                  <input
                    type="checkbox"
                    checked={showWithLocationOnly}
                    onChange={(e) => setShowWithLocationOnly(e.target.checked)}
                    className="w-5 h-5 mt-0.5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <div>
                    <div className="font-medium text-gray-900">With Coordinates</div>
                    <div className="text-sm text-gray-600">Show only entities with geographic coordinates</div>
                  </div>
                </label>
              </div>
            </div>

            {/* Clear All */}
            {(selectedTypes.length > 0 || searchTerm || showFreeOnly || showWithLocationOnly) && (
              <div className="flex justify-center">
                <Button
                  onClick={clearFilters}
                  variant="outline"
                  size="lg"
                  className="gap-2"
                >
                  <X className="w-5 h-5" />
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Normal View */}
      {!isFullscreen && (
        <div className="h-full overflow-auto">
          <div className="max-w-[1800px] mx-auto px-4 sm:px-6 py-6 sm:py-8">
            {/* Header */}
            <div className="mb-6 sm:mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 sm:p-3 bg-blue-100 rounded-lg">
                    <MapPinned className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
                  </div>
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                      Seattle Civic Standard Dashboard
                    </h1>
                    <p className="text-sm sm:text-base text-gray-600">
                      Unified view of all Seattle civic entities
                    </p>
                  </div>
                </div>
                <Button
                  onClick={() => setIsDrawerOpen(true)}
                  variant="outline"
                  className="gap-2 w-full sm:w-auto"
                >
                  <Info className="w-4 h-4" />
                  About SCS
                </Button>
              </div>
            </div>

         

            {/* Filters and Search */}
            <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm border border-gray-200 mb-6 sm:mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <h3 className="text-lg font-semibold text-gray-900">Filters & Search</h3> 
                  <div className="text-sm text-gray-600">
                    Showing <span className="font-semibold text-gray-900">{filteredAllEntities.length.toLocaleString()}</span> of {allEntities.length.toLocaleString()} entities
                  </div>
                </div>
                <Button
                  onClick={() => setIsFilterFullscreen(true)}
                  variant="outline"
                  size="sm"
                  className="gap-2 w-full sm:w-auto"
                >
                  <Maximize2 className="w-4 h-4" />
                  <span className="hidden sm:inline">Expand Filters</span>
                  <span className="sm:hidden">Advanced Filters</span>
                </Button>
              </div>
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Search Bar */}
                <div className="w-full lg:w-1/2 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Search by name, description, type, tags, or location..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Filters Row */}
                <div className="w-full lg:w-1/2 flex flex-col sm:flex-row gap-4">
                  {/* Type Dropdown Filter */}
                  <div className="flex-1">
                    <select
                      value={selectedTypes.length === 0 ? "all" : selectedTypes.length === 1 ? selectedTypes[0] : "multiple"}
                      onChange={(e) => {
                        if (e.target.value === "all") {
                          setSelectedTypes([]);
                        } else {
                          setSelectedTypes([e.target.value]);
                        }
                      }}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="all">All Types ({typeStats.length})</option>
                      {typeStats.map(({ type, count }) => (
                        <option key={type} value={type}>
                          {type} ({count})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Clear Button */}
                  {(selectedTypes.length > 0 || searchTerm || showFreeOnly || showWithLocationOnly) && (
                    <div className="flex items-end">
                      <Button
                        onClick={clearFilters}
                        variant="ghost"
                        size="sm"
                        className="text-gray-600 hover:text-gray-900 w-full sm:w-auto"
                      >
                        <X className="w-4 h-4 mr-1" />
                        Clear All
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Mobile Toggle Button - Only visible on mobile */}
            <div className="lg:hidden mb-4">
              <Button
                onClick={() => setShowMapOnMobile(!showMapOnMobile)}
                variant="outline"
                className="w-full gap-2"
              >
                <MapPinned className="w-4 h-4" />
                {showMapOnMobile ? 'Hide Map' : 'Show Map'} ({filteredEntities.length} entities)
              </Button>
            </div>

            {/* Responsive Layout: Stack on mobile, side-by-side on desktop */}
            <div className="flex flex-col lg:flex-row gap-6 h-[800px]">
              {/* Map - Hidden on mobile by default, full width on desktop */}
              <div className={`${showMapOnMobile ? 'block' : 'hidden'} lg:block lg:w-1/2 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden flex flex-col`}>
                <div className="p-4 sm:p-6 border-b border-gray-200 flex-shrink-0">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                        Geographic Distribution
                      </h3>
                      <p className="text-gray-600 mt-1 text-sm sm:text-base">
                        {filteredEntities.length} entities mapped
                      </p>
                    </div>
                    <Button
                      onClick={() => setIsFullscreen(true)}
                      variant="outline"
                      size="sm"
                      className="gap-2"
                    >
                      <Maximize2 className="w-4 h-4" />
                      <span className="hidden sm:inline">Fullscreen</span>
                    </Button>
                  </div>
                </div>

                <div className="flex-1 p-4 sm:p-6 bg-gray-50 overflow-hidden">
                  <div className="rounded-lg overflow-hidden bg-white h-full">
                    <SCSMap
                      entities={filteredEntities}
                      width={Math.min(800, (window.innerWidth - 120) * 0.5)}
                      height={680}
                    />
                  </div>
                </div>
              </div>

              {/* Entity List - Full width on mobile, half width on desktop */}
              <div className="w-full lg:w-1/2 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden flex flex-col">
                <div className="p-4 sm:p-6 border-b border-gray-200 flex-shrink-0">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Entity List</h3>
                      <p className="text-gray-600 mt-1 text-sm sm:text-base">
                        Page {currentPage} of {totalPages} ({filteredAllEntities.length.toLocaleString()} total)
                      </p>
                    </div>

                    {/* Pagination Controls */}
                    <div className="flex items-center gap-2">
                      <Button
                        onClick={goToPrevPage}
                        disabled={currentPage === 1}
                        variant="outline"
                        size="sm"
                        className="gap-1"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        <span className="hidden sm:inline">Previous</span>
                      </Button>
                      <Button
                        onClick={goToNextPage}
                        disabled={currentPage === totalPages}
                        variant="outline"
                        size="sm"
                        className="gap-1"
                      >
                        <span className="hidden sm:inline">Next</span>
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 sm:p-6">
                  <div className="space-y-3 sm:space-y-4">
                    {paginatedEntities.map((entity, index) => (
                      <div
                        key={`${entity.id}-${index}`}
                        className="bg-gray-50 rounded-lg border border-gray-200 p-3 sm:p-4 hover:shadow-md transition-shadow"
                      >
                        {/* Header */}
                        <div className="mb-3">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <h4 className="text-base font-semibold text-gray-900 flex-1">
                              {entity.name}
                            </h4>
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 flex-shrink-0">
                              {entity.type}
                            </span>
                          </div>

                          {entity.description && (
                            <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                              {entity.description}
                            </p>
                          )}
                        </div>

                        {/* Details */}
                        <div className="space-y-2 text-sm">
                          {/* Location */}
                          {entity.location && renderLocation(entity.location)}

                          {/* Contact Info */}
                          {entity.contact && (
                            <div className="space-y-1">
                              {entity.contact.phone && (
                                <div className="flex items-center gap-2 text-gray-600">
                                  <Phone className="h-4 w-4 flex-shrink-0" />
                                  <span className="text-xs">{entity.contact.phone}</span>
                                </div>
                              )}
                              {entity.contact.website && (
                                <div className="flex items-center gap-2 text-gray-600">
                                  <Globe className="h-4 w-4 flex-shrink-0" />
                                  <a
                                    href={entity.contact.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:text-blue-800 truncate text-xs"
                                  >
                                    Website
                                  </a>
                                </div>
                              )}
                            </div>
                          )}

                          {/* Additional Info */}
                          <div className="flex flex-wrap gap-2 pt-1">
                            {entity.cost && (
                              <div className="flex items-center gap-1 text-gray-700">
                                <DollarSign className="h-3 w-3" />
                                <span className="text-xs">{entity.cost}</span>
                              </div>
                            )}
                            {entity.ageRange && (
                              <div className="flex items-center gap-1 text-gray-700">
                                <Users className="h-3 w-3" />
                                <span className="text-xs">{entity.ageRange}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* No Results */}
                    {filteredAllEntities.length === 0 && (
                      <div className="text-center py-12">
                        <div className="text-gray-400 mb-4">
                          <Search className="h-12 w-12 mx-auto" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No entities found</h3>
                        <p className="text-gray-600">
                          Try adjusting your search terms or filters
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Bottom Pagination */}
                {filteredAllEntities.length > 0 && (
                  <div className="p-3 sm:p-4 border-t border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 flex-shrink-0 bg-gray-50">
                    <div className="text-xs sm:text-sm text-gray-600 text-center sm:text-left">
                      Showing {((currentPage - 1) * ITEMS_PER_PAGE) + 1} to {Math.min(currentPage * ITEMS_PER_PAGE, filteredAllEntities.length)} of {filteredAllEntities.length.toLocaleString()}
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <Button
                        onClick={goToPrevPage}
                        disabled={currentPage === 1}
                        variant="outline"
                        size="sm"
                        className="gap-1"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        <span className="hidden sm:inline">Previous</span>
                      </Button>
                      <span className="text-xs sm:text-sm text-gray-600 px-2">
                        Page {currentPage} of {totalPages}
                      </span>
                      <Button
                        onClick={goToNextPage}
                        disabled={currentPage === totalPages}
                        variant="outline"
                        size="sm"
                        className="gap-1"
                      >
                        <span className="hidden sm:inline">Next</span>
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SCSDashboard;
