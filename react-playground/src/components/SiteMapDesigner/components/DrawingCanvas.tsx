// ============================================================================
// DRAWING CANVAS COMPONENT
// ============================================================================

import React, { useEffect, useState, useRef } from 'react';
import { DrawingElement, Point, PropertyConfig, DrawingTool } from '../types';
import { calculateDistance, pixelsToFeet } from '../geometry';

interface DrawingCanvasProps {
  svgRef: React.RefObject<SVGSVGElement>;
  propertyConfig: PropertyConfig;
  elements: DrawingElement[];
  selectedElementId: string | null;
  highlightedElementId: string | null;
  showGrid: boolean;
  showDimensions: boolean;
  selectedTool: DrawingTool;
  isDrawing: boolean;
  currentPoints: Point[];
  isDragging: boolean;
  backgroundImage?: string | null;
  onMouseDown: (e: React.MouseEvent<SVGSVGElement>) => void;
  onMouseMove: (e: React.MouseEvent<SVGSVGElement>) => void;
  onMouseUp: () => void;
  onElementClick: (id: string) => void;
  streetWidth: number;
  zoom: number;
  panX: number;
  panY: number;
  rotation: number;
  onZoomChange: (zoom: number) => void;
  onPanChange: (panX: number, panY: number) => void;
  containerWidth: number;
  containerHeight: number;
}

export const DrawingCanvas: React.FC<DrawingCanvasProps> = ({
  svgRef,
  propertyConfig,
  elements,
  selectedElementId,
  highlightedElementId,
  showGrid,
  showDimensions,
  selectedTool,
  isDrawing,
  currentPoints,
  isDragging,
  backgroundImage,
  onMouseDown,
  onMouseMove,
  onMouseUp,
  onElementClick,
  streetWidth,
  zoom,
  panX,
  panY,
  rotation,
  onZoomChange,
  onPanChange,
  containerWidth,
  containerHeight,
}) => {
  const canvasWidth = propertyConfig.width * propertyConfig.scale;
  const canvasHeight = propertyConfig.depth * propertyConfig.scale;
  const gridSize = 5 * propertyConfig.scale;
  const totalWidth = canvasWidth + streetWidth * 2;
  const totalHeight = canvasHeight + streetWidth * 2;
  const hasBackgroundImage = Boolean(backgroundImage);
  const [isPanning, setIsPanning] = useState(false);
  const [panStartPos, setPanStartPos] = useState<Point>({ x: 0, y: 0 });

  // Render grid
  const renderGrid = () => {
    if (!showGrid || hasBackgroundImage) return null;

    const lines = [];

    // Vertical lines
    for (let x = 0; x <= totalWidth; x += gridSize) {
      lines.push(
        <line
          key={`v-${x}`}
          x1={x}
          y1={0}
          x2={x}
          y2={totalHeight}
          stroke="#e5e7eb"
          strokeWidth={0.5}
        />
      );
    }

    // Horizontal lines
    for (let y = 0; y <= totalHeight; y += gridSize) {
      lines.push(
        <line
          key={`h-${y}`}
          x1={0}
          y1={y}
          x2={totalWidth}
          y2={y}
          stroke="#e5e7eb"
          strokeWidth={0.5}
        />
      );
    }

    // Major grid lines every 10 feet
    const majorGridSize = 10 * propertyConfig.scale;
    for (let x = 0; x <= totalWidth; x += majorGridSize) {
      lines.push(
        <line
          key={`vmajor-${x}`}
          x1={x}
          y1={0}
          x2={x}
          y2={totalHeight}
          stroke="#9ca3af"
          strokeWidth={1}
        />
      );
    }
    for (let y = 0; y <= totalHeight; y += majorGridSize) {
      lines.push(
        <line
          key={`hmajor-${y}`}
          x1={0}
          y1={y}
          x2={totalWidth}
          y2={y}
          stroke="#9ca3af"
          strokeWidth={1}
        />
      );
    }

    return <g className="grid">{lines}</g>;
  };

  // Render property boundary
  const renderPropertyBoundary = () => {
    const x = streetWidth;
    const y = streetWidth;

    return (
      <g className="property-boundary">
        <rect
          x={x}
          y={y}
          width={canvasWidth}
          height={canvasHeight}
          stroke="#000000"
          strokeWidth={hasBackgroundImage ? 2 : 3}
          fill="transparent"
        />

        {/* Dimension labels */}
        {showDimensions && (
          <>
            {/* Width dimension (top) */}
            <text
              x={x + canvasWidth / 2}
              y={y - 10}
              textAnchor="middle"
              fontSize="12"
              fontWeight="bold"
              fill="#000"
            >
              {propertyConfig.width}'
            </text>

            {/* Height dimension (left) */}
            <text
              x={x - 15}
              y={y + canvasHeight / 2}
              textAnchor="middle"
              fontSize="12"
              fontWeight="bold"
              fill="#000"
              transform={`rotate(-90, ${x - 15}, ${y + canvasHeight / 2})`}
            >
              {propertyConfig.depth}'
            </text>
          </>
        )}
      </g>
    );
  };

  // Render streets
  const renderStreets = () => {
    if (hasBackgroundImage) return null;

    const streetSide = propertyConfig.streetSide;

    return (
      <g className="streets">
        {/* Render street based on streetSide */}
        {streetSide === 'north' && (
          <>
            <rect
              x={0}
              y={0}
              width={totalWidth}
              height={streetWidth}
              fill="#6b7280"
              opacity={0.3}
            />
            {propertyConfig.streetName && (
              <text
                x={totalWidth / 2}
                y={streetWidth / 2 + 5}
                textAnchor="middle"
                fontSize="14"
                fontWeight="600"
                fill="#1f2937"
              >
                {propertyConfig.streetName}
              </text>
            )}
          </>
        )}

        {streetSide === 'south' && (
          <>
            <rect
              x={0}
              y={totalHeight - streetWidth}
              width={totalWidth}
              height={streetWidth}
              fill="#6b7280"
              opacity={0.3}
            />
            {propertyConfig.streetName && (
              <text
                x={totalWidth / 2}
                y={totalHeight - streetWidth / 2 + 5}
                textAnchor="middle"
                fontSize="14"
                fontWeight="600"
                fill="#1f2937"
              >
                {propertyConfig.streetName}
              </text>
            )}
          </>
        )}

        {streetSide === 'east' && (
          <>
            <rect
              x={totalWidth - streetWidth}
              y={0}
              width={streetWidth}
              height={totalHeight}
              fill="#6b7280"
              opacity={0.3}
            />
            {propertyConfig.streetName && (
              <text
                x={totalWidth - streetWidth / 2}
                y={totalHeight / 2}
                textAnchor="middle"
                fontSize="14"
                fontWeight="600"
                fill="#1f2937"
                transform={`rotate(-90, ${totalWidth - streetWidth / 2}, ${totalHeight / 2})`}
              >
                {propertyConfig.streetName}
              </text>
            )}
          </>
        )}

        {streetSide === 'west' && (
          <>
            <rect
              x={0}
              y={0}
              width={streetWidth}
              height={totalHeight}
              fill="#6b7280"
              opacity={0.3}
            />
            {propertyConfig.streetName && (
              <text
                x={streetWidth / 2}
                y={totalHeight / 2}
                textAnchor="middle"
                fontSize="14"
                fontWeight="600"
                fill="#1f2937"
                transform={`rotate(-90, ${streetWidth / 2}, ${totalHeight / 2})`}
              >
                {propertyConfig.streetName}
              </text>
            )}
          </>
        )}
      </g>
    );
  };

  // Render north arrow
  const renderNorthArrow = () => {
    if (hasBackgroundImage) return null;

    const arrowX = canvasWidth + streetWidth + 40;
    const arrowY = streetWidth + 40;
    const arrowSize = 30;
    const rotation = propertyConfig.northDirection;

    return (
      <g className="north-arrow" transform={`rotate(${rotation}, ${arrowX}, ${arrowY})`}>
        <polygon
          points={`${arrowX},${arrowY - arrowSize} ${arrowX - 10},${arrowY} ${arrowX + 10},${arrowY}`}
          fill="#000"
          stroke="#000"
          strokeWidth={1}
        />
        <line
          x1={arrowX}
          y1={arrowY}
          x2={arrowX}
          y2={arrowY + arrowSize}
          stroke="#000"
          strokeWidth={2}
        />
        <text
          x={arrowX}
          y={arrowY - arrowSize - 10}
          textAnchor="middle"
          fontSize="16"
          fontWeight="bold"
          fill="#000"
          transform={`rotate(${-rotation}, ${arrowX}, ${arrowY - arrowSize - 10})`}
        >
          N
        </text>
      </g>
    );
  };

  // Render element
  const renderElement = (element: DrawingElement) => {
    const { shape, points, style } = element;
    const isSelected = selectedElementId === element.id;
    const isHighlighted = highlightedElementId === element.id;

    if (shape === 'line' && points.length >= 2) {
      return (
        <g key={element.id}>
          {isHighlighted && (
            <line
              x1={points[0].x}
              y1={points[0].y}
              x2={points[1].x}
              y2={points[1].y}
              stroke="#fbbf24"
              strokeWidth={(style.strokeWidth || 2) + 6}
              opacity={0.6}
              className="animate-pulse"
            />
          )}
          <line
            x1={points[0].x}
            y1={points[0].y}
            x2={points[1].x}
            y2={points[1].y}
            stroke={style.stroke}
            strokeWidth={style.strokeWidth}
            fill={style.fill}
            opacity={style.opacity}
            strokeDasharray={style.dashArray}
            onClick={() => selectedTool === 'select' && onElementClick(element.id)}
            style={{ cursor: selectedTool === 'select' ? 'grab' : 'default' }}
          />
          {isSelected && (
            <>
              <circle cx={points[0].x} cy={points[0].y} r={4} fill="#3b82f6" />
              <circle cx={points[1].x} cy={points[1].y} r={4} fill="#3b82f6" />
            </>
          )}
        </g>
      );
    }

    if (shape === 'rectangle' && points.length >= 2) {
      const x = Math.min(points[0].x, points[1].x);
      const y = Math.min(points[0].y, points[1].y);
      const width = Math.abs(points[1].x - points[0].x);
      const height = Math.abs(points[1].y - points[0].y);

      return (
        <g key={element.id}>
          {isHighlighted && (
            <rect
              x={x - 4}
              y={y - 4}
              width={width + 8}
              height={height + 8}
              fill="#fbbf24"
              stroke="#fbbf24"
              strokeWidth={4}
              opacity={0.4}
              className="animate-pulse"
            />
          )}
          <rect
            x={x}
            y={y}
            width={width}
            height={height}
            stroke={style.stroke}
            strokeWidth={style.strokeWidth}
            fill={style.fill}
            opacity={style.opacity}
            strokeDasharray={style.dashArray}
            onClick={() => selectedTool === 'select' && onElementClick(element.id)}
            style={{ cursor: selectedTool === 'select' ? 'grab' : 'default' }}
          />
          {isSelected && (
            <rect
              x={x - 2}
              y={y - 2}
              width={width + 4}
              height={height + 4}
              fill="none"
              stroke="#3b82f6"
              strokeWidth={2}
              strokeDasharray="5,5"
            />
          )}
          {showDimensions && element.dimensions && width > 10 && height > 10 && (
            <>
              <text
                x={x + width / 2}
                y={y - 5}
                textAnchor="middle"
                fontSize="10"
                fontWeight="600"
                fill="#374151"
              >
                {element.dimensions.width?.toFixed(1)}'
              </text>
              <text
                x={x - 5}
                y={y + height / 2}
                textAnchor="end"
                fontSize="10"
                fontWeight="600"
                fill="#374151"
              >
                {element.dimensions.height?.toFixed(1)}'
              </text>
            </>
          )}
        </g>
      );
    }

    if (shape === 'circle' && points.length >= 2) {
      const radius = calculateDistance(points[0], points[1]);
      return (
        <g key={element.id}>
          {isHighlighted && (
            <circle
              cx={points[0].x}
              cy={points[0].y}
              r={radius + 6}
              fill="#fbbf24"
              stroke="#fbbf24"
              strokeWidth={4}
              opacity={0.4}
              className="animate-pulse"
            />
          )}
          <circle
            cx={points[0].x}
            cy={points[0].y}
            r={radius}
            stroke={style.stroke}
            strokeWidth={style.strokeWidth}
            fill={style.fill}
            opacity={style.opacity}
            strokeDasharray={style.dashArray}
            onClick={() => selectedTool === 'select' && onElementClick(element.id)}
            style={{ cursor: selectedTool === 'select' ? 'grab' : 'default' }}
          />
          {isSelected && (
            <circle
              cx={points[0].x}
              cy={points[0].y}
              r={radius + 3}
              fill="none"
              stroke="#3b82f6"
              strokeWidth={2}
              strokeDasharray="5,5"
            />
          )}
          {showDimensions && element.dimensions && (
            <text
              x={points[0].x}
              y={points[0].y - radius - 8}
              textAnchor="middle"
              fontSize="10"
              fontWeight="600"
              fill="#374151"
            >
              ⌀ {(pixelsToFeet(radius, propertyConfig.scale) * 2).toFixed(1)}'
            </text>
          )}
        </g>
      );
    }

    if (shape === 'text' && points.length >= 1 && element.label) {
      const fontSize = style.fontSize || 16;
      return (
        <g key={element.id}>
          {isHighlighted && (
            <rect
              x={points[0].x - 8}
              y={points[0].y - fontSize - 3}
              width={element.label.length * fontSize * 0.6 + 10}
              height={fontSize + 10}
              fill="#fbbf24"
              stroke="#fbbf24"
              strokeWidth={3}
              opacity={0.4}
              className="animate-pulse"
              rx={4}
            />
          )}
          <text
            x={points[0].x}
            y={points[0].y}
            fontSize={fontSize}
            fontWeight="500"
            fill={style.fill}
            onClick={() => selectedTool === 'select' && onElementClick(element.id)}
            style={{ cursor: selectedTool === 'select' ? 'pointer' : 'default', userSelect: 'none' }}
          >
            {element.label}
          </text>
          {isSelected && (
            <rect
              x={points[0].x - 5}
              y={points[0].y - fontSize}
              width={element.label.length * fontSize * 0.6}
              height={fontSize + 5}
              fill="none"
              stroke="#3b82f6"
              strokeWidth={2}
              strokeDasharray="5,5"
            />
          )}
        </g>
      );
    }

    return null;
  };

  // Render current drawing preview
  const renderCurrentDrawing = () => {
    if (!isDrawing || currentPoints.length === 0) return null;

    if (selectedTool === 'line' && currentPoints.length === 2) {
      return (
        <line
          x1={currentPoints[0].x}
          y1={currentPoints[0].y}
          x2={currentPoints[1].x}
          y2={currentPoints[1].y}
          stroke="#2563eb"
          strokeWidth={2}
          opacity={0.5}
        />
      );
    }

    if (selectedTool === 'rectangle' && currentPoints.length === 2) {
      const x = Math.min(currentPoints[0].x, currentPoints[1].x);
      const y = Math.min(currentPoints[0].y, currentPoints[1].y);
      const width = Math.abs(currentPoints[1].x - currentPoints[0].x);
      const height = Math.abs(currentPoints[1].y - currentPoints[0].y);

      return (
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          stroke="#2563eb"
          strokeWidth={2}
          fill="#dbeafe"
          opacity={0.5}
        />
      );
    }

    if (selectedTool === 'circle' && currentPoints.length === 2) {
      const radius = calculateDistance(currentPoints[0], currentPoints[1]);
      return (
        <circle
          cx={currentPoints[0].x}
          cy={currentPoints[0].y}
          r={radius}
          stroke="#2563eb"
          strokeWidth={2}
          fill="#86efac"
          opacity={0.5}
        />
      );
    }

    return null;
  };

  // Handle wheel zoom
  const handleWheel = (e: React.WheelEvent<SVGSVGElement>) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    const newZoom = Math.max(0.1, Math.min(5, zoom + delta));
    onZoomChange(newZoom);
  };

  // Handle mouse down for panning or drawing
  const handleMouseDownPan = (e: React.MouseEvent<SVGSVGElement>) => {
    // Middle mouse button or Space+Click always pans
    if (e.button === 1 || (e.button === 0 && e.shiftKey)) {
      e.preventDefault();
      setIsPanning(true);
      setPanStartPos({ x: e.clientX - panX, y: e.clientY - panY });
      return;
    }

    // Left click in select mode: check if clicking on background (not an element)
    if (e.button === 0 && selectedTool === 'select') {
      const target = e.target as SVGElement;
      // If clicking on the SVG background (not an element), enable panning
      if (target.tagName === 'svg' || target.classList.contains('grid') ||
          target.tagName === 'line' && target.parentElement?.classList.contains('grid')) {
        e.preventDefault();
        setIsPanning(true);
        setPanStartPos({ x: e.clientX - panX, y: e.clientY - panY });
        return;
      }
    }

    // Otherwise, handle normal drawing/selection
    onMouseDown(e);
  };

  const handleMouseMovePan = (e: React.MouseEvent<SVGSVGElement>) => {
    if (isPanning) {
      const newPanX = e.clientX - panStartPos.x;
      const newPanY = e.clientY - panStartPos.y;
      onPanChange(newPanX, newPanY);
    } else {
      onMouseMove(e);
    }
  };

  const handleMouseUpPan = () => {
    if (isPanning) {
      setIsPanning(false);
    } else {
      onMouseUp();
    }
  };

  // Calculate viewBox to fit content with zoom and pan
  const viewBoxWidth = totalWidth / zoom;
  const viewBoxHeight = totalHeight / zoom;
  const viewBoxX = -panX / zoom;
  const viewBoxY = -panY / zoom;

  // Calculate center point for rotation
  const centerX = totalWidth / 2;
  const centerY = totalHeight / 2;

  return (
    <svg
      ref={svgRef}
      width={containerWidth || totalWidth + 100}
      height={containerHeight || totalHeight + 100}
      viewBox={`${viewBoxX} ${viewBoxY} ${viewBoxWidth} ${viewBoxHeight}`}
      className="border border-gray-300 shadow-lg"
      onMouseDown={handleMouseDownPan}
      onMouseMove={handleMouseMovePan}
      onMouseUp={handleMouseUpPan}
      onWheel={handleWheel}
      style={{
        cursor: isPanning
          ? 'grabbing'
          : isDragging
          ? 'grabbing'
          : selectedTool === 'select'
          ? 'grab'
          : 'crosshair'
      }}
    >
      <g transform={`rotate(${rotation} ${centerX} ${centerY})`}>
        {renderGrid()}
        {hasBackgroundImage && backgroundImage && (
          <image
            x={streetWidth}
            y={streetWidth}
            width={canvasWidth}
            height={canvasHeight}
            href={backgroundImage}
            preserveAspectRatio="none"
            style={{ pointerEvents: "none" }}
          />
        )}
        {renderStreets()}
        {renderPropertyBoundary()}
        {renderNorthArrow()}

        {/* Render all visible elements */}
        <g className="elements">
          {elements.map(element => renderElement(element))}
        </g>

        {/* Render current drawing */}
        {renderCurrentDrawing()}
      </g>
    </svg>
  );
};
