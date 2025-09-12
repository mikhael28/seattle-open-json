import { emeraldCityResourceGuide } from "seattle-open-json";
import { EmeraldCityResourceGuide } from "seattle-open-json";
import React, { useState, useMemo } from "react";
import { Search, ExternalLink, MapPin, Phone, Mail, Globe } from "lucide-react";
import { Button } from "../components/ui/button";

const ResourceGuide = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Get all unique categories
  const categories = useMemo(() => {
    const cats = new Set<string>();
    emeraldCityResourceGuide.forEach(org => {
      org.categories.forEach(category => {
        cats.add(category);
      });
    });
    return Array.from(cats).sort();
  }, []);

  // Filter organizations based on search term and category
  const filteredOrganizations = useMemo(() => {
    return emeraldCityResourceGuide.filter((org) => {
      const matchesSearch = 
        org.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        org.categories.some(cat => cat.toLowerCase().includes(searchTerm.toLowerCase())) ||
        org.name.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === "all" || org.categories.includes(selectedCategory);
      
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="h-full bg-gray-50 flex flex-col">
      <div className="flex-shrink-0 p-6 border-b border-gray-200 bg-white">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Emerald City Resource Guide</h1>
          <p className="text-gray-600">
            Explore {emeraldCityResourceGuide.length} organizations and resources in Seattle
          </p>
        </div>

        {/* Search and Filter Controls */}
        <div className="bg-gray-50 rounded-lg border border-gray-200 p-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search organizations, categories, or descriptions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="md:w-64">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredOrganizations.length} of {emeraldCityResourceGuide.length} organizations
          </div>
        </div>
      </div>

      {/* Organizations List - Scrollable */}
      <div className="flex-1 overflow-auto p-6">
        <div className="space-y-4">
          {filteredOrganizations.map((org, index) => (
            <div key={`${org.name}-${index}`} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-xl font-semibold text-gray-900">{org.name}</h3>
                    {org.categories.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {org.categories.map((category, catIndex) => (
                          <span key={catIndex} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                            {category}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  {org.description && (
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {org.description}
                    </p>
                  )}

                  {/* Contact Information */}
                  <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                    {org.website && (
                      <a
                        href={org.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        <Globe className="h-4 w-4" />
                        Website
                      </a>
                    )}
                    {org.phone && (
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        {org.phone}
                      </div>
                    )}
                    {org.address && (
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        {org.address}
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Button */}
                {org.website && (
                  <div className="flex-shrink-0">
                    <Button asChild>
                      <a
                        href={org.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        <ExternalLink className="h-4 w-4" />
                        Visit Website
                      </a>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* No Results */}
          {filteredOrganizations.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Search className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No organizations found</h3>
              <p className="text-gray-600">
                Try adjusting your search terms or category filter
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResourceGuide;
