import { Meal, Food, Goals, NutritionalGoal } from '../types';
import { foods } from '../data/foods';
import { convertToGrams } from '../data/measurements';
import { getNutrientFields } from './nutrientUtils';

export interface NutrientTotals {
  [key: string]: number;
}

export interface NutrientStatus {
  value: number;
  target: number;
  tolerance: number;
  type: 'min' | 'max';
  status: 'success' | 'warning' | 'error';
}

export interface NutritionSummary {
  [key: string]: NutrientStatus;
}

export const calculateMealNutrients = (meal: Meal): NutrientTotals => {
  const nutrientFields = getNutrientFields();
  const totals: NutrientTotals = {};

  // Initialize totals for all nutrient fields
  nutrientFields.forEach(field => {
    totals[field] = 0;
  });

  meal.items.forEach(item => {
    const food = foods.find(f => f.id === item.foodId);
    if (!food) return;

    const grams = convertToGrams(item.quantity, item.unit);
    const multiplier = grams / 100; // Convert to 100g portions

    nutrientFields.forEach(field => {
      const value = food[field];
      if (typeof value === 'number') {
        totals[field] += value * multiplier;
      }
    });
  });

  return totals;
};

export const calculateTotalNutrients = (meals: Meal[]): NutrientTotals => {
  const nutrientFields = getNutrientFields();
  const totals: NutrientTotals = {};

  // Initialize totals for all nutrient fields
  nutrientFields.forEach(field => {
    totals[field] = 0;
  });

  meals.forEach(meal => {
    const mealNutrients = calculateMealNutrients(meal);
    Object.entries(mealNutrients).forEach(([nutrient, value]) => {
      totals[nutrient] += value;
    });
  });

  return totals;
};

export const getNutrientStatus = (
  value: number,
  goal: NutritionalGoal
): 'success' | 'warning' | 'error' => {
  const tolerance = goal.value * (goal.tolerance / 100);
  const min = goal.value - tolerance;
  const max = goal.value + tolerance;

  if (goal.type === 'min') {
    if (value >= goal.value) return 'success';
    if (value >= min) return 'warning';
    return 'error';
  } else {
    if (value <= goal.value) return 'success';
    if (value <= max) return 'warning';
    return 'error';
  }
};

export const calculateNutritionSummary = (
  meals: Meal[],
  goals: Goals
): NutritionSummary => {
  const totals = calculateTotalNutrients(meals);
  const summary: NutritionSummary = {};

  Object.entries(goals).forEach(([nutrient, goal]) => {
    summary[nutrient] = {
      value: totals[nutrient] || 0,
      target: goal.value,
      tolerance: goal.tolerance,
      type: goal.type,
      status: getNutrientStatus(totals[nutrient] || 0, goal),
    };
  });

  return summary;
};