import { useState, useMemo, useEffect } from "react";
import { loadScsData } from "seattle-open-json/scs";
import type { CivicEntity } from "seattle-open-json/types";
import {
  MapPin,
  Maximize2,
  Minimize2,
  Database,
  MapPinned,
  Filter,
  X,
  Search,
  Globe,
  DollarSign,
  Users,
  Info,
  Zap,
  Phone,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
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
  const [allEntities, setAllEntities] = useState<CivicEntity[]>([]);
  const [loading, setLoading] = useState(true);
  const [showTickets, setShowTickets] = useState(false);

  // Load SCS data on mount
  useEffect(() => {
    loadScsData().then((data) => {
      // Filter out customer support tickets by default
      const entities = data.getAllEntities();
      setAllEntities(entities);
      setLoading(false);
    });
  }, []);

  // Filter entities with coordinates
  const entitiesWithCoords = useMemo(() => {
    return allEntities.filter((entity) => {
      // Exclude customer support tickets unless explicitly shown
      if (!showTickets && entity.type === "Service Request") {
        return false;
      }
      return (
        typeof entity.location !== "string" &&
        entity.location.coordinates &&
        entity.location.coordinates.lat &&
        entity.location.coordinates.lng
      );
    });
  }, [allEntities, showTickets]);

  // Filter all entities (for explorer)
  const filteredAllEntities = useMemo(() => {
    return allEntities.filter((entity) => {
      // Exclude customer support tickets unless explicitly shown
      if (!showTickets && entity.type === "Service Request") {
        return false;
      }

      // Search filter
      const matchesSearch =
        entity.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entity.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entity.type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entity.tags?.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        ) ||
        (typeof entity.location === "string" &&
          entity.location.toLowerCase().includes(searchTerm.toLowerCase()));

      // Type filter
      const matchesType =
        selectedTypes.length === 0 || selectedTypes.includes(entity.type);

      // Free filter
      const matchesFree =
        !showFreeOnly ||
        (entity.cost && entity.cost.toLowerCase().includes("free"));

      // Location filter
      const matchesLocation =
        !showWithLocationOnly ||
        (typeof entity.location !== "string" && entity.location.coordinates);

      return matchesSearch && matchesType && matchesFree && matchesLocation;
    });
  }, [
    allEntities,
    searchTerm,
    selectedTypes,
    showFreeOnly,
    showWithLocationOnly,
    showTickets,
  ]);

  // Filter entities with coordinates (for map)
  const filteredEntities = useMemo(() => {
    return filteredAllEntities.filter(
      (entity) =>
        typeof entity.location !== "string" &&
        entity.location.coordinates &&
        entity.location.coordinates.lat &&
        entity.location.coordinates.lng
    );
  }, [filteredAllEntities]);

  // Type statistics (count from ALL entities, not just those with coords)
  const typeStats = useMemo(() => {
    const stats = new Map<string, number>();
    allEntities.forEach((entity) => {
      // Exclude customer support tickets from stats unless shown
      if (!showTickets && entity.type === "Service Request") {
        return;
      }
      const count = stats.get(entity.type) || 0;
      stats.set(entity.type, count + 1);
    });
    return Array.from(stats.entries())
      .map(([type, count]) => ({ type, count }))
      .sort((a, b) => b.count - a.count);
  }, [allEntities, showTickets]);

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
    setShowTickets(false);
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

  const renderLocation = (
    location:
      | string
      | { address?: string; coordinates?: { lat: number; lng: number } }
  ) => {
    if (typeof location === "string") {
      return (
        <div className="flex items-start gap-2 text-sm text-gray-600">
          <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0" />
          <span>{location}</span>
        </div>
      );
    }

    return (
      <div className="space-y-1">
        {location.address && (
          <div className="flex items-start gap-2 text-sm text-gray-600">
            <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0" />
            <span>{location.address}</span>
          </div>
        )}
        {location.coordinates && (
          <div className="ml-6 text-xs text-gray-400">
            {location.coordinates.lat.toFixed(4)},{" "}
            {location.coordinates.lng.toFixed(4)}
          </div>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600"></div>
          <p className="text-gray-600">
            Loading Seattle Civic Standard data...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Right Side Drawer for About SCS */}
      {isDrawerOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40 bg-black/50"
            onClick={() => setIsDrawerOpen(false)}
          />

          {/* Drawer */}
          <div className="fixed right-0 top-0 z-50 h-full w-full overflow-y-auto bg-white shadow-2xl sm:w-[500px] md:w-[600px]">
            <div className="p-4 sm:p-6 md:p-8">
              {/* Close Button */}
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="absolute right-4 top-4 rounded-lg p-2 transition-colors hover:bg-gray-100"
              >
                <X className="h-6 w-6 text-gray-600" />
              </button>

              {/* About SCS Content */}
              <div className="mb-6 sm:mb-8">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 sm:mb-6 sm:h-16 sm:w-16">
                  <Database className="h-6 w-6 text-blue-600 sm:h-8 sm:w-8" />
                </div>
                <h2 className="mb-3 text-2xl font-bold text-gray-900 sm:mb-4 sm:text-3xl">
                  Seattle Civic Standard (SCS)
                </h2>
                <p className="text-base text-gray-600 sm:text-lg">
                  A unified, interoperable data standard designed to make civic
                  information accessible, consistent, and easy to use across all
                  municipal systems.
                </p>
              </div>

              {/* The Challenge */}
              <div className="mb-8">
                <h3 className="mb-4 text-xl font-bold text-gray-900">
                  The Challenge
                </h3>
                <div className="rounded-r-lg border-l-4 border-red-400 bg-red-50 p-4">
                  <p className="text-sm leading-relaxed text-gray-700">
                    Municipal governments struggle with{" "}
                    <strong>data silos</strong> and{" "}
                    <strong>incompatible formats</strong>. This fragmentation
                    makes it difficult to build comprehensive civic applications
                    and wastes taxpayer resources.
                  </p>
                </div>
              </div>

              {/* Core Fields */}
              <div className="mb-8">
                <h3 className="mb-4 text-xl font-bold text-gray-900">
                  6 Required Fields
                </h3>
                <p className="mb-6 text-sm text-gray-600">
                  The SCS requires just <strong>6 core fields</strong> that
                  answer fundamental questions about any civic entity.
                </p>

                <div className="space-y-3">
                  {[
                    {
                      field: "id",
                      type: "string",
                      description: "A unique identifier",
                    },
                    {
                      field: "name",
                      type: "string",
                      description: "The official name",
                    },
                    {
                      field: "type",
                      type: "string",
                      description: "Category or classification",
                    },
                    {
                      field: "description",
                      type: "string",
                      description: "Human-readable explanation",
                    },
                    {
                      field: "location",
                      type: "string | LocationInfo",
                      description: "Address and/or coordinates",
                    },
                    {
                      field: "contact",
                      type: "ContactInfo",
                      description: "Phone, email, website",
                    },
                  ].map((field, idx) => (
                    <div
                      key={idx}
                      className="rounded-lg border-2 border-blue-200 bg-white p-3"
                    >
                      <div className="mb-1 flex items-start justify-between">
                        <code className="font-mono font-semibold text-blue-600">
                          {field.field}
                        </code>
                        <span className="rounded bg-gray-100 px-2 py-0.5 font-mono text-xs text-gray-600">
                          {field.type}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">
                        {field.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Benefits */}
              <div className="mb-8">
                <h3 className="mb-4 text-xl font-bold text-gray-900">
                  Benefits
                </h3>
                <div className="space-y-4">
                  <div className="rounded-lg border border-gray-200 bg-white p-4">
                    <div className="mb-2 flex items-center gap-2">
                      <Zap className="h-5 w-5 text-yellow-500" />
                      <h4 className="font-semibold">Efficiency</h4>
                    </div>
                    <p className="text-sm text-gray-600">
                      Build once, work everywhere. Applications can consume any
                      civic data using the same interface.
                    </p>
                  </div>
                  <div className="rounded-lg border border-gray-200 bg-white p-4">
                    <div className="mb-2 flex items-center gap-2">
                      <Globe className="h-5 w-5 text-blue-500" />
                      <h4 className="font-semibold">Interoperability</h4>
                    </div>
                    <p className="text-sm text-gray-600">
                      Different departments and systems can share data
                      seamlessly without custom integrations.
                    </p>
                  </div>
                  <div className="rounded-lg border border-gray-200 bg-white p-4">
                    <div className="mb-2 flex items-center gap-2">
                      <Users className="h-5 w-5 text-green-500" />
                      <h4 className="font-semibold">Accessibility</h4>
                    </div>
                    <p className="text-sm text-gray-600">
                      Citizens and developers get consistent, easy-to-understand
                      data about their community.
                    </p>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
                <h3 className="mb-4 text-center text-lg font-bold">
                  Current Implementation
                </h3>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="mb-1 text-3xl font-bold">
                      {allEntities.length.toLocaleString()}
                    </div>
                    <div className="text-sm text-blue-100">Total Entities</div>
                  </div>
                  <div>
                    <div className="mb-1 text-3xl font-bold">9</div>
                    <div className="text-sm text-blue-100">Data Sources</div>
                  </div>
                  <div>
                    <div className="mb-1 text-3xl font-bold">100%</div>
                    <div className="text-sm text-blue-100">Compliant</div>
                  </div>
                  <div>
                    <div className="mb-1 text-3xl font-bold">1</div>
                    <div className="text-sm text-blue-100">Standard</div>
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
          <div className="absolute right-4 top-4 z-10 flex gap-2">
            <Button
              onClick={() => setIsFullscreen(false)}
              variant="default"
              className="shadow-lg"
            >
              <Minimize2 className="mr-2 h-5 w-5" />
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
        <div className="fixed inset-0 z-50 overflow-y-auto bg-white">
          <div className="mx-auto max-w-7xl p-8">
            {/* Header */}
            <div className="sticky top-0 mb-8 flex items-center justify-between border-b border-gray-200 bg-white py-4">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-blue-100 p-3">
                  <Filter className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Advanced Filters
                  </h2>
                  <p className="text-gray-600">
                    {filteredAllEntities.length.toLocaleString()} of{" "}
                    {allEntities.length.toLocaleString()} entities match your
                    criteria
                  </p>
                </div>
              </div>
              <Button
                onClick={() => setIsFilterFullscreen(false)}
                variant="default"
                className="shadow-lg"
              >
                <Minimize2 className="mr-2 h-5 w-5" />
                Close Filters
              </Button>
            </div>

            {/* Search */}
            <div className="mb-8">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Search Keywords
              </label>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 h-6 w-6 -translate-y-1/2 transform text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name, description, type, tags, or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 py-4 pl-12 pr-4 text-lg focus:border-transparent focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Type Filter - Grid View */}
            <div className="mb-8">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  Entity Type
                </h3>
                {selectedTypes.length > 0 && (
                  <Button
                    onClick={() => setSelectedTypes([])}
                    variant="ghost"
                    size="sm"
                  >
                    <X className="mr-1 h-4 w-4" />
                    Clear Type Filter
                  </Button>
                )}
              </div>
              <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
                <button
                  onClick={() => setSelectedTypes([])}
                  className={`rounded-lg border p-4 text-left transition-all ${
                    selectedTypes.length === 0
                      ? "border-blue-300 bg-blue-100 text-blue-800 shadow-md"
                      : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <div className="mb-1 text-lg font-semibold">All Types</div>
                  <div className="text-sm opacity-75">
                    {allEntities.length.toLocaleString()} total
                  </div>
                </button>
                {typeStats.map(({ type, count }) => (
                  <button
                    key={type}
                    onClick={() => setSelectedTypes([type])}
                    className={`rounded-lg border p-4 text-left transition-all ${
                      selectedTypes.includes(type)
                        ? "border-blue-300 bg-blue-100 text-blue-800 shadow-md"
                        : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <div className="mb-1 font-semibold">{type}</div>
                    <div className="text-sm opacity-75">
                      {count.toLocaleString()} entities
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Additional Filters */}
            <div className="mb-8">
              <h3 className="mb-4 text-lg font-semibold text-gray-900">
                Additional Filters
              </h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-gray-200 bg-white p-4 transition-colors hover:bg-gray-50">
                  <input
                    type="checkbox"
                    checked={showFreeOnly}
                    onChange={(e) => setShowFreeOnly(e.target.checked)}
                    className="mt-0.5 h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <div>
                    <div className="font-medium text-gray-900">Free Only</div>
                    <div className="text-sm text-gray-600">
                      Show only entities that are free to access
                    </div>
                  </div>
                </label>
                <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-gray-200 bg-white p-4 transition-colors hover:bg-gray-50">
                  <input
                    type="checkbox"
                    checked={showWithLocationOnly}
                    onChange={(e) => setShowWithLocationOnly(e.target.checked)}
                    className="mt-0.5 h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <div>
                    <div className="font-medium text-gray-900">
                      With Coordinates
                    </div>
                    <div className="text-sm text-gray-600">
                      Show only entities with geographic coordinates
                    </div>
                  </div>
                </label>
                <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-gray-200 bg-white p-4 transition-colors hover:bg-gray-50">
                  <input
                    type="checkbox"
                    checked={showTickets}
                    onChange={(e) => setShowTickets(e.target.checked)}
                    className="mt-0.5 h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <div>
                    <div className="font-medium text-gray-900">
                      Include Support Tickets
                    </div>
                    <div className="text-sm text-gray-600">
                      Show 7000+ customer support tickets on map (may impact
                      performance)
                    </div>
                  </div>
                </label>
              </div>
            </div>

            {/* Clear All */}
            {(selectedTypes.length > 0 ||
              searchTerm ||
              showFreeOnly ||
              showWithLocationOnly ||
              showTickets) && (
              <div className="flex justify-center">
                <Button
                  onClick={clearFilters}
                  variant="outline"
                  size="lg"
                  className="gap-2"
                >
                  <X className="h-5 w-5" />
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
          <div className="mx-auto max-w-[1800px] px-4 py-6 sm:px-6 sm:py-8">
            {/* Header */}
            <div className="mb-6 sm:mb-8">
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-blue-100 p-2 sm:p-3">
                    <MapPinned className="h-6 w-6 text-blue-600 sm:h-8 sm:w-8" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                      Seattle Civic Standard Dashboard
                    </h1>
                    <p className="text-sm text-gray-600 sm:text-base">
                      Unified view of all Seattle civic entities
                    </p>
                  </div>
                </div>
                <Button
                  onClick={() => setIsDrawerOpen(true)}
                  variant="outline"
                  className="w-full gap-2 sm:w-auto"
                >
                  <Info className="h-4 w-4" />
                  About SCS
                </Button>
              </div>
            </div>

            {/* Filters and Search */}
            <div className="mb-6 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:mb-8 sm:p-6">
              <div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Filters & Search
                  </h3>
                  <div className="text-sm text-gray-600">
                    Showing{" "}
                    <span className="font-semibold text-gray-900">
                      {filteredAllEntities.length.toLocaleString()}
                    </span>{" "}
                    of {allEntities.length.toLocaleString()} entities
                  </div>
                </div>
                <Button
                  onClick={() => setIsFilterFullscreen(true)}
                  variant="outline"
                  size="sm"
                  className="w-full gap-2 sm:w-auto"
                >
                  <Maximize2 className="h-4 w-4" />
                  <span className="hidden sm:inline">Expand Filters</span>
                  <span className="sm:hidden">Advanced Filters</span>
                </Button>
              </div>
              <div className="flex flex-col gap-4 lg:flex-row">
                {/* Search Bar */}
                <div className="relative w-full lg:w-1/2">
                  <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by name, description, type, tags, or location..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Filters Row */}
                <div className="flex w-full flex-col gap-4 sm:flex-row lg:w-1/2">
                  {/* Type Dropdown Filter */}
                  <div className="flex-1">
                    <select
                      value={
                        selectedTypes.length === 0
                          ? "all"
                          : selectedTypes.length === 1
                          ? selectedTypes[0]
                          : "multiple"
                      }
                      onChange={(e) => {
                        if (e.target.value === "all") {
                          setSelectedTypes([]);
                        } else {
                          setSelectedTypes([e.target.value]);
                        }
                      }}
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="all">
                        All Types ({typeStats.length})
                      </option>
                      {typeStats.map(({ type, count }) => (
                        <option key={type} value={type}>
                          {type} ({count})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Clear Button */}
                  {(selectedTypes.length > 0 ||
                    searchTerm ||
                    showFreeOnly ||
                    showWithLocationOnly ||
                    showTickets) && (
                    <div className="flex items-end">
                      <Button
                        onClick={clearFilters}
                        variant="ghost"
                        size="sm"
                        className="w-full text-gray-600 hover:text-gray-900 sm:w-auto"
                      >
                        <X className="mr-1 h-4 w-4" />
                        Clear All
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              {/* Ticket visibility info */}
              {!showTickets && (
                <div className="mt-4 flex items-start gap-2 rounded-lg border border-blue-200 bg-blue-50 p-3 text-sm text-blue-800">
                  <Info className="mt-0.5 h-4 w-4 flex-shrink-0" />
                  <div>
                    <span className="font-medium">
                      Customer support tickets hidden
                    </span>
                    <span className="text-blue-700">
                      {" "}
                      - Open Advanced Filters to include 7000+ support tickets
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Toggle Button - Only visible on mobile */}
            <div className="mb-4 lg:hidden">
              <Button
                onClick={() => setShowMapOnMobile(!showMapOnMobile)}
                variant="outline"
                className="w-full gap-2"
              >
                <MapPinned className="h-4 w-4" />
                {showMapOnMobile ? "Hide Map" : "Show Map"} (
                {filteredEntities.length} entities)
              </Button>
            </div>

            {/* Responsive Layout: Stack on mobile, side-by-side on desktop */}
            <div className="flex h-[800px] flex-col gap-6 lg:flex-row">
              {/* Map - Hidden on mobile by default, full width on desktop */}
              <div
                className={`${
                  showMapOnMobile ? "block" : "hidden"
                } flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm lg:block lg:w-1/2`}
              >
                <div className="flex-shrink-0 border-b border-gray-200 p-4 sm:p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 sm:text-xl">
                        Geographic Distribution
                      </h3>
                      <p className="mt-1 text-sm text-gray-600 sm:text-base">
                        {filteredEntities.length} entities mapped
                      </p>
                    </div>
                    <Button
                      onClick={() => setIsFullscreen(true)}
                      variant="outline"
                      size="sm"
                      className="gap-2"
                    >
                      <Maximize2 className="h-4 w-4" />
                      <span className="hidden sm:inline">Fullscreen</span>
                    </Button>
                  </div>
                </div>

                <div className="flex-1 overflow-hidden bg-gray-50 p-4 sm:p-6">
                  <div className="h-full overflow-hidden rounded-lg bg-white">
                    <SCSMap
                      entities={filteredEntities}
                      width={Math.min(800, (window.innerWidth - 120) * 0.5)}
                      height={680}
                    />
                  </div>
                </div>
              </div>

              {/* Entity List - Full width on mobile, half width on desktop */}
              <div className="flex w-full flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm lg:w-1/2">
                <div className="flex-shrink-0 border-b border-gray-200 p-4 sm:p-6">
                  <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 sm:text-xl">
                        Entity List
                      </h3>
                      <p className="mt-1 text-sm text-gray-600 sm:text-base">
                        Page {currentPage} of {totalPages} (
                        {filteredAllEntities.length.toLocaleString()} total)
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
                        <ChevronLeft className="h-4 w-4" />
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
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 sm:p-6">
                  <div className="space-y-3 sm:space-y-4">
                    {paginatedEntities.map((entity, index) => (
                      <div
                        key={`${entity.id}-${index}`}
                        className="rounded-lg border border-gray-200 bg-gray-50 p-3 transition-shadow hover:shadow-md sm:p-4"
                      >
                        {/* Header */}
                        <div className="mb-3">
                          <div className="mb-2 flex items-start justify-between gap-2">
                            <h4 className="flex-1 text-base font-semibold text-gray-900">
                              {entity.name}
                            </h4>
                            <span className="inline-flex flex-shrink-0 items-center rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800">
                              {entity.type}
                            </span>
                          </div>

                          {entity.description && (
                            <p className="line-clamp-2 text-sm leading-relaxed text-gray-600">
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
                                  <span className="text-xs">
                                    {entity.contact.phone}
                                  </span>
                                </div>
                              )}
                              {entity.contact.website && (
                                <div className="flex items-center gap-2 text-gray-600">
                                  <Globe className="h-4 w-4 flex-shrink-0" />
                                  <a
                                    href={entity.contact.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="truncate text-xs text-blue-600 hover:text-blue-800"
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
                                <span className="text-xs">
                                  {entity.ageRange}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* No Results */}
                    {filteredAllEntities.length === 0 && (
                      <div className="py-12 text-center">
                        <div className="mb-4 text-gray-400">
                          <Search className="mx-auto h-12 w-12" />
                        </div>
                        <h3 className="mb-2 text-lg font-medium text-gray-900">
                          No entities found
                        </h3>
                        <p className="text-gray-600">
                          Try adjusting your search terms or filters
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Bottom Pagination */}
                {filteredAllEntities.length > 0 && (
                  <div className="flex flex-shrink-0 flex-col justify-between gap-3 border-t border-gray-200 bg-gray-50 p-3 sm:flex-row sm:items-center sm:p-4">
                    <div className="text-center text-xs text-gray-600 sm:text-left sm:text-sm">
                      Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to{" "}
                      {Math.min(
                        currentPage * ITEMS_PER_PAGE,
                        filteredAllEntities.length
                      )}{" "}
                      of {filteredAllEntities.length.toLocaleString()}
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <Button
                        onClick={goToPrevPage}
                        disabled={currentPage === 1}
                        variant="outline"
                        size="sm"
                        className="gap-1"
                      >
                        <ChevronLeft className="h-4 w-4" />
                        <span className="hidden sm:inline">Previous</span>
                      </Button>
                      <span className="px-2 text-xs text-gray-600 sm:text-sm">
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
                        <ChevronRight className="h-4 w-4" />
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
