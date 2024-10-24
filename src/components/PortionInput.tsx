import React from 'react';
import type { MealItem, MeasurementUnit } from '../types';
import { measurementUnits, convertToGrams } from '../data/measurements';

interface PortionInputProps {
  item: MealItem;
  onChange: (updates: Partial<MealItem>) => void;
}

export const PortionInput = ({ item, onChange }: PortionInputProps) => {
  const handleUnitChange = (unit: MeasurementUnit) => {
    const oldGrams = convertToGrams(item.quantity, item.unit);
    const newConversion = measurementUnits.find(m => m.unit === unit);
    
    if (newConversion) {
      // Convert the quantity to maintain the same amount in grams
      const newQuantity = oldGrams / newConversion.gramsPerUnit;
      onChange({ unit, quantity: Number(newQuantity.toFixed(2)) });
    }
  };

  return (
    <div className="flex space-x-2">
      <input
        type="number"
        value={item.quantity}
        onChange={(e) => onChange({ quantity: Number(e.target.value) })}
        className="w-24 p-2 border rounded-md"
        min="0"
        step="0.1"
      />
      <select
        value={item.unit}
        onChange={(e) => handleUnitChange(e.target.value as MeasurementUnit)}
        className="p-2 border rounded-md"
      >
        {measurementUnits.map((unit) => (
          <option key={unit.unit} value={unit.unit}>
            {unit.label}
          </option>
        ))}
      </select>
    </div>
  );
};