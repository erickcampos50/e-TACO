import { foods } from '../data/foods';
import type { Food } from '../types';

export const getNutrientFields = (): string[] => {
  const excludedFields = new Set(['id', 'description', 'energy_kj']);
  const nutrientFields = new Set<string>();

  foods.forEach((food) => {
    Object.entries(food).forEach(([key, value]) => {
      if (!excludedFields.has(key) && (typeof value === 'number' || value === null)) {
        nutrientFields.add(key);
      }
    });
  });

  return Array.from(nutrientFields).sort();
};

export const getNutrientLabel = (nutrient: string): string => {
  const labels: { [key: string]: string } = {
    energy: 'Calorias',
    protein: 'Proteína',
    lipids: 'Gorduras',
    carbohydrates: 'Carboidratos',
    fiber: 'Fibras',
    calcium: 'Cálcio',
    magnesium: 'Magnésio',
    manganese: 'Manganês',
    phosphorus: 'Fósforo',
    iron: 'Ferro',
    sodium: 'Sódio',
    potassium: 'Potássio',
    copper: 'Cobre',
    zinc: 'Zinco',
    cholesterol: 'Colesterol',
    humidity: 'Umidade',
    ashes: 'Cinzas',
    retinol: 'Retinol',
    re: 'Equivalente de Retinol',
    rae: 'Equivalente de Atividade de Retinol',
    thiamine: 'Tiamina'
  };

  return labels[nutrient] || nutrient.charAt(0).toUpperCase() + nutrient.slice(1);
};

export const getNutrientUnit = (nutrient: string): string => {
  const units: { [key: string]: string } = {
    energy: 'kcal',
    protein: 'g',
    lipids: 'g',
    carbohydrates: 'g',
    fiber: 'g',
    calcium: 'mg',
    magnesium: 'mg',
    manganese: 'mg',
    phosphorus: 'mg',
    iron: 'mg',
    sodium: 'mg',
    potassium: 'mg',
    copper: 'mg',
    zinc: 'mg',
    cholesterol: 'mg',
    humidity: '%',
    ashes: 'g',
    retinol: 'µg',
    re: 'µg',
    rae: 'µg',
    thiamine: 'mg'
  };

  return units[nutrient] || '';
};