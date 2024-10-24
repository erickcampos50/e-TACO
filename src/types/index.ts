export interface Food {
  id: number;
  description: string;
  humidity?: number | null;
  energy: number;
  energy_kj?: number | null;
  protein: number;
  lipids: number;
  cholesterol?: number | null;
  carbohydrates: number;
  fiber?: number | null;
  ashes?: number | null;
  calcium?: number | null;
  magnesium?: number | null;
  manganese?: number | null;
  phosphorus?: number | null;
  iron?: number | null;
  sodium?: number | null;
  potassium?: number | null;
  copper?: number | null;
  zinc?: number | null;
  retinol?: number | null;
  re?: number | null;
  rae?: number | null;
  thiamine?: number | null;
  [key: string]: number | null | string | undefined;
}

export interface NutritionistInfo {
  name: string;
  license: string;
  email: string;
  phone: string;
}

export interface PatientInfo {
  name: string;
  age: number;
  gender: 'M' | 'F' | 'O';
  height: number;
  weight: number;
  phone: string;
  email: string;
  observations: string;
  notes: string;
}

export type MeasurementUnit = 'cup' | 'teaspoon' | 'tablespoon' | 'glass' | 'gram';

export interface MeasurementConversion {
  unit: MeasurementUnit;
  label: string;
  gramsPerUnit: number;
}

export interface MealItem {
  foodId: number;
  quantity: number;
  unit: MeasurementUnit;
}

export interface NutritionalGoal {
  type: 'min' | 'max';
  value: number;
  tolerance: number;
}

export interface Goals {
  [key: string]: NutritionalGoal;
}

export interface Meal {
  id: string;
  name: string;
  items: MealItem[];
}

export interface MealPlan {
  id: string;
  name: string;
  nutritionist?: NutritionistInfo;
  patient?: PatientInfo;
  meals: Meal[];
  goals: Goals;
  createdAt: string;
  updatedAt: string;
}

export interface SavedMealPlan {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}