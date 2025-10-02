import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { 
  Home, 
  MapPin, 
  Calendar, 
  DollarSign, 
  Ruler, 
  Hammer,
  FileText,
  TrendingUp,
  Eye,
  Trees,
  AlertCircle,
  CheckCircle,
  XCircle
} from 'lucide-react';

// Import the interfaces and example data
interface ParcelData {
  parcel: string;
  name: string;
  siteAddress: string;
  residentialArea: string;
  propertyName?: string;
  jurisdiction: string;
  levyCode: string;
  propertyType: string;
  platBlock?: string;
  platLot?: string;
  quarterSectionTownshipRange: string;
  legalDescription: {
    subdivision: string;
    platBlock?: string;
    platLot?: string;
  };
}

interface LandData {
  highestBestUseVacant: string;
  highestBestUseImproved: string;
  presentUse: string;
  landSqFt: number;
  acres: number;
  percentageUnusable?: number;
  unbuildable: boolean;
  restrictiveSizeShape: boolean;
  zoning: string;
  water: string;
  sewerSeptic: string;
  roadAccess: string;
  parking: string;
  streetSurface: string;
  views: {
    waterfront: boolean;
    rainier: boolean;
    territorial: boolean;
    olympics: boolean;
    cascades: boolean;
    seattleSkyline: boolean;
    pugetSound: boolean;
    lakeWashington: boolean;
    lakeSammamish: boolean;
    lakeRiverCreek: boolean;
    other: boolean;
  };
  waterfrontLocation?: string;
  waterfrontFootage: number;
  lotDepthFactor: number;
  waterfrontBank?: string;
  tideShore?: string;
  waterfrontRestrictedAccess?: string;
  waterfrontAccessRights: boolean;
  poorQuality: boolean;
  proximityInfluence: boolean;
  designations: {
    nuisances: boolean;
    historicSite: boolean;
    currentUse?: string;
    nbrBldgSites?: number;
    adjacentToGolfFairway: boolean;
    adjacentToGreenbelt: boolean;
    otherDesignation: boolean;
    deedRestrictions: boolean;
    developmentRightsPurchased: boolean;
    easements: boolean;
    nativeGrowthProtectionEasement: boolean;
    dnrLease: boolean;
  };
  topography?: string;
  trafficNoise?: string;
  airportNoise?: string;
  powerLines: boolean;
  otherNuisances: boolean;
  problems: {
    waterProblems: boolean;
    transportationConcurrency: boolean;
    otherProblems: boolean;
  };
  environmental: {
    environmental: boolean;
  };
}

interface Building {
  buildingNumber: number;
  yearBuilt: number;
  yearRenovated?: number;
  stories: number;
  livingUnits: number;
  grade: string;
  gradeVariant: number;
  condition: string;
  basementGrade?: string;
  firstFloor: number;
  halfFloor: number;
  secondFloor: number;
  upperFloor: number;
  finishedBasement: number;
  totalFinishedArea: number;
  totalBasement: number;
  basementGarage: number;
  unfinishedHalf: number;
  unfinishedFull: number;
  agla: number;
  attachedGarage: number;
  bedrooms: number;
  fullBaths: number;
  threeQuarterBaths: number;
  halfBaths: number;
  heatSource: string;
  heatSystem: string;
  deckAreaSqFt: number;
  openPorchSqFt: number;
  enclosedPorchSqFt: number;
  brickStone: number;
  fireplacesSingleStory: number;
  fireplacesMultiStory: number;
  fireplacesFreeStanding: number;
  fireplacesAdditional: number;
  additionalCost: number;
  obsolescence: number;
  netCondition: number;
  percentageComplete: number;
  daylightBasement?: string;
  viewUtilization?: string;
}

interface TaxRollHistory {
  account: string;
  valuedYear: number;
  taxYear: number;
  omitYear?: string;
  levyCode: string;
  appraisedLandValue: number;
  appraisedImpsValue: number;
  appraisedTotalValue: number;
  newDollars: number;
  taxableLandValue: number;
  taxableImpsValue: number;
  taxableTotalValue: number;
  taxValueReason?: string;
}

interface SalesHistory {
  exciseNumber: string;
  recordingNumber: string;
  documentDate: string;
  salePrice: number;
  sellerName: string;
  buyerName: string;
  instrument: string;
  saleReason: string;
}

interface ReviewHistory {
  taxYear: number;
  reviewNumber: string;
  reviewType: string;
  appealedValue: number;
  hearingDate: string;
  settlementValue: number;
  decision: string;
  status: string;
}

interface PermitHistory {
  permitNumber: string;
  permitDescription: string;
  type: string;
  issueDate: string;
  permitValue: number;
  issuingJurisdiction: string;
  reviewedDate?: string;
}

interface KingCountyProperty {
  parcelData: ParcelData;
  landData: LandData;
  buildings: Building[];
  taxRollHistory: TaxRollHistory[];
  salesHistory: SalesHistory[];
  reviewHistory: ReviewHistory[];
  permitHistory: PermitHistory[];
  homeImprovementExemption?: any;
  noticeMailingDate?: string;
  lastUpdated?: string;
}

interface PropertyAssessmentDisplayProps {
  property: KingCountyProperty;
}

const PropertyAssessmentDisplay: React.FC<PropertyAssessmentDisplayProps> = ({ property }) => {
  const { parcelData, landData, buildings, taxRollHistory, salesHistory, reviewHistory, permitHistory } = property;

  // Helper to format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(amount);
  };

  // Helper to get active views
  const getActiveViews = () => {
    return Object.entries(landData.views)
      .filter(([_, value]) => value)
      .map(([key, _]) => key.replace(/([A-Z])/g, ' $1').trim().replace(/^./, str => str.toUpperCase()));
  };

  // Helper to check if any waterfront data exists
  const hasWaterfrontData = () => {
    return landData.waterfrontLocation || landData.waterfrontFootage > 0 || 
           landData.waterfrontBank || landData.tideShore || 
           landData.waterfrontRestrictedAccess || landData.waterfrontAccessRights;
  };

  // Helper to check if there are any land problems
  const hasLandProblems = () => {
    return landData.problems.waterProblems || 
           landData.problems.transportationConcurrency || 
           landData.problems.otherProblems ||
           landData.environmental.environmental;
  };

  // Helper to count total fireplaces
  const getTotalFireplaces = (building: Building) => {
    return building.fireplacesSingleStory + building.fireplacesMultiStory + 
           building.fireplacesFreeStanding + building.fireplacesAdditional;
  };

  const activeViews = getActiveViews();

  return (
    <div className="h-full overflow-auto bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white shadow-lg">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">{parcelData.siteAddress}</h1>
              <p className="text-blue-100 text-lg mb-4">Parcel #{parcelData.parcel}</p>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2 bg-white/20 px-3 py-1.5 rounded-lg">
                  <MapPin className="h-4 w-4" />
                  <span>{parcelData.jurisdiction}</span>
                </div>
                <div className="flex items-center gap-2 bg-white/20 px-3 py-1.5 rounded-lg">
                  <Home className="h-4 w-4" />
                  <span>Zoning: {landData.zoning}</span>
                </div>
                <div className="flex items-center gap-2 bg-white/20 px-3 py-1.5 rounded-lg">
                  <FileText className="h-4 w-4" />
                  <span>Owner: {parcelData.name}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Value</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-green-600" />
                <p className="text-2xl font-bold">{formatCurrency(taxRollHistory[0]?.appraisedTotalValue || 0)}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Lot Size</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Ruler className="h-5 w-5 text-blue-600" />
                <p className="text-2xl font-bold">{landData.landSqFt.toLocaleString()} sq ft</p>
              </div>
              <p className="text-sm text-muted-foreground mt-1">{landData.acres} acres</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Building Area</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Home className="h-5 w-5 text-purple-600" />
                <p className="text-2xl font-bold">{buildings[0]?.totalFinishedArea.toLocaleString() || 0} sq ft</p>
              </div>
              <p className="text-sm text-muted-foreground mt-1">{buildings[0]?.bedrooms || 0} bed, {buildings[0]?.fullBaths || 0} bath</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Year Built</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-orange-600" />
                <p className="text-2xl font-bold">{buildings[0]?.yearBuilt || 'N/A'}</p>
              </div>
              <p className="text-sm text-muted-foreground mt-1">{buildings[0]?.condition || 'N/A'} condition</p>
            </CardContent>
          </Card>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Property Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Property Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground mb-2">Legal Description</h4>
                  <p className="text-sm">{parcelData.legalDescription.subdivision}</p>
                  {parcelData.legalDescription.platLot && (
                    <p className="text-sm text-muted-foreground">Lot {parcelData.legalDescription.platLot}</p>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Property Type:</span>
                    <p className="font-medium">{parcelData.propertyType}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Levy Code:</span>
                    <p className="font-medium">{parcelData.levyCode}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Township Range:</span>
                    <p className="font-medium">{parcelData.quarterSectionTownshipRange}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Residential Area:</span>
                    <p className="font-medium text-xs">{parcelData.residentialArea}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Land Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trees className="h-5 w-5 text-green-600" />
                  Land Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Present Use:</span>
                    <p className="font-medium">{landData.presentUse}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Best Use:</span>
                    <p className="font-medium">{landData.highestBestUseImproved}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Water:</span>
                    <p className="font-medium">{landData.water}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Sewer:</span>
                    <p className="font-medium">{landData.sewerSeptic}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Road Access:</span>
                    <p className="font-medium">{landData.roadAccess}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Parking:</span>
                    <p className="font-medium">{landData.parking}</p>
                  </div>
                </div>

                {activeViews.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Eye className="h-4 w-4 text-blue-600" />
                      <span className="font-semibold text-sm">Views:</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {activeViews.map(view => (
                        <span key={view} className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 rounded-md text-xs">
                          {view}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Additional Land Details */}
                <div className="grid grid-cols-2 gap-4 text-sm pt-2 border-t border-border">
                  <div>
                    <span className="text-muted-foreground">Street Surface:</span>
                    <p className="font-medium">{landData.streetSurface}</p>
                  </div>
                  {landData.percentageUnusable !== undefined && landData.percentageUnusable > 0 && (
                    <div>
                      <span className="text-muted-foreground">Unusable %:</span>
                      <p className="font-medium">{landData.percentageUnusable}%</p>
                    </div>
                  )}
                  {landData.topography && (
                    <div>
                      <span className="text-muted-foreground">Topography:</span>
                      <p className="font-medium">{landData.topography}</p>
                    </div>
                  )}
                  {landData.lotDepthFactor > 0 && (
                    <div>
                      <span className="text-muted-foreground">Lot Depth Factor:</span>
                      <p className="font-medium">{landData.lotDepthFactor}</p>
                    </div>
                  )}
                </div>

                {/* Designations & Issues */}
                <div className="pt-2 border-t border-border">
                  <h4 className="font-semibold text-sm mb-2">Land Status & Buildability</h4>
                  <div className="space-y-2">
                    {landData.unbuildable && (
                      <div className="flex items-center gap-2 text-red-600">
                        <XCircle className="h-4 w-4" />
                        <span className="text-sm">Unbuildable</span>
                      </div>
                    )}
                    {landData.restrictiveSizeShape && (
                      <div className="flex items-center gap-2 text-yellow-600">
                        <AlertCircle className="h-4 w-4" />
                        <span className="text-sm">Restrictive Size/Shape</span>
                      </div>
                    )}
                    {landData.poorQuality && (
                      <div className="flex items-center gap-2 text-orange-600">
                        <AlertCircle className="h-4 w-4" />
                        <span className="text-sm">Poor Quality Land</span>
                      </div>
                    )}
                    {landData.proximityInfluence && (
                      <div className="flex items-center gap-2 text-yellow-600">
                        <AlertCircle className="h-4 w-4" />
                        <span className="text-sm">Proximity Influence</span>
                      </div>
                    )}
                    {landData.designations.historicSite && (
                      <div className="flex items-center gap-2 text-blue-600">
                        <CheckCircle className="h-4 w-4" />
                        <span className="text-sm">Historic Site</span>
                      </div>
                    )}
                    {landData.designations.easements && (
                      <div className="flex items-center gap-2 text-orange-600">
                        <AlertCircle className="h-4 w-4" />
                        <span className="text-sm">Has Easements</span>
                      </div>
                    )}
                    {landData.designations.nativeGrowthProtectionEasement && (
                      <div className="flex items-center gap-2 text-green-600">
                        <CheckCircle className="h-4 w-4" />
                        <span className="text-sm">Native Growth Protection Easement</span>
                      </div>
                    )}
                    {landData.designations.deedRestrictions && (
                      <div className="flex items-center gap-2 text-orange-600">
                        <AlertCircle className="h-4 w-4" />
                        <span className="text-sm">Deed Restrictions</span>
                      </div>
                    )}
                    {landData.designations.developmentRightsPurchased && (
                      <div className="flex items-center gap-2 text-blue-600">
                        <CheckCircle className="h-4 w-4" />
                        <span className="text-sm">Development Rights Purchased</span>
                      </div>
                    )}
                    {landData.designations.dnrLease && (
                      <div className="flex items-center gap-2 text-blue-600">
                        <CheckCircle className="h-4 w-4" />
                        <span className="text-sm">DNR Lease</span>
                      </div>
                    )}
                    {landData.designations.adjacentToGolfFairway && (
                      <div className="flex items-center gap-2 text-green-600">
                        <CheckCircle className="h-4 w-4" />
                        <span className="text-sm">Adjacent to Golf Fairway</span>
                      </div>
                    )}
                    {landData.designations.adjacentToGreenbelt && (
                      <div className="flex items-center gap-2 text-green-600">
                        <CheckCircle className="h-4 w-4" />
                        <span className="text-sm">Adjacent to Greenbelt</span>
                      </div>
                    )}
                    {landData.designations.nuisances && (
                      <div className="flex items-center gap-2 text-red-600">
                        <AlertCircle className="h-4 w-4" />
                        <span className="text-sm">Nuisances Present</span>
                      </div>
                    )}
                    {landData.designations.otherDesignation && (
                      <div className="flex items-center gap-2 text-gray-600">
                        <AlertCircle className="h-4 w-4" />
                        <span className="text-sm">Other Designation</span>
                      </div>
                    )}
                    {!landData.unbuildable && !landData.restrictiveSizeShape && !landData.poorQuality && (
                      <div className="flex items-center gap-2 text-green-600">
                        <CheckCircle className="h-4 w-4" />
                        <span className="text-sm">Buildable, No Major Restrictions</span>
                      </div>
                    )}
                  </div>
                  
                  {landData.designations.currentUse && (
                    <div className="mt-2 text-sm">
                      <span className="text-muted-foreground">Current Use Designation: </span>
                      <span className="font-medium">{landData.designations.currentUse}</span>
                    </div>
                  )}
                  {landData.designations.nbrBldgSites !== undefined && landData.designations.nbrBldgSites > 0 && (
                    <div className="mt-1 text-sm">
                      <span className="text-muted-foreground">Number of Building Sites: </span>
                      <span className="font-medium">{landData.designations.nbrBldgSites}</span>
                    </div>
                  )}
                </div>

                {/* Nuisances & Noise */}
                {(landData.trafficNoise || landData.airportNoise || landData.powerLines || landData.otherNuisances) && (
                  <div className="pt-2 border-t border-border">
                    <h4 className="font-semibold text-sm mb-2">Nuisances & Environmental Factors</h4>
                    <div className="space-y-2">
                      {landData.trafficNoise && (
                        <div className="flex items-center gap-2 text-orange-600">
                          <AlertCircle className="h-4 w-4" />
                          <span className="text-sm">Traffic Noise: {landData.trafficNoise}</span>
                        </div>
                      )}
                      {landData.airportNoise && (
                        <div className="flex items-center gap-2 text-orange-600">
                          <AlertCircle className="h-4 w-4" />
                          <span className="text-sm">Airport Noise: {landData.airportNoise}</span>
                        </div>
                      )}
                      {landData.powerLines && (
                        <div className="flex items-center gap-2 text-yellow-600">
                          <AlertCircle className="h-4 w-4" />
                          <span className="text-sm">Power Lines Present</span>
                        </div>
                      )}
                      {landData.otherNuisances && (
                        <div className="flex items-center gap-2 text-yellow-600">
                          <AlertCircle className="h-4 w-4" />
                          <span className="text-sm">Other Nuisances Present</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Land Problems */}
                {hasLandProblems() && (
                  <div className="pt-2 border-t border-border">
                    <h4 className="font-semibold text-sm mb-2 text-red-600">Land Problems & Concerns</h4>
                    <div className="space-y-2">
                      {landData.problems.waterProblems && (
                        <div className="flex items-center gap-2 text-red-600">
                          <XCircle className="h-4 w-4" />
                          <span className="text-sm">Water Problems</span>
                        </div>
                      )}
                      {landData.problems.transportationConcurrency && (
                        <div className="flex items-center gap-2 text-red-600">
                          <XCircle className="h-4 w-4" />
                          <span className="text-sm">Transportation Concurrency Issues</span>
                        </div>
                      )}
                      {landData.problems.otherProblems && (
                        <div className="flex items-center gap-2 text-red-600">
                          <XCircle className="h-4 w-4" />
                          <span className="text-sm">Other Problems</span>
                        </div>
                      )}
                      {landData.environmental.environmental && (
                        <div className="flex items-center gap-2 text-red-600">
                          <XCircle className="h-4 w-4" />
                          <span className="text-sm">Environmental Concerns</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Waterfront Information */}
            {hasWaterfrontData() && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="h-5 w-5 text-blue-600" />
                    Waterfront Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    {landData.waterfrontLocation && (
                      <div>
                        <span className="text-muted-foreground">Location:</span>
                        <p className="font-medium">{landData.waterfrontLocation}</p>
                      </div>
                    )}
                    {landData.waterfrontFootage > 0 && (
                      <div>
                        <span className="text-muted-foreground">Footage:</span>
                        <p className="font-medium">{landData.waterfrontFootage} ft</p>
                      </div>
                    )}
                    {landData.waterfrontBank && (
                      <div>
                        <span className="text-muted-foreground">Bank Type:</span>
                        <p className="font-medium">{landData.waterfrontBank}</p>
                      </div>
                    )}
                    {landData.tideShore && (
                      <div>
                        <span className="text-muted-foreground">Tide/Shore:</span>
                        <p className="font-medium">{landData.tideShore}</p>
                      </div>
                    )}
                    {landData.waterfrontRestrictedAccess && (
                      <div className="col-span-2">
                        <span className="text-muted-foreground">Restricted Access:</span>
                        <p className="font-medium">{landData.waterfrontRestrictedAccess}</p>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {landData.waterfrontAccessRights ? (
                      <>
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm font-medium text-green-600">Waterfront Access Rights</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="h-4 w-4 text-red-600" />
                        <span className="text-sm font-medium text-red-600">No Waterfront Access Rights</span>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Building Details */}
            {buildings.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Home className="h-5 w-5 text-purple-600" />
                    Building Details
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {buildings.map((building, idx) => (
                    <div key={idx} className="space-y-4">
                      {idx > 0 && <div className="border-t border-border pt-4" />}
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-base">Building #{building.buildingNumber}</h4>
                        <span className="text-sm text-muted-foreground">{building.livingUnits} living unit{building.livingUnits !== 1 ? 's' : ''}</span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Year Built:</span>
                          <p className="font-medium">{building.yearBuilt}</p>
                        </div>
                        {building.yearRenovated && (
                          <div>
                            <span className="text-muted-foreground">Year Renovated:</span>
                            <p className="font-medium">{building.yearRenovated}</p>
                          </div>
                        )}
                        <div>
                          <span className="text-muted-foreground">Stories:</span>
                          <p className="font-medium">{building.stories}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Grade:</span>
                          <p className="font-medium">{building.grade} {building.gradeVariant !== 0 && `(Variant: ${building.gradeVariant})`}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Condition:</span>
                          <p className="font-medium">{building.condition}</p>
                        </div>
                        {building.basementGrade && (
                          <div>
                            <span className="text-muted-foreground">Basement Grade:</span>
                            <p className="font-medium">{building.basementGrade}</p>
                          </div>
                        )}
                        <div>
                          <span className="text-muted-foreground">Bedrooms:</span>
                          <p className="font-medium">{building.bedrooms}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Bathrooms:</span>
                          <p className="font-medium">
                            {building.fullBaths} full, {building.threeQuarterBaths} 3/4, {building.halfBaths} half
                          </p>
                        </div>
                        {building.percentageComplete > 0 && building.percentageComplete < 100 && (
                          <div className="col-span-2">
                            <span className="text-muted-foreground">Completion:</span>
                            <p className="font-medium text-orange-600">{building.percentageComplete}% Complete</p>
                          </div>
                        )}
                      </div>

                      <div>
                        <h4 className="font-semibold text-sm mb-2">Square Footage Breakdown</h4>
                        <div className="space-y-2 text-sm">
                          <div className="grid grid-cols-2 gap-2">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">1st Floor:</span>
                              <span className="font-medium">{building.firstFloor.toLocaleString()} sq ft</span>
                            </div>
                            {building.halfFloor > 0 && (
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Half Floor:</span>
                                <span className="font-medium">{building.halfFloor.toLocaleString()} sq ft</span>
                              </div>
                            )}
                            {building.secondFloor > 0 && (
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">2nd Floor:</span>
                                <span className="font-medium">{building.secondFloor.toLocaleString()} sq ft</span>
                              </div>
                            )}
                            {building.upperFloor > 0 && (
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Upper Floor:</span>
                                <span className="font-medium">{building.upperFloor.toLocaleString()} sq ft</span>
                              </div>
                            )}
                          </div>
                          
                          {(building.finishedBasement > 0 || building.totalBasement > 0) && (
                            <div className="pt-2 border-t border-border">
                              <p className="text-xs font-semibold text-muted-foreground mb-1">Basement</p>
                              <div className="grid grid-cols-2 gap-2">
                                {building.finishedBasement > 0 && (
                                  <div className="flex justify-between">
                                    <span className="text-muted-foreground">Finished:</span>
                                    <span className="font-medium">{building.finishedBasement.toLocaleString()} sq ft</span>
                                  </div>
                                )}
                                {building.totalBasement > 0 && (
                                  <div className="flex justify-between">
                                    <span className="text-muted-foreground">Total Basement:</span>
                                    <span className="font-medium">{building.totalBasement.toLocaleString()} sq ft</span>
                                  </div>
                                )}
                                {building.daylightBasement && (
                                  <div className="col-span-2 flex justify-between">
                                    <span className="text-muted-foreground">Type:</span>
                                    <span className="font-medium">{building.daylightBasement}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}

                          {(building.unfinishedHalf > 0 || building.unfinishedFull > 0) && (
                            <div className="pt-2 border-t border-border">
                              <p className="text-xs font-semibold text-muted-foreground mb-1">Unfinished</p>
                              <div className="grid grid-cols-2 gap-2">
                                {building.unfinishedHalf > 0 && (
                                  <div className="flex justify-between">
                                    <span className="text-muted-foreground">Half Story:</span>
                                    <span className="font-medium">{building.unfinishedHalf.toLocaleString()} sq ft</span>
                                  </div>
                                )}
                                {building.unfinishedFull > 0 && (
                                  <div className="flex justify-between">
                                    <span className="text-muted-foreground">Full Story:</span>
                                    <span className="font-medium">{building.unfinishedFull.toLocaleString()} sq ft</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}

                          <div className="pt-2 border-t border-border">
                            <div className="flex justify-between font-semibold">
                              <span>Total Finished Area:</span>
                              <span className="text-lg">{building.totalFinishedArea.toLocaleString()} sq ft</span>
                            </div>
                            {building.agla > 0 && building.agla !== building.totalFinishedArea && (
                              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                                <span>AGLA (Adjusted Gross Living Area):</span>
                                <span>{building.agla.toLocaleString()} sq ft</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {(building.deckAreaSqFt > 0 || building.openPorchSqFt > 0 || building.enclosedPorchSqFt > 0) && (
                        <div>
                          <h4 className="font-semibold text-sm mb-2">Outdoor Features</h4>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            {building.deckAreaSqFt > 0 && (
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Deck:</span>
                                <span className="font-medium">{building.deckAreaSqFt} sq ft</span>
                              </div>
                            )}
                            {building.openPorchSqFt > 0 && (
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Open Porch:</span>
                                <span className="font-medium">{building.openPorchSqFt} sq ft</span>
                              </div>
                            )}
                            {building.enclosedPorchSqFt > 0 && (
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Enclosed Porch:</span>
                                <span className="font-medium">{building.enclosedPorchSqFt} sq ft</span>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Garage Information */}
                      {(building.attachedGarage > 0 || building.basementGarage > 0) && (
                        <div>
                          <h4 className="font-semibold text-sm mb-2">Garage</h4>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            {building.attachedGarage > 0 && (
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Attached:</span>
                                <span className="font-medium">{building.attachedGarage} sq ft</span>
                              </div>
                            )}
                            {building.basementGarage > 0 && (
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Basement:</span>
                                <span className="font-medium">{building.basementGarage} sq ft</span>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Fireplace Information */}
                      {getTotalFireplaces(building) > 0 && (
                        <div>
                          <h4 className="font-semibold text-sm mb-2">Fireplaces ({getTotalFireplaces(building)} total)</h4>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            {building.fireplacesSingleStory > 0 && (
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Single Story:</span>
                                <span className="font-medium">{building.fireplacesSingleStory}</span>
                              </div>
                            )}
                            {building.fireplacesMultiStory > 0 && (
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Multi Story:</span>
                                <span className="font-medium">{building.fireplacesMultiStory}</span>
                              </div>
                            )}
                            {building.fireplacesFreeStanding > 0 && (
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Free Standing:</span>
                                <span className="font-medium">{building.fireplacesFreeStanding}</span>
                              </div>
                            )}
                            {building.fireplacesAdditional > 0 && (
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Additional:</span>
                                <span className="font-medium">{building.fireplacesAdditional}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Additional Building Features */}
                      {(building.brickStone > 0 || building.viewUtilization) && (
                        <div>
                          <h4 className="font-semibold text-sm mb-2">Additional Features</h4>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            {building.brickStone > 0 && (
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Brick/Stone:</span>
                                <span className="font-medium">{building.brickStone} sq ft</span>
                              </div>
                            )}
                            {building.viewUtilization && (
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">View Utilization:</span>
                                <span className="font-medium">{building.viewUtilization}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Valuation Adjustments */}
                      {(building.additionalCost !== 0 || building.obsolescence !== 0 || building.netCondition !== 0) && (
                        <div>
                          <h4 className="font-semibold text-sm mb-2">Valuation Adjustments</h4>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            {building.additionalCost !== 0 && (
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Additional Cost:</span>
                                <span className={`font-medium ${building.additionalCost > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                  {formatCurrency(building.additionalCost)}
                                </span>
                              </div>
                            )}
                            {building.obsolescence !== 0 && (
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Obsolescence:</span>
                                <span className={`font-medium ${building.obsolescence < 0 ? 'text-red-600' : ''}`}>
                                  {building.obsolescence}%
                                </span>
                              </div>
                            )}
                            {building.netCondition !== 0 && (
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Net Condition:</span>
                                <span className="font-medium">{building.netCondition}%</span>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      <div>
                        <h4 className="font-semibold text-sm mb-2">Systems</h4>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <span className="text-muted-foreground">Heat Source:</span>
                            <p className="font-medium">{building.heatSource}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Heat System:</span>
                            <p className="font-medium">{building.heatSystem}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Tax Assessment History */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  Tax Assessment History
                </CardTitle>
                <CardDescription>Recent property valuations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {taxRollHistory.slice(0, 5).map((tax, idx) => (
                    <div key={idx} className="border-l-4 border-primary pl-4 py-2">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-semibold">Tax Year {tax.taxYear}</p>
                          <p className="text-xs text-muted-foreground">
                            Valued {tax.valuedYear}
                            {tax.omitYear && ` • Omit: ${tax.omitYear}`}
                          </p>
                        </div>
                        <p className="font-bold text-lg">{formatCurrency(tax.appraisedTotalValue)}</p>
                      </div>
                      <div className="space-y-2">
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div>
                            <span className="text-muted-foreground">Appraised Land:</span>
                            <p className="font-medium">{formatCurrency(tax.appraisedLandValue)}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Appraised Imps:</span>
                            <p className="font-medium">{formatCurrency(tax.appraisedImpsValue)}</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs pt-1 border-t border-border">
                          <div>
                            <span className="text-muted-foreground">Taxable Land:</span>
                            <p className="font-medium">{formatCurrency(tax.taxableLandValue)}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Taxable Imps:</span>
                            <p className="font-medium">{formatCurrency(tax.taxableImpsValue)}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Taxable Total:</span>
                            <p className="font-medium">{formatCurrency(tax.taxableTotalValue)}</p>
                          </div>
                          {tax.newDollars > 0 && (
                            <div>
                              <span className="text-muted-foreground">New Dollars:</span>
                              <p className="font-medium text-green-600">{formatCurrency(tax.newDollars)}</p>
                            </div>
                          )}
                        </div>
                        {tax.taxValueReason && (
                          <div className="text-xs pt-1">
                            <span className="text-muted-foreground">Reason: </span>
                            <span className="font-medium">{tax.taxValueReason}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Sales History */}
            {salesHistory.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-green-600" />
                    Sales History
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {salesHistory.map((sale, idx) => (
                      <div key={idx} className="border-l-4 border-green-500 pl-4 py-2">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="font-semibold">{sale.documentDate}</p>
                            <p className="text-xs text-muted-foreground">{sale.instrument}</p>
                          </div>
                          <p className="font-bold text-lg text-green-600">{formatCurrency(sale.salePrice)}</p>
                        </div>
                        <div className="text-sm space-y-1">
                          <div>
                            <span className="text-muted-foreground">Seller:</span>
                            <p className="font-medium text-xs">{sale.sellerName}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Buyer:</span>
                            <p className="font-medium text-xs">{sale.buyerName}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Permit History */}
            {permitHistory.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Hammer className="h-5 w-5 text-orange-600" />
                    Permit History
                  </CardTitle>
                  <CardDescription>Recent construction and remodel permits</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {permitHistory.map((permit, idx) => (
                      <div key={idx} className="border-l-4 border-orange-500 pl-4 py-2">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex-1">
                            <p className="font-semibold text-sm">{permit.permitNumber}</p>
                            <div className="text-xs text-muted-foreground">
                              <p>Issued: {permit.issueDate}</p>
                              {permit.reviewedDate && <p>Reviewed: {permit.reviewedDate}</p>}
                            </div>
                          </div>
                          <span className="px-2 py-1 bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-200 rounded text-xs">
                            {permit.type}
                          </span>
                        </div>
                        <p className="text-sm mb-2">{permit.permitDescription}</p>
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">{permit.issuingJurisdiction}</span>
                          {permit.permitValue > 0 && (
                            <span className="font-medium">{formatCurrency(permit.permitValue)}</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Home Improvement Exemption */}
            {property.homeImprovementExemption && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Hammer className="h-5 w-5 text-blue-600" />
                    Home Improvement Exemption
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm">
                    <pre className="whitespace-pre-wrap font-mono text-xs bg-muted p-4 rounded-lg">
                      {JSON.stringify(property.homeImprovementExemption, null, 2)}
                    </pre>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Review History */}
            {reviewHistory.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-blue-600" />
                    Appeal History
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {reviewHistory.map((review, idx) => (
                      <div key={idx} className="border-l-4 border-blue-500 pl-4 py-2">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="font-semibold">Tax Year {review.taxYear}</p>
                            <p className="text-xs text-muted-foreground">{review.reviewType}</p>
                          </div>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            review.decision === 'SUSTAIN' 
                              ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200'
                              : 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200'
                          }`}>
                            {review.decision}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div>
                            <span className="text-muted-foreground">Appealed:</span>
                            <p className="font-medium">{formatCurrency(review.appealedValue)}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Settlement:</span>
                            <p className="font-medium">{formatCurrency(review.settlementValue)}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Footer */}
        {property.lastUpdated && (
          <Card>
            <CardContent className="py-4">
              <div className="flex justify-between items-center text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>Last Updated: {property.lastUpdated}</span>
                </div>
                {property.noticeMailingDate && (
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    <span>Notice Mailing Date: {property.noticeMailingDate}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default PropertyAssessmentDisplay;

