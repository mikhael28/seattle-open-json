import React, { useState } from "react";
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
  DollarSign
} from "lucide-react";

// Import all data from seattle-open-json
import {
  communityCenters,
  farmersMarkets,
  parksCatalog,
  mobileRecreationProgramming,
  pPatch,
  picnicSites,
  privatelyOwnedPublicSpaces,
  youth_programs,
  packageMetadata,
  type CommunityCenter,
  type FarmersMarket,
  type ParksCatalog,
  type MobileRecreationProgramming,
  type PPatch,
  type PicnicSite,
  type PrivatelyOwnedPublicSpace,
  type YouthProgram
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
    id: 'parks-catalog',
    name: 'Parks & Activities',
    icon: TreePine,
    data: parksCatalog,
    count: parksCatalog.length
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
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Package Metadata */}
      <div className="rounded-lg border bg-card p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Database className="h-6 w-6 text-blue-600" />
          <h3 className="text-xl font-semibold">Seattle Open Data Package</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{packageMetadata.totalRecords.total}</div>
            <div className="text-sm text-gray-600">Total Records</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{packageMetadata.categories.length}</div>
            <div className="text-sm text-gray-600">Data Categories</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">v{packageMetadata.version}</div>
            <div className="text-sm text-gray-600">Package Version</div>
          </div>
        </div>
        <p className="text-gray-700 mb-4">{packageMetadata.description}</p>
        <div className="text-sm text-gray-500">
          Last updated: {new Date(packageMetadata.lastUpdated).toLocaleDateString()}
        </div>
      </div>

      {/* Data Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tabs.slice(1).map((tab) => {
          const IconComponent = tab.icon;
          return (
            <div 
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="rounded-lg border bg-card p-4 hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex items-center justify-between mb-2">
                <IconComponent className="h-6 w-6 text-blue-600" />
                <span className="text-2xl font-bold text-gray-900">{tab.count}</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-1">{tab.name}</h4>
              <div className="flex items-center text-sm text-gray-600">
                <span>View details</span>
                <ChevronRight className="h-4 w-4 ml-1" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderDataTable = (data: any[], type: string) => {
    if (!data || data.length === 0) return <div>No data available</div>;

    const sampleItem = data[0];
    const keys = Object.keys(sampleItem).slice(0, 6); // Show first 6 fields

    return (
      <div className="space-y-4">
        {/* View Mode Toggle */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">{data.length} {type} Records</h3>
          <div className="flex space-x-2">
            <Button
              variant={viewMode === 'cards' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('cards')}
            >
              Cards
            </Button>
            <Button
              variant={viewMode === 'table' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('table')}
            >
              Table
            </Button>
          </div>
        </div>

        {viewMode === 'table' ? (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-50">
                  {keys.map(key => (
                    <th key={key} className="border border-gray-300 px-4 py-2 text-left font-medium">
                      {key}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.slice(0, 20).map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    {keys.map(key => (
                      <td key={key} className="border border-gray-300 px-4 py-2 text-sm">
                        {typeof item[key] === 'string' && item[key].startsWith('http') ? (
                          <a href={item[key]} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center">
                            Link <ExternalLink className="h-3 w-3 ml-1" />
                          </a>
                        ) : (
                          String(item[key]).substring(0, 50) + (String(item[key]).length > 50 ? '...' : '')
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            {data.length > 20 && (
              <div className="text-center py-4 text-gray-500">
                Showing first 20 of {data.length} records
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
            {data.slice(0, 30).map((item, index) => (
              <div key={index} className="rounded-lg border bg-card p-4">
                <div className="space-y-2">
                  {keys.map(key => (
                    <div key={key} className="text-sm">
                      <span className="font-medium text-gray-700">{key}:</span>
                      <div className="text-gray-600 mt-1">
                        {typeof item[key] === 'string' && item[key].startsWith('http') ? (
                          <a href={item[key]} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center">
                            Link <ExternalLink className="h-3 w-3 ml-1" />
                          </a>
                        ) : (
                          String(item[key]).substring(0, 100) + (String(item[key]).length > 100 ? '...' : '')
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            {data.length > 30 && (
              <div className="col-span-full text-center py-4 text-gray-500">
                Showing first 30 of {data.length} records
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  const activeTabData = tabs.find(tab => tab.id === activeTab);

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Seattle Open Data Viewer</h1>
        <Button variant="outline">
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </Button>
      </div>

      {/* Tab Navigation */}
      <div className="rounded-lg border bg-card">
        <div className="flex overflow-x-auto">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-4 border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600 bg-blue-50'
                    : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <IconComponent className="h-4 w-4" />
                <span>{tab.name}</span>
                <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs">
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="rounded-lg border bg-card p-6">
        {activeTab === 'overview' ? (
          renderOverview()
        ) : (
          activeTabData && activeTabData.data && renderDataTable(activeTabData.data, activeTabData.name)
        )}
      </div>
    </div>
  );
};

export default Profile;
