import React, { useEffect, useState } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup
} from 'react-simple-maps';
import { Feature, Geometry, FeatureCollection } from 'geojson';

const SeattleMap: React.FC = () => {
  const [boundariesData, setBoundariesData] = useState<FeatureCollection | null>(null);
  const [selectedDataset, setSelectedDataset] = useState<string>('neighborhoods');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedFeature, setSelectedFeature] = useState<Feature<Geometry, any> | null>(null);

  // Seattle coordinates for map center (longitude, latitude for react-simple-maps)
  const seattleCenter: [number, number] = [-122.3321, 47.6062];

  useEffect(() => {
    const loadBoundaryData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Map dataset names to file names (only available ones for now)
        const datasetFileMap: { [key: string]: string } = {
          'neighborhoods': 'neighborhoods.geojson',
          'city-council-districts': 'city-council-districts.geojson',
          'zip-codes': 'zip-codes.geojson',
          'police-beats': 'spd-beats.geojson',
          'parks': 'seattle-parks-osm.geojson'
        };

        const fileName = datasetFileMap[selectedDataset];
        if (!fileName) {
          throw new Error(`Dataset ${selectedDataset} not available. Available datasets: ${Object.keys(datasetFileMap).join(', ')}`);
        }

        // Fetch the GeoJSON data from the public directory
        const response = await fetch(`/data/${fileName}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch ${fileName}: ${response.statusText}`);
        }

        const geoJsonData: FeatureCollection = await response.json();
        console.log('Loaded boundaries:', geoJsonData);
        setBoundariesData(geoJsonData);
      } catch (error) {
        console.error('Error loading boundary data:', error);
        setError(error instanceof Error ? error.message : 'Failed to load boundary data');
      } finally {
        setLoading(false);
      }
    };

    loadBoundaryData();
  }, [selectedDataset]);

  // Style function for GeoJSON features
  const getFeatureStyle = (feature?: Feature<Geometry, any>) => {
    const dataset = selectedDataset;
    
    // Different colors for different boundary types
    const colorMap: { [key: string]: string } = {
      neighborhoods: '#3388ff',
      'city-council-districts': '#ff7800',
      'census-tracts': '#00ff88',
      'zip-codes': '#ff0080',
      'police-beats': '#8000ff',
      'police-precincts': '#9000ff',
      'police-mcpp': '#7000ff',
      'school-districts-es': '#ff8800',
      'school-districts-ms': '#ff6600',
      'school-districts-hs': '#ff4400',
      'school-sites': '#ffaa00',
      parks: '#00ff00',
      'city-limits': '#ff0000',
      zoning: '#ffff00',
      ruv: '#00ffff'
    };

    return {
      default: {
        fill: colorMap[dataset] || '#3388ff',
        stroke: 'white',
        strokeWidth: 0.5,
        fillOpacity: 0.3,
        outline: 'none'
      },
      hover: {
        fill: colorMap[dataset] || '#3388ff',
        stroke: 'white',
        strokeWidth: 1,
        fillOpacity: 0.6,
        outline: 'none'
      }
    };
  };

  // Handle feature click
  const handleFeatureClick = (feature: Feature<Geometry, any>) => {
    setSelectedFeature(feature);
  };

  const availableDatasets = [
    { value: 'neighborhoods', label: 'Neighborhoods' },
    { value: 'city-council-districts', label: 'City Council Districts' },
    { value: 'zip-codes', label: 'ZIP Codes' },
    { value: 'police-beats', label: 'Police Beats' },
    { value: 'parks', label: 'Parks (OpenStreetMap)' }
  ];

  return (
    <div className="w-full h-full">
      {/* Dataset Selector */}
      <div className="mb-4 p-4 bg-card rounded-lg border">
        <label className="block text-sm font-medium text-foreground mb-2">
          Select Boundary Type:
        </label>
        <select
          value={selectedDataset}
          onChange={(e) => setSelectedDataset(e.target.value)}
          className="w-full p-2 border rounded-md bg-background text-foreground"
        >
          {availableDatasets.map((dataset) => (
            <option key={dataset.value} value={dataset.value}>
              {dataset.label}
            </option>
          ))}
        </select>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center h-64 bg-muted rounded-lg">
          <div className="text-muted-foreground">Loading Seattle boundaries...</div>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="flex items-center justify-center h-64 bg-destructive/10 rounded-lg border border-destructive/20">
          <div className="text-destructive text-center p-4">
            <p className="font-medium">Failed to load boundary data</p>
            <p className="text-sm mt-1">{error}</p>
          </div>
        </div>
      )}

      {/* Map Container */}
      {!loading && (
        <div className="h-96 w-full rounded-lg overflow-hidden border">
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{
              center: seattleCenter,
              scale: 50000
            }}
            style={{ height: '100%', width: '100%' }}
          >
            <ZoomableGroup zoom={1} center={seattleCenter}>
              {boundariesData && boundariesData.features && boundariesData.features.length > 0 && (
                <Geographies geography={boundariesData} key={selectedDataset}>
                  {({ geographies }: { geographies: any[] }) =>
                    geographies.map((geo: any) => {
                      const feature = geo as Feature<Geometry, any>;
                      const style = getFeatureStyle(feature);
                      
                      return (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          style={style}
                          onClick={() => handleFeatureClick(feature)}
                        />
                      );
                    })
                  }
                </Geographies>
              )}
            </ZoomableGroup>
          </ComposableMap>
        </div>
      )}

      {/* Selected Feature Info */}
      {selectedFeature && selectedFeature.properties && (
        <div className="mt-4 p-4 bg-card rounded-lg border">
          <h3 className="text-lg font-medium text-foreground mb-2">Feature Details</h3>
          <div className="space-y-1">
            {Object.entries(selectedFeature.properties)
              .filter(([key]) => key !== 'dataset')
              .map(([key, value]) => (
                <div key={key} className="flex justify-between text-sm">
                  <span className="font-medium text-foreground">{key}:</span>
                  <span className="text-muted-foreground">{String(value)}</span>
                </div>
              ))}
          </div>
          <button
            onClick={() => setSelectedFeature(null)}
            className="mt-3 px-3 py-1 text-xs bg-secondary text-secondary-foreground rounded hover:bg-secondary/80"
          >
            Clear Selection
          </button>
        </div>
      )}

      {/* Data Info */}
      {!loading && boundariesData && (
        <div className="mt-4 p-4 bg-muted/50 rounded-lg">
          <p className="text-sm text-muted-foreground">
            Displaying {boundariesData.features?.length || 0} boundary features for {selectedDataset}
            {selectedFeature ? ' • Click "Clear Selection" to deselect feature' : ' • Click on a feature to see details'}
          </p>
        </div>
      )}
    </div>
  );
};

export default SeattleMap;
