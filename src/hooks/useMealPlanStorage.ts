import { useState, useEffect } from 'react';
import type { MealPlan, SavedMealPlan } from '../types';

const STORAGE_KEY = 'nutriplan_saved_plans';

export const useMealPlanStorage = () => {
  const [savedPlans, setSavedPlans] = useState<MealPlan[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setSavedPlans(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to load saved plans:', e);
      }
    }
  }, []);

  const savePlan = (plan: MealPlan) => {
    const updatedPlans = savedPlans.filter(p => p.id !== plan.id);
    const newPlans = [...updatedPlans, plan];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newPlans));
    setSavedPlans(newPlans);
  };

  const loadPlan = (planId: string): MealPlan | undefined => {
    return savedPlans.find(p => p.id === planId);
  };

  const getSavedPlansList = (): SavedMealPlan[] => {
    return savedPlans.map(({ id, name, createdAt, updatedAt }) => ({
      id,
      name,
      createdAt,
      updatedAt,
    }));
  };

  return {
    savePlan,
    loadPlan,
    getSavedPlansList,
  };
};