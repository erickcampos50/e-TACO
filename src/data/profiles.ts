import type { Goals } from '../types';

export interface NutrientGoal {
  min?: number;
  max?: number;
}

export interface Profile {
  profile: string;
  [key: string]: NutrientGoal | string;
}

export const profiles = [
  {
    profile: "adult_man",
    energy: { max: 2600 },
    protein: { max: 100 },
    lipids: { max: 80 },
    carbohydrates: { max: 325 },
    fiber: { min: 30 },
    sodium: { max: 2300 },
    potassium: { min: 3400 },
    calcium: { min: 1000 },
    iron: { min: 8 },
    zinc: { min: 11 },
    thiamine: { min: 1.2 }
  },
  {
    profile: "adult_woman",
    energy: { max: 2200 },
    protein: { max: 100 },
    lipids: { max: 70 },
    carbohydrates: { max: 275 },
    fiber: { min: 25 },
    sodium: { max: 2300 },
    potassium: { min: 2600 },
    calcium: { min: 1000 },
    iron: { min: 18 },
    zinc: { min: 8 },
    thiamine: { min: 1.1 }
  },
  {
    profile: "teenager_boy",
    energy: { max: 3200 },
    protein: { max: 100 },
    lipids: { max: 80 },
    carbohydrates: { max: 400 },
    fiber: { min: 38 },
    sodium: { max: 2300 },
    potassium: { min: 3000 },
    calcium: { min: 1300 },
    iron: { min: 11 },
    zinc: { min: 11 },
    thiamine: { min: 1.2 }
  },
  {
    profile: "teenager_girl",
    energy: { max: 2400 },
    protein: { max: 100 },
    lipids: { max: 70 },
    carbohydrates: { max: 300 },
    fiber: { min: 25 },
    sodium: { max: 2300 },
    potassium: { min: 2300 },
    calcium: { min: 1300 },
    iron: { min: 15 },
    zinc: { min: 9 },
    thiamine: { min: 1.0 }
  },
  {
    profile: "child",
    energy: { max: 1600 },
    protein: { max: 100 },
    lipids: { max: 40 },
    carbohydrates: { max: 210 },
    fiber: { min: 25 },
    sodium: { max: 1900 },
    potassium: { min: 2300 },
    calcium: { min: 1000 },
    iron: { min: 10 },
    zinc: { min: 5 },
    thiamine: { min: 0.6 }
  },
  {
    profile: "elderly_man",
    energy: { max: 2400 },
    protein: { max: 100 },
    lipids: { max: 80 },
    carbohydrates: { max: 325 },
    fiber: { min: 30 },
    sodium: { max: 2300 },
    potassium: { min: 3400 },
    calcium: { min: 1200 },
    iron: { min: 8 },
    zinc: { min: 11 },
    thiamine: { min: 1.2 }
  },
  {
    profile: "elderly_woman",
    energy: { max: 2000 },
    protein: { max: 100 },
    lipids: { max: 70 },
    carbohydrates: { max: 275 },
    fiber: { min: 25 },
    sodium: { max: 2300 },
    potassium: { min: 2600 },
    calcium: { min: 1200 },
    iron: { min: 8 },
    zinc: { min: 8 },
    thiamine: { min: 1.1 }
  }
] as const;

export const convertProfileToGoals = (profile: Profile): Goals => {
  const goals: Goals = {};
  
  Object.entries(profile).forEach(([key, value]) => {
    if (key !== 'profile' && typeof value === 'object') {
      goals[key] = {
        type: value.min !== undefined ? 'min' : 'max',
        value: value.min !== undefined ? value.min : value.max!,
        tolerance: 5
      };
    }
  });

  return goals;
};