import { useState, useMemo, useEffect } from "react";
import { loadScsData } from "seattle-open-json/scs";
import type { CivicTicket } from "seattle-open-json/types";
import { Search, MapPin, Calendar, Tag, AlertCircle, Building, User, Filter, X } from "lucide-react";
import { Button } from "../components/ui/button";

const CustomerSupportExplorer = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedRequestType, setSelectedRequestType] = useState("all");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [allTickets, setAllTickets] = useState<CivicTicket[]>([]);
  const [loading, setLoading] = useState(true);

  // Load customer support tickets on mount
  useEffect(() => {
    loadScsData().then((data) => {
      setAllTickets(data.customerSupportTickets);
      setLoading(false);
    });
  }, []);

  // Get unique values for filters
  const statuses = useMemo(() => {
    const statusSet = new Set<string>();
    allTickets.forEach(ticket => {
      if (ticket.ticketStatus) statusSet.add(ticket.ticketStatus);
    });
    return Array.from(statusSet).sort();
  }, [allTickets]);

  const requestTypes = useMemo(() => {
    const typeSet = new Set<string>();
    allTickets.forEach(ticket => {
      if (ticket.requestType) typeSet.add(ticket.requestType);
    });
    return Array.from(typeSet).sort();
  }, [allTickets]);

  const departments = useMemo(() => {
    const deptSet = new Set<string>();
    allTickets.forEach(ticket => {
      if (ticket.assignedDepartment) deptSet.add(ticket.assignedDepartment);
    });
    return Array.from(deptSet).sort();
  }, [allTickets]);

  // Filter tickets based on search term and filters
  const filteredTickets = useMemo(() => {
    return allTickets.filter((ticket) => {
      // Search filter
      const matchesSearch =
        ticket.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.ticketNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.requestType?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.neighborhood?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.assignedDepartment?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (typeof ticket.location === 'string' && ticket.location.toLowerCase().includes(searchTerm.toLowerCase()));

      // Status filter
      const matchesStatus = selectedStatus === "all" || ticket.ticketStatus === selectedStatus;

      // Request Type filter
      const matchesRequestType = selectedRequestType === "all" || ticket.requestType === selectedRequestType;

      // Department filter
      const matchesDepartment = selectedDepartment === "all" || ticket.assignedDepartment === selectedDepartment;

      return matchesSearch && matchesStatus && matchesRequestType && matchesDepartment;
    });
  }, [allTickets, searchTerm, selectedStatus, selectedRequestType, selectedDepartment]);

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

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "open":
        return "bg-green-100 text-green-800";
      case "closed":
        return "bg-gray-100 text-gray-800";
      case "in progress":
      case "reported":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedStatus("all");
    setSelectedRequestType("all");
    setSelectedDepartment("all");
  };

  const hasActiveFilters = searchTerm || selectedStatus !== "all" || selectedRequestType !== "all" || selectedDepartment !== "all";

  if (loading) {
    return (
      <div className="h-full bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading customer support tickets...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-gray-50 flex flex-col">
      <div className="flex-shrink-0 p-6 border-b border-gray-200 bg-white">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Customer Support Ticket Explorer
          </h1>
          <p className="text-gray-600">
            Explore {allTickets.length.toLocaleString()} customer support tickets from Find It Fix It and other channels
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
                placeholder="Search by ticket number, description, location, neighborhood, or department..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Filters Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Status Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Statuses ({statuses.length})</option>
                  {statuses.map(status => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>

              {/* Request Type Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Request Type</label>
                <select
                  value={selectedRequestType}
                  onChange={(e) => setSelectedRequestType(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Types ({requestTypes.length})</option>
                  {requestTypes.map(type => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Department Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                <select
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Departments ({departments.length})</option>
                  {departments.map(dept => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Results Count and Clear Button */}
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Showing {filteredTickets.length.toLocaleString()} of {allTickets.length.toLocaleString()} tickets
              </div>
              {hasActiveFilters && (
                <Button
                  onClick={clearFilters}
                  variant="ghost"
                  size="sm"
                  className="gap-2"
                >
                  <X className="w-4 h-4" />
                  Clear Filters
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Tickets List - Scrollable */}
      <div className="flex-1 overflow-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredTickets.map((ticket, index) => (
            <div
              key={`${ticket.id}-${index}`}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow"
            >
              {/* Header */}
              <div className="mb-4">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <AlertCircle className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-mono text-gray-600">
                        {ticket.ticketNumber}
                      </span>
                    </div>
                    <h3 className="text-base font-semibold text-gray-900">
                      {ticket.name}
                    </h3>
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium flex-shrink-0 ${getStatusColor(ticket.ticketStatus)}`}>
                    {ticket.ticketStatus}
                  </span>
                </div>

                {ticket.description && (
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                    {ticket.description}
                  </p>
                )}
              </div>

              {/* Details Grid */}
              <div className="space-y-3 text-sm">
                {/* Request Type */}
                <div className="flex items-center gap-2 text-gray-700">
                  <Filter className="h-4 w-4 flex-shrink-0" />
                  <span className="font-medium">{ticket.requestType}</span>
                </div>

                {/* Department */}
                {ticket.assignedDepartment && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <Building className="h-4 w-4 flex-shrink-0" />
                    <span className="text-xs">{ticket.assignedDepartment}</span>
                  </div>
                )}

                {/* Created Date */}
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="h-4 w-4 flex-shrink-0" />
                  <span className="text-xs">Created: {ticket.createdDate}</span>
                </div>

                {/* Method Received */}
                {ticket.methodReceived && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <User className="h-4 w-4 flex-shrink-0" />
                    <span className="text-xs">{ticket.methodReceived}</span>
                  </div>
                )}

                {/* Location */}
                {ticket.location && (
                  <div className="pt-2 border-t border-gray-100">
                    {renderLocation(ticket.location)}
                  </div>
                )}

                {/* Neighborhood & Additional Info */}
                {(ticket.neighborhood || ticket.precinct || ticket.councilDistrict) && (
                  <div className="pt-2 border-t border-gray-100 flex flex-wrap gap-1.5">
                    {ticket.neighborhood && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-gray-100 text-gray-700">
                        <Tag className="h-3 w-3 mr-1" />
                        {ticket.neighborhood}
                      </span>
                    )}
                    {ticket.precinct && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-blue-50 text-blue-700">
                        {ticket.precinct}
                      </span>
                    )}
                    {ticket.councilDistrict && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-purple-50 text-purple-700">
                        District {ticket.councilDistrict}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredTickets.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No tickets found</h3>
            <p className="text-gray-600">
              Try adjusting your search terms or filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerSupportExplorer;
