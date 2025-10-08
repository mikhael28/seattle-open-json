import { useState, useMemo } from "react";
import { scsData } from "seattle-open-json";
import { Search, MapPin, Phone, Mail, Globe, Calendar, DollarSign, Users, Tag, ExternalLink } from "lucide-react";
import { Button } from "../components/ui/button";

const SCSDataExplorer = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [showFreeOnly, setShowFreeOnly] = useState(false);
  const [showWithLocationOnly, setShowWithLocationOnly] = useState(false);

  // Get all entities
  const allEntities = useMemo(() => scsData.getAllEntities(), []);

  // Get all unique types
  const types = useMemo(() => {
    const typeSet = new Set<string>();
    allEntities.forEach(entity => {
      if (entity.type) typeSet.add(entity.type);
    });
    return Array.from(typeSet).sort();
  }, [allEntities]);

  // Filter entities based on search term and filters
  const filteredEntities = useMemo(() => {
    return allEntities.filter((entity) => {
      // Search filter
      const matchesSearch =
        entity.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entity.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entity.type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entity.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (typeof entity.location === 'string' && entity.location.toLowerCase().includes(searchTerm.toLowerCase()));

      // Type filter
      const matchesType = selectedType === "all" || entity.type === selectedType;

      // Free filter
      const matchesFree = !showFreeOnly || (entity.cost && entity.cost.toLowerCase().includes("free"));

      // Location filter
      const matchesLocation = !showWithLocationOnly || (
        typeof entity.location !== 'string' && entity.location.coordinates
      );

      return matchesSearch && matchesType && matchesFree && matchesLocation;
    });
  }, [allEntities, searchTerm, selectedType, showFreeOnly, showWithLocationOnly]);

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

  const renderSchedule = (schedule: Array<{ day?: string; hours?: string }> | undefined) => {
    if (!schedule || schedule.length === 0) return null;

    return (
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <Calendar className="h-4 w-4" />
          <span>Schedule:</span>
        </div>
        <div className="ml-6 space-y-1">
          {schedule.map((item, idx) => (
            <div key={idx} className="text-sm text-gray-600">
              {item.day && <span className="font-medium">{item.day}: </span>}
              {item.hours && <span>{item.hours}</span>}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="h-full bg-gray-50 flex flex-col">
      <div className="flex-shrink-0 p-6 border-b border-gray-200 bg-white">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Seattle Civic Standard Data Explorer
          </h1>
          <p className="text-gray-600">
            Explore {allEntities.length.toLocaleString()} civic entities in a unified format
          </p>
        </div>

        {/* Search and Filter Controls */}
        <div className="bg-gray-50 rounded-lg border border-gray-200 p-4">
          <div className="flex flex-col gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
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
            <div className="flex flex-col md:flex-row gap-4">
              {/* Type Filter */}
              <div className="flex-1">
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Types ({types.length})</option>
                  {types.map(type => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Checkbox Filters */}
              <div className="flex gap-4 items-center">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showFreeOnly}
                    onChange={(e) => setShowFreeOnly(e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">Free only</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showWithLocationOnly}
                    onChange={(e) => setShowWithLocationOnly(e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">With coordinates</span>
                </label>
              </div>
            </div>

            {/* Results Count */}
            <div className="text-sm text-gray-600">
              Showing {filteredEntities.length.toLocaleString()} of {allEntities.length.toLocaleString()} entities
            </div>
          </div>
        </div>
      </div>

      {/* Entities List - Scrollable */}
      <div className="flex-1 overflow-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filteredEntities.map((entity, index) => (
            <div
              key={`${entity.id}-${index}`}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              {/* Header */}
              <div className="mb-4">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 flex-1">
                    {entity.name}
                  </h3>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 flex-shrink-0">
                    {entity.type}
                  </span>
                </div>

                {entity.description && (
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                    {entity.description}
                  </p>
                )}
              </div>

              {/* Details Grid */}
              <div className="space-y-3 text-sm">
                {/* Location */}
                {entity.location && renderLocation(entity.location)}

                {/* Contact Info */}
                {entity.contact && (
                  <div className="space-y-1">
                    {entity.contact.phone && (
                      <div className="flex items-center gap-2 text-gray-600">
                        <Phone className="h-4 w-4 flex-shrink-0" />
                        <span>{entity.contact.phone}</span>
                      </div>
                    )}
                    {entity.contact.email && (
                      <div className="flex items-center gap-2 text-gray-600">
                        <Mail className="h-4 w-4 flex-shrink-0" />
                        <a href={`mailto:${entity.contact.email}`} className="text-blue-600 hover:text-blue-800">
                          {entity.contact.email}
                        </a>
                      </div>
                    )}
                    {entity.contact.website && (
                      <div className="flex items-center gap-2 text-gray-600">
                        <Globe className="h-4 w-4 flex-shrink-0" />
                        <a
                          href={entity.contact.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 truncate"
                        >
                          Website
                        </a>
                      </div>
                    )}
                  </div>
                )}

                {/* Schedule */}
                {entity.schedule && renderSchedule(entity.schedule)}

                {/* Additional Info Row */}
                <div className="flex flex-wrap gap-3 pt-2 border-t border-gray-100">
                  {entity.cost && (
                    <div className="flex items-center gap-1.5 text-gray-700">
                      <DollarSign className="h-4 w-4" />
                      <span className="text-xs font-medium">{entity.cost}</span>
                    </div>
                  )}
                  {entity.ageRange && (
                    <div className="flex items-center gap-1.5 text-gray-700">
                      <Users className="h-4 w-4" />
                      <span className="text-xs font-medium">{entity.ageRange}</span>
                    </div>
                  )}
                </div>

                {/* Tags */}
                {entity.tags && entity.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {entity.tags.slice(0, 5).map((tag, tagIdx) => (
                      <span
                        key={tagIdx}
                        className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-gray-100 text-gray-700"
                      >
                        <Tag className="h-3 w-3 mr-1" />
                        {tag}
                      </span>
                    ))}
                    {entity.tags.length > 5 && (
                      <span className="text-xs text-gray-400">
                        +{entity.tags.length - 5} more
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Action Button */}
              {entity.contact?.website && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <Button asChild size="sm" className="w-full">
                    <a
                      href={entity.contact.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Learn More
                    </a>
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredEntities.length === 0 && (
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
  );
};

export default SCSDataExplorer;
