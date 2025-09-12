import React, { useState, useMemo } from "react";
import { Button } from "../components/ui/button";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Camera, 
  Settings, 
  Database,
  Users,
  Utensils,
  TreePine,
  Building,
  Calendar,
  Flower,
  MapPinIcon,
  Activity,
  ChevronRight,
  ExternalLink,
  Clock,
  DollarSign,
  Search,
  Filter,
  BarChart3,
  TrendingUp,
  Star,
  Globe,
  Heart,
  Navigation,
  Info,
  CheckCircle,
  AlertCircle,
  Eye,
  Download,
  Share2,
  Bookmark,
  Grid3X3,
  List,
  Calendar as CalendarIcon,
  MapPinned,
  Phone as PhoneIcon,
  Mail as MailIcon,
  ExternalLinkIcon,
  Target,
  Award,
  Users2
} from "lucide-react";

// Import all data from seattle-open-json
import {
  communityCenters,
  farmersMarkets,
  mobileRecreationProgramming,
  pPatch,
  picnicSites,
  privatelyOwnedPublicSpaces,
  youth_programs,
  packageMetadata,
  emeraldCityResourceGuide,
  type CommunityCenter,
  type FarmersMarket,
  type MobileRecreationProgramming,
  type PPatch,
  type PicnicSite,
  type PrivatelyOwnedPublicSpace,
  type YouthProgram,
  EmeraldCityResourceGuide
} from "seattle-open-json";

// Define missing types for organizationData
interface OrganizationData {
  Description: string;
  Category: string;
  url: string;
}

// Define tab configuration
const tabs = [
  {
    id: 'overview',
    name: 'Overview',
    icon: Database,
    data: null,
    count: Object.values(packageMetadata.totalRecords).reduce((sum, count) => sum + (typeof count === 'number' ? count : 0), 0)
  },
  {
    id: 'youth-programs',
    name: 'Youth Programs',
    icon: Users,
    data: youth_programs,
    count: youth_programs.length
  },
  {
    id: 'community-centers',
    name: 'Community Centers',
    icon: Building,
    data: communityCenters,
    count: communityCenters.length
  },
  {
    id: 'farmers-markets',
    name: 'Farmers Markets',
    icon: Utensils,
    data: farmersMarkets,
    count: farmersMarkets.length
  },
  {
    id: 'mobile-recreation',
    name: 'Mobile Recreation',
    icon: Activity,
    data: mobileRecreationProgramming,
    count: mobileRecreationProgramming.length
  },
  {
    id: 'p-patch',
    name: 'P-Patch Gardens',
    icon: Flower,
    data: pPatch,
    count: pPatch.length
  },
  {
    id: 'picnic-sites',
    name: 'Picnic Sites',
    icon: MapPinIcon,
    data: picnicSites,
    count: picnicSites.length
  },
  {
    id: 'public-spaces',
    name: 'Public Spaces',
    icon: MapPin,
    data: privatelyOwnedPublicSpaces,
    count: privatelyOwnedPublicSpaces.length
  }
];

const Profile = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [viewMode, setViewMode] = useState<'cards' | 'table' | 'map'>('cards');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  // Analytics and insights
  const analytics = useMemo(() => {
    const totalRecords = Object.values(packageMetadata.totalRecords).reduce((sum, count) => sum + (typeof count === 'number' ? count : 0), 0);
    const openCenters = communityCenters.filter(center => center["Open Status"] === "Open").length;
    const weekendMarkets = farmersMarkets.filter(market => 
      market.ACTIVEDAY?.includes("Saturday") || market.ACTIVEDAY?.includes("Sunday")
    ).length;
    const freeYouthPrograms = youth_programs.filter(program => 
      program.cost.toLowerCase().includes('free') || program.cost === '$0'
    ).length;
    
    return {
      totalRecords,
      openCenters,
      weekendMarkets,
      freeYouthPrograms,
      dataCategories: packageMetadata.categories.length,
      lastUpdated: new Date(packageMetadata.lastUpdated).toLocaleDateString()
    };
  }, []);

  const renderEnhancedOverview = () => (
    <div className="space-y-8">
  

      {/* Category Explorer */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-gray-900">Explore Data Categories</h3>
          <Button variant="outline" className="flex items-center space-x-2">
            <BarChart3 className="h-4 w-4" />
            <span>View Analytics</span>
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tabs.slice(1).map((tab, index) => {
            const IconComponent = tab.icon;
            const gradients = [
              'from-blue-500 to-cyan-500',
              'from-green-500 to-emerald-500', 
              'from-purple-500 to-violet-500',
              'from-orange-500 to-amber-500',
              'from-pink-500 to-rose-500',
              'from-indigo-500 to-blue-500',
              'from-teal-500 to-green-500',
              'from-red-500 to-pink-500'
            ];
            const gradient = gradients[index % gradients.length];
            
            return (
              <div 
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="group relative overflow-hidden rounded-xl bg-white border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300 cursor-pointer hover-lift animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`rounded-lg bg-gradient-to-r ${gradient} p-3 text-white group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900">{tab.count.toLocaleString()}</div>
                      <div className="text-sm text-gray-500">records</div>
                    </div>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">{tab.name}</h4>
                  <div className="flex items-center text-sm text-gray-600 group-hover:text-gray-800 transition-colors">
                    <span>Explore data</span>
                    <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
                <div className={`absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r ${gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`} />
              </div>
            );
          })}
        </div>
      </div>

      {/* Package Information */}
      <div className="rounded-xl border border-gray-200 bg-gradient-to-br from-gray-50 to-white p-8">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">About This Dataset</h3>
            <p className="text-gray-700 leading-relaxed">{packageMetadata.description}</p>
          </div>
  
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center space-x-3">
            <Info className="h-5 w-5 text-blue-600" />
            <div>
              <div className="font-medium text-gray-900">Version</div>
              <div className="text-sm text-gray-600">v{packageMetadata.version}</div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Calendar className="h-5 w-5 text-green-600" />
            <div>
              <div className="font-medium text-gray-900">Last Updated</div>
              <div className="text-sm text-gray-600">{analytics.lastUpdated}</div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Database className="h-5 w-5 text-purple-600" />
            <div>
              <div className="font-medium text-gray-900">Total Records</div>
              <div className="text-sm text-gray-600">{analytics.totalRecords.toLocaleString()}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Enhanced data filtering
  const filteredData = useMemo(() => {
    const activeTabData = tabs.find(tab => tab.id === activeTab);
    if (!activeTabData?.data || activeTab === 'overview') return [];
    
    let filtered: any[] = activeTabData.data;
    
    // Debug: Check what data we're working with
    if (activeTab === 'mobile-recreation' && filtered.length > 0) {
      console.log('Raw Mobile Recreation Data:', {
        tabName: activeTabData.name,
        dataLength: filtered.length,
        firstItemRaw: filtered[0],
        firstItemKeys: Object.keys(filtered[0]),
        sampleNames: filtered.slice(0, 5).map(item => ({
          name: item.name,
          programTitle: item['Program Title'],
          location: item.location
        }))
      });
    }
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter((item: any) =>
        Object.values(item).some(value =>
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
    
    return filtered;
  }, [activeTab, searchTerm, tabs]);

  const renderEnhancedDataView = (data: any[], type: string) => {
    // Debug logging for mobile recreation
    if (type.includes('Mobile Recreation') && data.length > 0) {
      console.log('Mobile Recreation Data Sample:', {
        type,
        dataLength: data.length,
        firstItem: data[0],
        firstItemKeys: Object.keys(data[0]),
        firstItemName: data[0].name,
        firstItemProgramTitle: data[0]['Program Title'],
        firstItemLocation: data[0].location
      });
    }
    
    if (!data || data.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="rounded-full bg-gray-100 p-6 mb-4">
            <Database className="h-12 w-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No data available</h3>
          <p className="text-gray-600">Try adjusting your search or filters</p>
        </div>
      );
    }

    const sampleItem = data[0];
    const allKeys = Object.keys(sampleItem);
    
    // Smart key selection based on data type
    const getRelevantKeys = (item: any, type: string) => {
      let priorityKeys: string[] = [];
      
      if (type.includes('Picnic')) {
        priorityKeys = ['Shelter Name', 'Fee', 'Capacity', 'ADA', 'Features', 'Sheltered Tables', 'Unsheltered Tables'];
      } else if (type.includes('Mobile Recreation')) {
        priorityKeys = ['name', 'Program Title', 'location', 'Program Category', 'description', 'Activity Days', 'Program Status', 'Program Contact'];
      } else if (type.includes('Public Spaces')) {
        priorityKeys = ['name', 'Address', 'Neighborhood', 'Benefit', 'Built', 'Website'];
      } else if (type.includes('Community Centers')) {
        priorityKeys = ['name', 'Offical Name', 'Address', 'CC Phone Number', 'Open Status', 'Operational Status', 'Website Link'];
      } else {
        // Default priority keys for other types
        const commonKeys = ['name', 'Name', 'NAME', 'title', 'Title'];
        const addressKeys = ['address', 'Address', 'location', 'Location', 'LOCATION'];
        const contactKeys = ['phone', 'Phone', 'PHONE', 'email', 'Email', 'website', 'Website', 'WEBSITE', 'url'];
        const timeKeys = ['hours', 'Hours', 'HOURS', 'times', 'day', 'dates', 'ACTIVEDAY', 'MONTHS'];
        const statusKeys = ['status', 'Status', 'Open Status'];
        priorityKeys = [...commonKeys, ...addressKeys, ...contactKeys, ...timeKeys, ...statusKeys];
      }
      
      const keys = priorityKeys.filter(key => key in item);
      const remainingKeys = allKeys.filter(key => !priorityKeys.includes(key)).slice(0, 3);
      
      return [...keys, ...remainingKeys].slice(0, 8);
    };

    const keys = getRelevantKeys(sampleItem, type);

    return (
      <div className="space-y-6">
        {/* Enhanced Header with Search and Filters */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">{data.length.toLocaleString()} {type}</h3>
              <p className="text-gray-600">Explore and discover community resources</p>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button
                variant={viewMode === 'cards' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('cards')}
                className="flex items-center space-x-2"
              >
                <Grid3X3 className="h-4 w-4" />
                <span>Cards</span>
              </Button>
              <Button
                variant={viewMode === 'table' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('table')}
                className="flex items-center space-x-2"
              >
                <List className="h-4 w-4" />
                <span>Table</span>
              </Button>
              <Button
                variant={viewMode === 'map' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('map')}
                className="flex items-center space-x-2"
              >
                <MapPinned className="h-4 w-4" />
                <span>Map</span>
              </Button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder={`Search ${type.toLowerCase()}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            )}
          </div>
        </div>

        {/* Data Views */}
        {viewMode === 'table' ? (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    {keys.map(key => (
                      <th key={key} className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </th>
                    ))}
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {data.slice(0, 50).map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition-colors">
                      {keys.map(key => (
                        <td key={key} className="px-6 py-4 text-sm text-gray-900">
                          {renderCellContent(item[key], key)}
                        </td>
                      ))}
                      <td className="px-6 py-4 text-sm">
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Bookmark className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {data.length > 50 && (
              <div className="bg-gray-50 px-6 py-4 text-center text-sm text-gray-600">
                Showing first 50 of {data.length} records
              </div>
            )}
          </div>
        ) : viewMode === 'map' ? (
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="text-center py-12">
              <MapPinned className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Map View</h3>
              <p className="text-gray-600">Geographic visualization coming soon</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.slice(0, 60).map((item, index) => (
              <div key={index} className="group bg-white rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300 overflow-hidden hover-lift animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
                {renderEnhancedCard(item, keys, type)}
              </div>
            ))}
            {data.length > 60 && (
              <div className="col-span-full text-center py-8 animate-fade-in">
                <Button variant="outline" className="flex items-center space-x-2 hover-lift">
                  <Eye className="h-4 w-4" />
                  <span>Load More ({data.length - 60} remaining)</span>
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  const renderCellContent = (value: any, key: string) => {
    if (typeof value === 'string' && (value.startsWith('http') || value.includes('@'))) {
      return (
        <a 
          href={value.startsWith('http') ? value : `mailto:${value}`} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-blue-600 hover:text-blue-800 hover:underline flex items-center"
        >
          {value.startsWith('http') ? (
            <>
              <ExternalLinkIcon className="h-3 w-3 mr-1" />
              Link
            </>
          ) : (
            <>
              <MailIcon className="h-3 w-3 mr-1" />
              {value}
            </>
          )}
        </a>
      );
    }
    
    const stringValue = String(value);
    return stringValue.length > 50 ? `${stringValue.substring(0, 50)}...` : stringValue;
  };

  const renderEnhancedCard = (item: any, keys: string[], type: string) => {
    const getIconForType = (type: string) => {
      const iconMap: { [key: string]: any } = {
        'Youth Programs': Users2,
        'Community Centers': Building,
        'Farmers Markets': Utensils,
        'Mobile Recreation': Activity,
        'P-Patch Gardens': Flower,
        'Picnic Sites': MapPinIcon,
        'Public Spaces': MapPin
      };
      return iconMap[type] || Database;
    };

    const IconComponent = getIconForType(type);
    // Smart title selection based on data type and content quality
    const getSmartTitle = (item: any, type: string) => {
      // For picnic sites, use Shelter Name
      if (type.includes('Picnic')) {
        return item['Shelter Name'] || item.name || 'Unnamed Picnic Site';
      }
      
      // For mobile recreation, prefer Program Title if it's not empty and different from generic name
      if (type.includes('Mobile Recreation')) {
        const programTitle = item['Program Title'];
        const name = item.name;
        const location = item.location;
        
        console.log('Mobile Recreation Debug:', {
          name,
          programTitle,
          location,
          hasName: 'name' in item,
          nameValue: item.name,
          allKeys: Object.keys(item)
        });
        
        // Strategy: Build the best title from available information
        let title = '';
        
        // If we have a meaningful program title, use it as the main title
        if (programTitle && programTitle.trim()) {
          title = programTitle;
        } else if (location && location.trim()) {
          // If no program title, use location as the main identifier
          title = location;
        } else if (name && name.trim()) {
          // Fall back to the generic name
          title = name;
        } else {
          title = 'Unnamed Program';
        }
        
        // For generic program names, add location context
        if (name && (name.includes('Rec\'N the Streets') || name.includes('Urban Parks Partnership') || name.includes('Summer Lunch')) && location && location.trim()) {
          if (!title.includes(location)) {
            title = `${title} at ${location}`;
          }
        }
        
        return title;
      }
      
      // For community centers, handle the typo in "Offical Name"
      if (type.includes('Community Centers')) {
        return item.name || item['Offical Name'] || item.Name || 'Unnamed Center';
      }
      
      // Default fallback for all other types
      return item.name || item.Name || item.NAME || item.title || item.activityName || 'Unnamed';
    };

    const mainTitle = getSmartTitle(item, type);
    const location = item.address || item.Address || item.location || item.Location || item.LOCATION || item['Program Location'] || '';
    const contact = item.phone || item.Phone || item.PHONE || item['CC Phone Number'] || item['Program Contact'] || '';
    const website = item.website || item.Website || item.WEBSITE || item.url || item['Website Link'] || '';
    const status = item.status || item.Status || item['Open Status'] || item['Program Status'] || '';
    const description = item.description || item.programDescription || item.activityDescription || '';

    return (
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="rounded-lg bg-blue-100 p-2 group-hover:bg-blue-200 transition-colors">
              <IconComponent className="h-5 w-5 text-blue-600" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-gray-900 truncate group-hover:text-blue-600 transition-colors">
                {mainTitle}
              </h4>
              <div className="flex items-center space-x-2 mt-1">
                {status && (
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    status.toLowerCase().includes('open') || status.toLowerCase().includes('active') || status.toLowerCase().includes('eligible')
                      ? 'bg-green-100 text-green-800'
                      : status.toLowerCase().includes('closed') || status.toLowerCase().includes('inactive')
                      ? 'bg-red-100 text-red-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {status}
                  </span>
                )}
              </div>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
            <Bookmark className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-3">
          {location && (
            <div className="flex items-start space-x-2 text-sm text-gray-600">
              <MapPinned className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <span className="line-clamp-2">{location}</span>
            </div>
          )}
          
          {contact && (
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <PhoneIcon className="h-4 w-4 flex-shrink-0" />
              <span>{contact}</span>
            </div>
          )}

          {description && (
            <p className="text-sm text-gray-600 line-clamp-3">{description}</p>
          )}

          {/* Additional fields based on data type */}
          {type.includes('Picnic') && (
            <div className="space-y-2">
              {item.Fee && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Fee:</span>
                  <span className={`font-medium ${item.Fee === '$0.00' ? 'text-green-600' : 'text-gray-900'}`}>
                    {item.Fee}
                  </span>
                </div>
              )}
              {item.Capacity && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Capacity:</span>
                  <span className="font-medium text-gray-900">{item.Capacity} people</span>
                </div>
              )}
            </div>
          )}

          {type.includes('Mobile Recreation') && item['Activity Days'] && (
            <div className="text-sm text-gray-600">
              <span className="font-medium text-gray-700">Schedule:</span>
              <div className="mt-1">{item['Activity Days']}</div>
            </div>
          )}

          {type.includes('Public Spaces') && (
            <div className="space-y-1">
              {item.Built && (
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <CalendarIcon className="h-4 w-4 flex-shrink-0" />
                  <span>Built in {item.Built}</span>
                </div>
              )}
              {item.Benefit && (
                <div className="text-sm text-gray-600">
                  <span className="font-medium text-gray-700">Benefits:</span>
                  <div className="mt-1">{item.Benefit}</div>
                </div>
              )}
            </div>
          )}

          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex items-center space-x-2">
              {website && (
                <a
                  href={website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <ExternalLinkIcon className="h-4 w-4" />
                </a>
              )}
            </div>
            <Button variant="ghost" size="sm" className="text-xs">
              <Eye className="h-3 w-3 mr-1" />
              View Details
            </Button>
          </div>
        </div>
      </div>
    );
  };

  const activeTabData = tabs.find(tab => tab.id === activeTab);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="rounded-lg bg-blue-100 p-2">
                  <Database className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Seattle Open Data</h1>
                  <p className="text-sm text-gray-500">Community Resource Explorer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Tab Navigation */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8 overflow-hidden">
          <div className="flex overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setSearchTerm(''); // Reset search when switching tabs
                  }}
                  className={`group relative flex items-center space-x-3 px-6 py-4 border-b-2 transition-all duration-200 whitespace-nowrap min-w-0 ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600 bg-blue-50'
                      : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                 
                  <div className="flex-1 min-w-0">
                    <span className="font-small truncate">{tab.name}</span>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                        activeTab === tab.id
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-gray-100 text-gray-700 group-hover:bg-gray-200'
                      }`}>
                        {tab.count.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Enhanced Tab Content */}
        <div className="space-y-6">
          {activeTab === 'overview' ? (
            renderEnhancedOverview()
          ) : (
            renderEnhancedDataView(filteredData, activeTabData?.name || '')
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
