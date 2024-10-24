import type { MeasurementConversion } from '../types';

export const measurementUnits: MeasurementConversion[] = [
  { unit: 'cup', label: 'Cup', gramsPerUnit: 240 },
  { unit: 'teaspoon', label: 'Teaspoon', gramsPerUnit: 5 },
  { unit: 'tablespoon', label: 'Tablespoon', gramsPerUnit: 15 },
  { unit: 'glass', label: 'Glass', gramsPerUnit: 250 },
  { unit: 'gram', label: 'Grams', gramsPerUnit: 1 },
] as const;

export const convertToGrams = (quantity: number, unit: string): number => {
  const conversion = measurementUnits.find(m => m.unit === unit);
  return conversion ? quantity * conversion.gramsPerUnit : quantity;
};