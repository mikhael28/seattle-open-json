import { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { select } from 'd3-selection';
import { geoAlbers, geoPath, geoContains } from 'd3-geo';
import type { CivicEntity } from 'seattle-open-json';

interface SCSMapProps {
  entities: CivicEntity[];
  width?: number;
  height?: number;
}

interface TooltipData {
  name: string;
  entities: CivicEntity[];
  x: number;
  y: number;
}

interface MarkerData {
  entity: CivicEntity;
  coordinates: [number, number];
}

const getTypeColor = (type: string): string => {
  const colorMap: { [key: string]: string } = {
    'Farmers Market': '#f59e0b',
    'Community Center': '#ef4444',
    'P-Patch': '#10b981',
    'P-Patch Community Garden': '#10b981',
    'Picnic Site': '#14b8a6',
    'Public Space': '#8b5cf6',
    'Privately-Owned Public Space': '#8b5cf6',
    'Mobile Recreation': '#3b82f6',
    'Mobile Recreation Program': '#3b82f6',
    'Youth Program': '#ec4899',
    'Parks Activity': '#06b6d4',
    'Parks & Recreation Activity': '#06b6d4',
    'Resource Guide': '#6366f1',
    'Community Resource': '#6366f1',
  };

  const color = colorMap[type];
  if (!color) {
    console.warn('No color mapping for type:', type);
  }
  return color || '#6b7280';
};

const getTypeHoverColor = (type: string): string => {
  const colorMap: { [key: string]: string } = {
    'Farmers Market': '#d97706',
    'Community Center': '#dc2626',
    'P-Patch': '#059669',
    'P-Patch Community Garden': '#059669',
    'Picnic Site': '#0f766e',
    'Public Space': '#7c3aed',
    'Privately-Owned Public Space': '#7c3aed',
    'Mobile Recreation': '#1d4ed8',
    'Mobile Recreation Program': '#1d4ed8',
    'Youth Program': '#db2777',
    'Parks Activity': '#0891b2',
    'Parks & Recreation Activity': '#0891b2',
    'Resource Guide': '#4f46e5',
    'Community Resource': '#4f46e5',
  };
  return colorMap[type] || '#4b5563';
};

const SCSMap: React.FC<SCSMapProps> = ({ entities, width = 800, height = 600 }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [tooltip, setTooltip] = useState<TooltipData | null>(null);
  const [neighborhoods, setNeighborhoods] = useState<any>(null);

  // Filter Seattle-only neighborhoods
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

  // Prepare markers from SCS entities
  const markers = useMemo((): MarkerData[] => {
    const validMarkers: MarkerData[] = [];

    entities.forEach(entity => {
      // Skip if location is a string
      if (typeof entity.location === 'string') return;

      // Check if coordinates exist
      const coords = entity.location?.coordinates;
      if (!coords) return;

      // Validate coordinates
      const lat = coords.lat;
      const lng = coords.lng;

      if (typeof lat === 'number' && typeof lng === 'number' &&
          !isNaN(lat) && !isNaN(lng) &&
          lat !== 0 && lng !== 0) {
        validMarkers.push({
          entity,
          coordinates: [lng, lat] as [number, number]
        });
      }
    });

    console.log('SCS Map Debug:', {
      totalEntities: entities.length,
      validMarkers: validMarkers.length,
      sampleEntity: entities[0],
      sampleMarker: validMarkers[0],
      typeBreakdown: validMarkers.reduce((acc, m) => {
        acc[m.entity.type] = (acc[m.entity.type] || 0) + 1;
        return acc;
      }, {} as Record<string, number>)
    });

    return validMarkers;
  }, [entities]);

  // Get unique types and their counts
  const typeCounts = useMemo(() => {
    const counts = new Map<string, number>();
    markers.forEach(marker => {
      const type = marker.entity.type;
      counts.set(type, (counts.get(type) || 0) + 1);
    });
    return counts;
  }, [markers]);

  const handleTooltipMove = useCallback((event: any) => {
    setTooltip(prev => prev ? { ...prev, x: event.pageX, y: event.pageY } : null);
  }, []);

  const handleNeighborhoodHover = useCallback((event: any, d: any) => {
    const neighborhoodName = d.properties.name;
    const relevantEntities: CivicEntity[] = [];

    markers.forEach(marker => {
      try {
        if (geoContains(d, marker.coordinates)) {
          relevantEntities.push(marker.entity);
        }
      } catch (e) {
        // Skip markers that cause errors
      }
    });

    setTooltip({
      name: neighborhoodName,
      entities: relevantEntities,
      x: event.pageX,
      y: event.pageY
    });
  }, [markers]);

  const handleMarkerHover = useCallback((event: any, marker: MarkerData) => {
    setTooltip({
      name: marker.entity.name,
      entities: [marker.entity],
      x: event.pageX,
      y: event.pageY
    });
  }, []);

  useEffect(() => {
    if (!svgRef.current || !seattleOnlyNeighborhoods) return;

    const svg = select(svgRef.current);
    svg.selectAll("*").remove();

    const projection = geoAlbers()
      .rotate([122.3, 0])
      .center([0, 47.6])
      .scale(150000)
      .translate([width / 2, height / 2]);

    const path = geoPath().projection(projection);

    // Draw neighborhoods
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
      .on("mousemove", handleTooltipMove)
      .on("mouseout", function(this: any) {
        select(this)
          .attr("fill", "#f8fafc")
          .attr("stroke", "#e2e8f0")
          .attr("stroke-width", 1.5);
        setTooltip(null);
      });

    // Add markers
    svg.selectAll(".marker")
      .data(markers)
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
      .attr("fill", (d: MarkerData) => getTypeColor(d.entity.type))
      .attr("stroke", "white")
      .attr("stroke-width", 2)
      .style("cursor", "pointer")
      .style("filter", "drop-shadow(0 2px 4px rgba(0,0,0,0.1))")
      .style("transition", "all 0.3s ease")
      .on("mouseover", function(this: any, event: any, d: MarkerData) {
        select(this)
          .attr("r", 8)
          .attr("fill", getTypeHoverColor(d.entity.type))
          .style("filter", "drop-shadow(0 4px 8px rgba(0,0,0,0.2))");
        handleMarkerHover(event, d);
      })
      .on("mousemove", handleTooltipMove)
      .on("mouseout", function(this: any, d: MarkerData) {
        select(this)
          .attr("r", 5)
          .attr("fill", getTypeColor(d.entity.type))
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

  }, [width, height, seattleOnlyNeighborhoods, markers, handleNeighborhoodHover, handleMarkerHover, handleTooltipMove]);

  return (
    <div className="scs-map-container" style={{ position: 'relative' }}>
      <svg
        ref={svgRef}
        width={width}
        height={height}
        style={{
          border: '2px solid #e2e8f0',
          borderRadius: '12px',
          background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)'
        }}
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
          {tooltip.entities.length > 0 ? (
            <div>
              <div style={{ marginBottom: '6px', fontSize: '12px', opacity: 0.8 }}>
                {tooltip.entities.length} location{tooltip.entities.length !== 1 ? 's' : ''}:
              </div>
              {tooltip.entities.slice(0, 5).map((entity, index) => (
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
                    backgroundColor: getTypeColor(entity.type),
                    marginRight: '8px',
                    marginTop: '2px',
                    flexShrink: 0
                  }} />
                  <div>
                    <div style={{ fontWeight: '500' }}>{entity.name}</div>
                    <div style={{ fontSize: '11px', opacity: 0.8, marginTop: '1px' }}>
                      {entity.type}
                    </div>
                    {entity.description && (
                      <div style={{ fontSize: '11px', opacity: 0.7, marginTop: '2px', fontStyle: 'italic' }}>
                        {entity.description.length > 80
                          ? entity.description.substring(0, 80) + '...'
                          : entity.description}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {tooltip.entities.length > 5 && (
                <div style={{ fontSize: '12px', opacity: 0.7, marginTop: '4px' }}>
                  +{tooltip.entities.length - 5} more...
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
        backdropFilter: 'blur(8px)',
        maxHeight: height - 40,
        overflowY: 'auto'
      }}>
        <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>Legend</div>
        {Array.from(typeCounts.entries())
          .sort((a, b) => b[1] - a[1])
          .map(([type, count]) => (
            <div key={type} style={{ display: 'flex', alignItems: 'center', marginBottom: '6px' }}>
              <span style={{
                width: '14px',
                height: '14px',
                backgroundColor: getTypeColor(type),
                borderRadius: '50%',
                marginRight: '10px',
                boxShadow: `0 2px 4px ${getTypeColor(type)}40`
              }} />
              <span style={{ fontWeight: '500', color: '#1f2937', fontSize: '11px' }}>
                {type} ({count})
              </span>
            </div>
          ))}
      </div>
    </div>
  );
};

export default SCSMap;
