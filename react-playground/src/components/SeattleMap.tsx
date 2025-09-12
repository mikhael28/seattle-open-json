import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { select } from 'd3-selection';
import { geoAlbers, geoPath, geoContains } from 'd3-geo';

// Import data from the main data sources
import { communityCenters } from '../../../src/data/community-centers';
import { picnicSites } from '../../../src/data/picnic-sites';
import { mobileRecreationProgramming } from '../../../src/data/mobile-recreation-programming';
import { privatelyOwnedPublicSpaces } from '../../../src/data/privately-owned-public-spaces';

interface SeattleMapProps {
  width?: number;
  height?: number;
}

interface TooltipData {
  name: string;
  data: any[];
  x: number;
  y: number;
}

interface MarkerData {
  type: 'community-center' | 'picnic-site' | 'mobile-rec' | 'public-space';
  name: string;
  coordinates: [number, number];
  data: any;
}

const getTypeDescription = (type: string): string => {
  switch (type) {
    case 'community-center':
      return 'Community center offering youth programs and activities';
    case 'picnic-site':
      return 'Outdoor space for gatherings and recreation';
    case 'mobile-rec':
      return 'Mobile recreation programming location';
    case 'public-space':
      return 'Publicly accessible space for community use';
    default:
      return 'Youth resource location';
  }
};

const SeattleMap: React.FC<SeattleMapProps> = ({ width = 800, height = 600 }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [tooltip, setTooltip] = useState<TooltipData | null>(null);
  const [markers, setMarkers] = useState<MarkerData[]>([]);
  const [neighborhoods, setNeighborhoods] = useState<any>(null);

  // Filter out East King County cities to focus on Seattle
  const seattleOnlyNeighborhoods = useMemo(() => {
    if (!neighborhoods) return null;
    
    const eastKingCountyCities = [
      'Bellevue', 'Redmond', 'Kirkland', 'Issaquah', 'Mercer Island', 
      'Renton', 'Kent', 'Tukwila', 'Burien', 'Sammamish', 'Newcastle',
      'Woodinville', 'Bothell', 'Shoreline', 'Lake Forest Park'
    ];
    
    return {
      ...neighborhoods,
      features: neighborhoods.features.filter((feature: any) => {
        const city = feature.properties?.city;
        return city === 'Seattle' || !eastKingCountyCities.includes(city);
      })
    };
  }, [neighborhoods]);

  // Fetch neighborhoods GeoJSON data
  useEffect(() => {
    const fetchNeighborhoods = async () => {
      try {
        const response = await fetch('/data/neighborhoods.geojson');
        const data = await response.json();
        setNeighborhoods(data);
      } catch (error) {
        console.error('Error loading neighborhoods data:', error);
      }
    };
    
    fetchNeighborhoods();
  }, []);

  // Prepare markers from data sources - memoized to prevent recalculation
  const preparedMarkers = useMemo(() => {
    const markers: MarkerData[] = [];
    
    // Community Centers - use Latitude/Longitude if available
    communityCenters.forEach((center: any) => {
      if (center.Latitude && center.Longitude) {
        markers.push({
          type: 'community-center',
          name: center.name || 'Community Center',
          coordinates: [center.Longitude, center.Latitude] as [number, number],
          data: center
        });
      }
    });

    // Mobile Recreation Programming - use x/y coordinates and convert
    mobileRecreationProgramming.forEach((program: any) => {
      if (program.x && program.y) {
        // Convert state plane coordinates to lat/lng (approximate conversion for Washington State Plane)
        const lng = (program.x - 1271000) / 100000 * 0.1 - 122.3;
        const lat = (program.y - 200000) / 100000 * 0.1 + 47.6;
        markers.push({
          type: 'mobile-rec',
          name: program['Program Title'] || program.location || 'Mobile Recreation',
          coordinates: [lng, lat] as [number, number],
          data: program
        });
      }
    });

    // Privately Owned Public Spaces - parse Location field
    privatelyOwnedPublicSpaces.forEach((space: any) => {
      if (space.Location) {
        const match = space.Location.match(/\(([^,]+),\s*([^)]+)\)/);
        if (match) {
          const lat = parseFloat(match[1]);
          const lng = parseFloat(match[2]);
          if (!isNaN(lat) && !isNaN(lng)) {
            markers.push({
              type: 'public-space',
              name: space.name || 'Public Space',
              coordinates: [lng, lat] as [number, number],
              data: space
            });
          }
        }
      }
    });

    return markers;
  }, []); // Empty dependency array since the data sources are static

  useEffect(() => {
    setMarkers(preparedMarkers);
  }, [preparedMarkers]);

  // Optimize tooltip updates with callbacks
  const handleTooltipMove = useCallback((event: any) => {
    setTooltip(prev => prev ? { ...prev, x: event.pageX, y: event.pageY } : null);
  }, []);

  const handleNeighborhoodHover = useCallback((event: any, d: any) => {
    // Find relevant data for this neighborhood
    const neighborhoodName = d.properties.name;
    const relevantData: MarkerData[] = [];
    
    // Filter markers that are within this neighborhood bounds
    preparedMarkers.forEach(marker => {
      try {
        if (geoContains(d, marker.coordinates)) {
          relevantData.push(marker);
        }
      } catch (e) {
        // Skip markers that cause geoContains errors
      }
    });

    setTooltip({
      name: neighborhoodName,
      data: relevantData,
      x: event.pageX,
      y: event.pageY
    });
  }, [preparedMarkers]);

  const handleMarkerHover = useCallback((event: any, d: MarkerData) => {
    // Create enhanced marker data for tooltip
    const enhancedData = {
      ...d,
      name: d.data.name || d.data['Program Title'] || d.data.location || d.name,
      description: d.data.description || 
                  d.data.Benefit || 
                  getTypeDescription(d.type)
    };
    
    setTooltip({
      name: enhancedData.name,
      data: [enhancedData],
      x: event.pageX,
      y: event.pageY
    });
  }, []);

  useEffect(() => {
    if (!svgRef.current || !seattleOnlyNeighborhoods) return;

    const svg = select(svgRef.current);
    svg.selectAll("*").remove(); // Clear previous content

    const projection = geoAlbers()
      .rotate([122.3, 0]) // Seattle's longitude
      .center([0, 47.6]) // Seattle's latitude
      .scale(150000) // Increased scale to zoom in closer
      .translate([width / 2, height / 2]);

    const path = geoPath().projection(projection);

    // Draw neighborhoods with modern gradient colors
    svg.selectAll(".neighborhood")
      .data(seattleOnlyNeighborhoods.features)
      .enter()
      .append("path")
      .attr("class", "neighborhood")
      .attr("d", path as any)
      .attr("fill", "#f8fafc")
      .attr("stroke", "#e2e8f0")
      .attr("stroke-width", 1.5)
      .style("cursor", "pointer")
      .style("transition", "all 0.3s ease")
      .on("mouseover", function(this: any, event: any, d: any) {
        select(this)
          .attr("fill", "#e0f2fe")
          .attr("stroke", "#0ea5e9")
          .attr("stroke-width", 2);
        handleNeighborhoodHover(event, d);
      })
      .on("mousemove", function(this: any, event: any) {
        handleTooltipMove(event);
      })
      .on("mouseout", function(this: any) {
        select(this)
          .attr("fill", "#f8fafc")
          .attr("stroke", "#e2e8f0")
          .attr("stroke-width", 1.5);
        setTooltip(null);
      });

    // Add markers with modern colors
    const markerColors = {
      'community-center': '#ef4444', // Modern red
      'picnic-site': '#14b8a6',      // Modern teal
      'mobile-rec': '#3b82f6',       // Modern blue
      'public-space': '#10b981'      // Modern emerald
    };
    
    const markerHoverColors = {
      'community-center': '#dc2626',
      'picnic-site': '#0f766e',
      'mobile-rec': '#1d4ed8',
      'public-space': '#059669'
    };

    svg.selectAll(".marker")
      .data(preparedMarkers)
      .enter()
      .append("circle")
      .attr("class", "marker")
      .attr("cx", (d: MarkerData) => {
        const point = projection(d.coordinates);
        return point ? point[0] : 0;
      })
      .attr("cy", (d: MarkerData) => {
        const point = projection(d.coordinates);
        return point ? point[1] : 0;
      })
      .attr("r", 5)
      .attr("fill", (d: MarkerData) => markerColors[d.type])
      .attr("stroke", "white")
      .attr("stroke-width", 2)
      .style("cursor", "pointer")
      .style("filter", "drop-shadow(0 2px 4px rgba(0,0,0,0.1))")
      .style("transition", "all 0.3s ease")
      .on("mouseover", function(this: any, event: any, d: MarkerData) {
        select(this)
          .attr("r", 8)
          .attr("fill", markerHoverColors[d.type])
          .style("filter", "drop-shadow(0 4px 8px rgba(0,0,0,0.2))");
        handleMarkerHover(event, d);
      })
      .on("mousemove", function(this: any, event: any) {
        handleTooltipMove(event);
      })
      .on("mouseout", function(this: any, d: MarkerData) {
        select(this)
          .attr("r", 5)
          .attr("fill", markerColors[d.type])
          .style("filter", "drop-shadow(0 2px 4px rgba(0,0,0,0.1))");
        setTooltip(null);
      });

    // Add neighborhood labels
    svg.selectAll(".neighborhood-label")
      .data(seattleOnlyNeighborhoods.features)
      .enter()
      .append("text")
      .attr("class", "neighborhood-label")
      .attr("x", (d: any) => (path.centroid as any)(d)[0])
      .attr("y", (d: any) => (path.centroid as any)(d)[1])
      .attr("text-anchor", "middle")
      .attr("font-size", "11px")
      .attr("font-weight", "500")
      .attr("fill", "#475569")
      .style("pointer-events", "none")
      .style("text-shadow", "0 1px 2px rgba(255,255,255,0.8)")
      .text((d: any) => d.properties.name);

  }, [width, height, seattleOnlyNeighborhoods, preparedMarkers, handleNeighborhoodHover, handleMarkerHover, handleTooltipMove]);

  return (
    <div className="seattle-map-container" style={{ position: 'relative' }}>
      <svg
        ref={svgRef}
        width={width}
        height={height}
        style={{ border: '2px solid #e2e8f0', borderRadius: '12px', background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)' }}
      />
      
      {tooltip && (
        <div 
          className="map-tooltip"
          style={{
            position: 'fixed',
            left: tooltip.x + 10,
            top: tooltip.y - 10,
            backgroundColor: 'rgba(15, 23, 42, 0.95)',
            color: 'white',
            padding: '16px',
            borderRadius: '12px',
            fontSize: '14px',
            maxWidth: '320px',
            zIndex: 1000,
            pointerEvents: 'none',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(8px)'
          }}
        >
          <div style={{ fontWeight: 'bold', marginBottom: '8px', fontSize: '16px' }}>
            {tooltip.name}
          </div>
          {tooltip.data.length > 0 ? (
            <div>
              <div style={{ marginBottom: '6px', fontSize: '12px', opacity: 0.8 }}>
                {tooltip.data.length} location{tooltip.data.length !== 1 ? 's' : ''}:
              </div>
              {tooltip.data.slice(0, 5).map((item, index) => (
                <div key={index} style={{ 
                  marginBottom: '6px', 
                  fontSize: '13px',
                  display: 'flex',
                  alignItems: 'flex-start',
                  lineHeight: '1.3'
                }}>
                  <span style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: 
                      item.type === 'community-center' ? '#ef4444' :
                      item.type === 'picnic-site' ? '#14b8a6' :
                      item.type === 'mobile-rec' ? '#3b82f6' : '#10b981',
                    marginRight: '8px',
                    marginTop: '2px',
                    flexShrink: 0
                  }} />
                  <div>
                    <div style={{ fontWeight: '500' }}>{item.name}</div>
                    {item.data.Address && (
                      <div style={{ fontSize: '11px', opacity: 0.8, marginTop: '1px' }}>
                        📍 {item.data.Address}
        </div>
      )}
                    {item.description && (
                      <div style={{ fontSize: '11px', opacity: 0.7, marginTop: '2px', fontStyle: 'italic' }}>
                        {typeof item.description === 'string' ? item.description : getTypeDescription(item.type)}
        </div>
      )}
                  </div>
                </div>
              ))}
              {tooltip.data.length > 5 && (
                <div style={{ fontSize: '12px', opacity: 0.7, marginTop: '4px' }}>
                  +{tooltip.data.length - 5} more...
                </div>
              )}
            </div>
          ) : (
            <div style={{ fontSize: '12px', opacity: 0.7 }}>
              No locations in this area
          </div>
          )}
        </div>
      )}

      {/* Legend */}
      <div style={{
        position: 'absolute',
        top: '20px',
        right: '20px',
        backgroundColor: 'rgba(255, 255, 255, 0.98)',
        padding: '16px',
        borderRadius: '12px',
        fontSize: '12px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
        border: '1px solid rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(8px)'
      }}>
        <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>Legend</div>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '6px' }}>
          <span style={{ 
            width: '14px', 
            height: '14px', 
            backgroundColor: '#ef4444', 
            borderRadius: '50%', 
            marginRight: '10px',
            boxShadow: '0 2px 4px rgba(239, 68, 68, 0.3)'
          }} />
          <span style={{ fontWeight: '500', color: '#1f2937' }}>Community Centers ({markers.filter(m => m.type === 'community-center').length})</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '6px' }}>
          <span style={{ 
            width: '14px', 
            height: '14px', 
            backgroundColor: '#3b82f6', 
            borderRadius: '50%', 
            marginRight: '10px',
            boxShadow: '0 2px 4px rgba(59, 130, 246, 0.3)'
          }} />
          <span style={{ fontWeight: '500', color: '#1f2937' }}>Mobile Recreation ({markers.filter(m => m.type === 'mobile-rec').length})</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '6px' }}>
          <span style={{ 
            width: '14px', 
            height: '14px', 
            backgroundColor: '#10b981', 
            borderRadius: '50%', 
            marginRight: '10px',
            boxShadow: '0 2px 4px rgba(16, 185, 129, 0.3)'
          }} />
          <span style={{ fontWeight: '500', color: '#1f2937' }}>Public Spaces ({markers.filter(m => m.type === 'public-space').length})</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ 
            width: '14px', 
            height: '14px', 
            backgroundColor: '#14b8a6', 
            borderRadius: '50%', 
            marginRight: '10px',
            boxShadow: '0 2px 4px rgba(20, 184, 166, 0.3)'
          }} />
          <span style={{ fontWeight: '500', color: '#1f2937' }}>Picnic Sites ({markers.filter(m => m.type === 'picnic-site').length})</span>
        </div>
      </div>
    </div>
  );
};

export default SeattleMap;