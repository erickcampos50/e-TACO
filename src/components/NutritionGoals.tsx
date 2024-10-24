import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import type { Goals } from '../types';
import { getNutrientFields } from '../utils/nutrientUtils';

interface NutritionGoalsProps {
  goals: Goals;
  onUpdate: (goals: Goals) => void;
}

export const NutritionGoals = ({ goals, onUpdate }: NutritionGoalsProps) => {
  const { t } = useTranslation();
  const [showDropdown, setShowDropdown] = useState(false);
  const availableNutrients = getNutrientFields();

  const handleGoalChange = (
    nutrient: string,
    field: 'value' | 'tolerance' | 'type',
    value: number | 'min' | 'max'
  ) => {
    onUpdate({
      ...goals,
      [nutrient]: {
        ...goals[nutrient],
        [field]: value,
      },
    });
  };

  const addNewGoal = (nutrient: string) => {
    onUpdate({
      ...goals,
      [nutrient]: {
        type: 'max',
        value: 0,
        tolerance: 5,
      },
    });
    setShowDropdown(false);
  };

  const removeGoal = (nutrient: string) => {
    const { [nutrient]: removed, ...remainingGoals } = goals;
    onUpdate(remainingGoals);
  };

  const unusedNutrients = availableNutrients.filter(nutrient => !goals[nutrient]);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">{t('nutrition.goals.title')}</h2>
        {unusedNutrients.length > 0 && (
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center space-x-2 text-emerald-600 hover:text-emerald-700"
            >
              <Plus size={20} />
              <span>{t('nutrition.goals.addGoal')}</span>
            </button>
            
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg z-10 border">
                <div className="flex justify-between items-center p-2 border-b">
                  <span className="font-medium">{t('nutrition.goals.selectNutrient')}</span>
                  <button 
                    onClick={() => setShowDropdown(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X size={16} />
                  </button>
                </div>
                <div className="max-h-60 overflow-y-auto">
                  {unusedNutrients.map(nutrient => (
                    <button
                      key={nutrient}
                      onClick={() => addNewGoal(nutrient)}
                      className="w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors"
                    >
                      {t(`nutrients.${nutrient}`)}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(goals).map(([nutrient, goal]) => (
          <div key={nutrient} className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="block text-sm font-medium text-gray-700">
                {t(`nutrients.${nutrient}`)}
              </label>
              {nutrient !== 'energy' && nutrient !== 'protein' && 
               nutrient !== 'carbohydrates' && nutrient !== 'lipids' && (
                <button
                  onClick={() => removeGoal(nutrient)}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  {t('nutrition.goals.removeGoal')}
                </button>
              )}
            </div>
            <div className="flex space-x-4">
              <select
                value={goal.type}
                onChange={(e) => handleGoalChange(nutrient, 'type', e.target.value as 'min' | 'max')}
                className="p-2 border rounded-md"
              >
                <option value="min">{t('nutrition.goals.min')}</option>
                <option value="max">{t('nutrition.goals.max')}</option>
              </select>
              <input
                type="number"
                value={goal.value}
                onChange={(e) => handleGoalChange(nutrient, 'value', Number(e.target.value))}
                className="w-24 p-2 border rounded-md"
                min="0"
              />
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  value={goal.tolerance}
                  onChange={(e) => handleGoalChange(nutrient, 'tolerance', Number(e.target.value))}
                  className="w-16 p-2 border rounded-md"
                  min="0"
                  max="100"
                />
                <span className="text-gray-500">{t('nutrition.goals.toleranceUnit')}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};