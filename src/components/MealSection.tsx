import React, { useState } from 'react';
import { Plus, Trash2, Edit2, Check, ChevronDown, ChevronUp } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import type { Meal, MealItem } from '../types';
import { foods } from '../data/foods';
import { calculateMealNutrients } from '../utils/calculations';
import { PortionInput } from './PortionInput';

interface MealSectionProps {
  meal: Meal;
  onUpdate: (updatedMeal: Meal) => void;
  onDelete: () => void;
}

export const MealSection = ({ meal, onUpdate, onDelete }: MealSectionProps) => {
  const { t } = useTranslation();
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(meal.name);
  const [showDetails, setShowDetails] = useState(false);

  const addFood = () => {
    onUpdate({
      ...meal,
      items: [...meal.items, { foodId: foods[0].id, quantity: 1, unit: 'cup' }]
    });
  };

  const removeFood = (index: number) => {
    onUpdate({
      ...meal,
      items: meal.items.filter((_, i) => i !== index)
    });
  };

  const updateFoodItem = (index: number, updates: Partial<MealItem>) => {
    const newItems = [...meal.items];
    newItems[index] = { ...newItems[index], ...updates };
    onUpdate({ ...meal, items: newItems });
  };

  const handleNameSave = () => {
    if (editedName.trim()) {
      onUpdate({ ...meal, name: editedName.trim() });
      setIsEditing(false);
    }
  };

  const mealNutrients = calculateMealNutrients(meal);

  const renderNutrientSummary = () => {
    const mainNutrients = [
      { key: 'energy', label: 'kcal' },
      { key: 'protein', label: 'g' },
      { key: 'carbohydrates', label: 'g' },
      { key: 'lipids', label: 'g' }
    ];

    return (
      <div className="flex flex-wrap gap-3 text-sm text-gray-500">
        {mainNutrients.map(({ key, label }) => (
          <div key={key} className="flex items-center">
            <span className="font-medium">{t(`nutrients.${key}`)}:</span>
            <span className="ml-1">
              {Math.round(mealNutrients[key] || 0)}{t(`units.${label}`)}
            </span>
          </div>
        ))}
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="text-emerald-600 hover:text-emerald-700 flex items-center"
        >
          {showDetails ? (
            <>
              <ChevronUp size={16} className="mr-1" />
              {t('common.lessDetails')}
            </>
          ) : (
            <>
              <ChevronDown size={16} className="mr-1" />
              {t('common.moreDetails')}
            </>
          )}
        </button>
      </div>
    );
  };

  const renderDetailedNutrients = () => {
    const detailedNutrients = [
      { key: 'fiber', label: 'g' },
      { key: 'sodium', label: 'mg' },
      { key: 'potassium', label: 'mg' },
      { key: 'calcium', label: 'mg' },
      { key: 'iron', label: 'mg' },
      { key: 'zinc', label: 'mg' }
    ];

    if (!showDetails) return null;

    return (
      <div className="mt-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 text-sm text-gray-500">
        {detailedNutrients.map(({ key, label }) => (
          <div key={key} className="flex items-center">
            <span className="font-medium">{t(`nutrients.${key}`)}:</span>
            <span className="ml-1">
              {(mealNutrients[key] || 0).toFixed(1)}{t(`units.${label}`)}
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-grow">
          {isEditing ? (
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                className="text-xl font-semibold text-gray-800 border rounded px-2 py-1"
                autoFocus
                onKeyPress={(e) => e.key === 'Enter' && handleNameSave()}
              />
              <button
                onClick={handleNameSave}
                className="text-emerald-600 hover:text-emerald-700"
              >
                <Check size={20} />
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <h3 className="text-xl font-semibold text-gray-800">{meal.name}</h3>
              <button
                onClick={() => setIsEditing(true)}
                className="text-gray-400 hover:text-gray-600"
                title={t('meals.editName')}
              >
                <Edit2 size={16} />
              </button>
            </div>
          )}
          {renderNutrientSummary()}
          {renderDetailedNutrients()}
        </div>
        <button
          onClick={onDelete}
          className="text-red-500 hover:text-red-700 transition-colors ml-4"
          title={t('meals.deleteMeal')}
        >
          <Trash2 size={20} />
        </button>
      </div>

      <div className="space-y-4">
        {meal.items.map((item, index) => {
          const food = foods.find(f => f.id === item.foodId);
          if (!food) return null;

          const itemNutrients = calculateMealNutrients({ ...meal, items: [item] });

          return (
            <div key={index} className="flex items-center space-x-4">
              <select
                value={item.foodId}
                onChange={(e) => updateFoodItem(index, { foodId: Number(e.target.value) })}
                className="flex-grow p-2 border rounded-md"
              >
                {foods.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.description}
                  </option>
                ))}
              </select>
              
              <PortionInput
                item={item}
                onChange={(updates) => updateFoodItem(index, updates)}
              />

              <div className="text-sm text-gray-500 hidden md:block">
                {Math.round(itemNutrients.energy)} {t('units.kcal')}
              </div>
              
              <button
                onClick={() => removeFood(index)}
                className="text-red-500 hover:text-red-700 transition-colors"
                title={t('meals.deleteFood')}
              >
                <Trash2 size={18} />
              </button>
            </div>
          );
        })}
      </div>

      <button
        onClick={addFood}
        className="mt-4 flex items-center space-x-2 text-emerald-600 hover:text-emerald-700 transition-colors"
      >
        <Plus size={20} />
        <span>{t('meals.addFood')}</span>
      </button>
    </div>
  );
};