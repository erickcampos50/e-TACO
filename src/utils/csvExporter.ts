import { MealPlan, Meal } from '../types';
import { foods } from '../data/foods';
import { calculateMealNutrients, calculateTotalNutrients } from './calculations';
import { getNutrientLabel, getNutrientUnit } from './nutrientUtils';

const createCSVContent = (mealPlan: MealPlan): string => {
  const lines: string[] = [];
  
  // Add header information
  lines.push('NutriPlan Export');
  lines.push(`Plan Name: ${mealPlan.name}`);
  lines.push(`Created: ${new Date(mealPlan.createdAt).toLocaleDateString()}`);
  lines.push(`Last Updated: ${new Date(mealPlan.updatedAt).toLocaleDateString()}`);
  lines.push('');

  // Add nutritionist and patient information if available
  if (mealPlan.nutritionist || mealPlan.patient) {
    lines.push('Professional and Patient Information');
    if (mealPlan.nutritionist) {
      lines.push(`Nutritionist Name,${mealPlan.nutritionist.name}`);
      lines.push(`License,${mealPlan.nutritionist.license}`);
      if (mealPlan.nutritionist.email) {
        lines.push(`Email,${mealPlan.nutritionist.email}`);
      }
      if (mealPlan.nutritionist.phone) {
        lines.push(`Phone,${mealPlan.nutritionist.phone}`);
      }
    }
    if (mealPlan.patient) {
      lines.push(`Patient Name,${mealPlan.patient.name}`);
      if (mealPlan.patient.age) {
        lines.push(`Age,${mealPlan.patient.age}`);
      }
      if (mealPlan.patient.gender) {
        lines.push(`Gender,${mealPlan.patient.gender}`);
      }
      if (mealPlan.patient.height) {
        lines.push(`Height,${mealPlan.patient.height} cm`);
      }
      if (mealPlan.patient.weight) {
        lines.push(`Weight,${mealPlan.patient.weight} kg`);
      }
    }
    lines.push('');
  }

  // Add nutritional goals
  lines.push('Nutritional Goals');
  lines.push('Nutrient,Target,Tolerance');
  Object.entries(mealPlan.goals).forEach(([nutrient, goal]) => {
    lines.push(`${getNutrientLabel(nutrient)},${goal.type === 'min' ? '>' : '<'} ${goal.value}${getNutrientUnit(nutrient)},±${goal.tolerance}%`);
  });
  lines.push('');

  // Add meals and their items
  mealPlan.meals.forEach((meal) => {
    lines.push(`${meal.name}`);
    lines.push('Food,Portion,Calories,Protein,Carbs,Lipids');
    
    meal.items.forEach((item) => {
      const food = foods.find(f => f.id === item.foodId);
      if (!food) return;
      
      const nutrients = calculateMealNutrients({ ...meal, items: [item] });
      lines.push(`${food.description},${item.quantity} ${item.unit},${Math.round(nutrients.energy)} kcal,${Math.round(nutrients.protein)}g,${Math.round(nutrients.carbohydrates)}g,${Math.round(nutrients.lipids)}g`);
    });
    lines.push('');
  });

  // Add nutrition summary
  const totals = calculateTotalNutrients(mealPlan.meals);
  lines.push('Total Nutrition Summary');
  lines.push('Nutrient,Actual,Goal');
  Object.entries(mealPlan.goals).forEach(([nutrient, goal]) => {
    lines.push(`${getNutrientLabel(nutrient)},${Math.round(totals[nutrient] || 0)}${getNutrientUnit(nutrient)},${goal.type === 'min' ? '>' : '<'} ${goal.value}${getNutrientUnit(nutrient)}`);
  });

  return lines.join('\n');
};

export const exportToCSV = (mealPlan: MealPlan) => {
  const csvContent = createCSVContent(mealPlan);
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `nutriplan-${mealPlan.name.toLowerCase().replace(/\s+/g, '-')}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};