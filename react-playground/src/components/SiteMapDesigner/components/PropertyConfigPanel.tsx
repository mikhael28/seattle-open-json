// ============================================================================
// PROPERTY CONFIG PANEL COMPONENT
// ============================================================================

import React from 'react';
import { PropertyConfig } from '../types';

interface PropertyConfigPanelProps {
  propertyConfig: PropertyConfig;
  onPropertyConfigChange: (config: PropertyConfig) => void;
}

type CompassDirection = 'north' | 'south' | 'east' | 'west';
type StreetSide = 'top' | 'bottom' | 'left' | 'right';

export const PropertyConfigPanel: React.FC<PropertyConfigPanelProps> = ({
  propertyConfig,
  onPropertyConfigChange,
}) => {
  const updateConfig = (updates: Partial<PropertyConfig>) => {
    onPropertyConfigChange({ ...propertyConfig, ...updates });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-900">Property Details</h2>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Property Width (feet)
        </label>
        <input
          type="number"
          value={propertyConfig.width}
          onChange={(e) => updateConfig({ width: Number(e.target.value) })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          min="10"
          max="500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Property Depth (feet)
        </label>
        <input
          type="number"
          value={propertyConfig.depth}
          onChange={(e) => updateConfig({ depth: Number(e.target.value) })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          min="10"
          max="500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Scale (pixels per foot)
        </label>
        <select
          value={propertyConfig.scale}
          onChange={(e) => updateConfig({ scale: Number(e.target.value) })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        >
          <option value={2}>1/8" = 1' (Small)</option>
          <option value={4}>1/4" = 1' (Standard)</option>
          <option value={6}>3/8" = 1' (Medium)</option>
          <option value={8}>1/2" = 1' (Large)</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Project Address
        </label>
        <input
          type="text"
          value={propertyConfig.address}
          onChange={(e) => updateConfig({ address: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          placeholder="123 Main St, Seattle, WA"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Front Street Name
        </label>
        <input
          type="text"
          value={propertyConfig.streetName || ''}
          onChange={(e) => updateConfig({ streetName: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          placeholder="Main Street"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          North Direction
        </label>
        <select
          value={propertyConfig.northDirection}
          onChange={(e) => updateConfig({ northDirection: Number(e.target.value) })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        >
          <option value={0}>⬆️ North (Up)</option>
          <option value={90}>➡️ East (Right)</option>
          <option value={180}>⬇️ South (Down)</option>
          <option value={270}>⬅️ West (Left)</option>
        </select>
        <p className="text-xs text-gray-500 mt-1">Which direction is north on your map?</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Street Side
        </label>
        <select
          value={propertyConfig.streetSide}
          onChange={(e) => updateConfig({ streetSide: e.target.value as PropertyConfig['streetSide'] })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        >
          <option value="north">North</option>
          <option value="south">South</option>
          <option value="east">East</option>
          <option value="west">West</option>
        </select>
        <p className="text-xs text-gray-500 mt-1">Which side has the street?</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Lot Number (optional)
        </label>
        <input
          type="text"
          value={propertyConfig.lotNumber || ''}
          onChange={(e) => updateConfig({ lotNumber: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          placeholder="Lot 5"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Zoning (optional)
        </label>
        <input
          type="text"
          value={propertyConfig.zoning || ''}
          onChange={(e) => updateConfig({ zoning: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          placeholder="e.g., SF 5000"
        />
      </div>
    </div>
  );
};
