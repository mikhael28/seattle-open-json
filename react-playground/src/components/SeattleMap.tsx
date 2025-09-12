import React, { useEffect, useRef, useState } from 'react';
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

  useEffect(() => {
    if (!svgRef.current || !neighborhoods) return;

    const svg = select(svgRef.current);
    svg.selectAll("*").remove(); // Clear previous content

    const projection = geoAlbers()
      .rotate([122.3, 0]) // Seattle's longitude
      .center([0, 47.6]) // Seattle's latitude
      .scale(100000)
      .translate([width / 2, height / 2]);

    const path = geoPath().projection(projection);

    // Prepare markers from data sources
    const preparedMarkers: MarkerData[] = [];
    
    // Community Centers - use Latitude/Longitude if available
    communityCenters.forEach((center: any) => {
      if (center.Latitude && center.Longitude) {
        preparedMarkers.push({
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
        preparedMarkers.push({
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
            preparedMarkers.push({
              type: 'public-space',
              name: space.name || 'Public Space',
              coordinates: [lng, lat] as [number, number],
              data: space
            });
          }
        }
      }
    });

    // Note: Picnic sites don't seem to have coordinate data, so we'll skip them for now

    setMarkers(preparedMarkers);

    // Draw neighborhoods
    svg.selectAll(".neighborhood")
      .data(neighborhoods.features)
      .enter()
      .append("path")
      .attr("class", "neighborhood")
      .attr("d", path as any)
      .attr("fill", "#e8f4f8")
      .attr("stroke", "#2c5aa0")
      .attr("stroke-width", 1)
      .style("cursor", "pointer")
      .on("mouseover", function(this: any, event: any, d: any) {
        select(this).attr("fill", "#b8d4e3");
        
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
      })
      .on("mousemove", function(this: any, event: any) {
        if (tooltip) {
          setTooltip(prev => prev ? { ...prev, x: event.pageX, y: event.pageY } : null);
        }
      })
      .on("mouseout", function(this: any) {
        select(this).attr("fill", "#e8f4f8");
        setTooltip(null);
      });

    // Add markers
    const markerColors = {
      'community-center': '#ff6b6b',
      'picnic-site': '#4ecdc4',
      'mobile-rec': '#45b7d1',
      'public-space': '#96ceb4'
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
      .attr("r", 4)
      .attr("fill", (d: MarkerData) => markerColors[d.type])
      .attr("stroke", "white")
      .attr("stroke-width", 1)
      .style("cursor", "pointer")
      .on("mouseover", function(this: any, event: any, d: MarkerData) {
        select(this).attr("r", 6);
        
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
      })
      .on("mousemove", function(this: any, event: any) {
        if (tooltip) {
          setTooltip(prev => prev ? { ...prev, x: event.pageX, y: event.pageY } : null);
        }
      })
      .on("mouseout", function(this: any) {
        select(this).attr("r", 4);
        setTooltip(null);
      });

    // Add neighborhood labels
    svg.selectAll(".neighborhood-label")
      .data(neighborhoods.features)
      .enter()
      .append("text")
      .attr("class", "neighborhood-label")
      .attr("x", (d: any) => (path.centroid as any)(d)[0])
      .attr("y", (d: any) => (path.centroid as any)(d)[1])
      .attr("text-anchor", "middle")
      .attr("font-size", "10px")
      .attr("fill", "#2c5aa0")
      .style("pointer-events", "none")
      .text((d: any) => d.properties.name);

  }, [width, height, tooltip, neighborhoods]);

  return (
    <div className="seattle-map-container" style={{ position: 'relative' }}>
      <svg
        ref={svgRef}
        width={width}
        height={height}
        style={{ border: '1px solid #ccc', borderRadius: '8px' }}
      />
      
      {tooltip && (
        <div 
          className="map-tooltip"
          style={{
            position: 'fixed',
            left: tooltip.x + 10,
            top: tooltip.y - 10,
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            color: 'white',
            padding: '12px',
            borderRadius: '8px',
            fontSize: '14px',
            maxWidth: '300px',
            zIndex: 1000,
            pointerEvents: 'none',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
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
                      item.type === 'community-center' ? '#ff6b6b' :
                      item.type === 'picnic-site' ? '#4ecdc4' :
                      item.type === 'mobile-rec' ? '#45b7d1' : '#96ceb4',
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
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        padding: '12px',
        borderRadius: '8px',
        fontSize: '12px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>Legend</div>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
          <span style={{ width: '12px', height: '12px', backgroundColor: '#ff6b6b', borderRadius: '50%', marginRight: '8px' }} />
          Community Centers ({markers.filter(m => m.type === 'community-center').length})
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
          <span style={{ width: '12px', height: '12px', backgroundColor: '#45b7d1', borderRadius: '50%', marginRight: '8px' }} />
          Mobile Recreation ({markers.filter(m => m.type === 'mobile-rec').length})
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ width: '12px', height: '12px', backgroundColor: '#96ceb4', borderRadius: '50%', marginRight: '8px' }} />
          Public Spaces ({markers.filter(m => m.type === 'public-space').length})
        </div>
      </div>
    </div>
  );
};

export default SeattleMap;