import React, { useState } from 'react';
import { Database } from 'lucide-react';
import { Header } from './components/Header';
import { MealSection } from './components/MealSection';
import { NutritionGoals } from './components/NutritionGoals';
import { NutritionSummaryComponent } from './components/NutritionSummary';
import { UserInfo } from './components/UserInfo';
import { ProfileSelector } from './components/ProfileSelector';
import { InstructionsSection } from './components/InstructionsSection';
import { CreditsSection } from './components/CreditsSection';
import { calculateNutritionSummary } from './utils/calculations';
import { useMealPlanStorage } from './hooks/useMealPlanStorage';
import type { MealPlan, Meal, Goals, NutritionistInfo, PatientInfo } from './types';

const initialGoals: Goals = {
  energy: { type: 'max', value: 2000, tolerance: 5 },
  protein: { type: 'min', value: 50, tolerance: 10 },
  carbohydrates: { type: 'max', value: 250, tolerance: 5 },
  lipids: { type: 'max', value: 70, tolerance: 5 },
};

const defaultMealNames = ['Café da Manhã', 'Almoço', 'Jantar', 'Lanche'];

const initialNutritionist: NutritionistInfo = {
  name: '',
  license: '',
  email: '',
  phone: '',
};

const initialPatient: PatientInfo = {
  name: '',
  age: 0,
  gender: 'M',
  height: 0,
  weight: 0,
  notes: '',
  phone: '',
  email: '',
  observations: '',
};

const createEmptyPlan = (): MealPlan => ({
  id: crypto.randomUUID(),
  name: 'Novo Plano Alimentar',
  meals: [],
  goals: initialGoals,
  nutritionist: initialNutritionist,
  patient: initialPatient,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});

const App: React.FC = () => {
  const [mealPlan, setMealPlan] = useState<MealPlan>(createEmptyPlan());
  const { savePlan, loadPlan, getSavedPlansList } = useMealPlanStorage();

  const nutritionSummary = calculateNutritionSummary(mealPlan.meals, mealPlan.goals);

  const addMeal = () => {
    const newMeal: Meal = {
      id: crypto.randomUUID(),
      name: defaultMealNames[mealPlan.meals.length % defaultMealNames.length],
      items: [],
    };

    setMealPlan({
      ...mealPlan,
      meals: [...mealPlan.meals, newMeal],
      updatedAt: new Date().toISOString(),
    });
  };

  const updateMeal = (updatedMeal: Meal) => {
    setMealPlan({
      ...mealPlan,
      meals: mealPlan.meals.map((meal) =>
        meal.id === updatedMeal.id ? updatedMeal : meal
      ),
      updatedAt: new Date().toISOString(),
    });
  };

  const deleteMeal = (mealId: string) => {
    setMealPlan({
      ...mealPlan,
      meals: mealPlan.meals.filter((meal) => meal.id !== mealId),
      updatedAt: new Date().toISOString(),
    });
  };

  const updateGoals = (goals: Goals) => {
    setMealPlan({
      ...mealPlan,
      goals,
      updatedAt: new Date().toISOString(),
    });
  };

  const updateUserInfo = (updates: { nutritionist?: NutritionistInfo; patient?: PatientInfo }) => {
    setMealPlan({
      ...mealPlan,
      nutritionist: updates.nutritionist || mealPlan.nutritionist,
      patient: updates.patient || mealPlan.patient,
      updatedAt: new Date().toISOString(),
    });
  };

  const handleImport = (importedPlan: MealPlan) => {
    setMealPlan({
      ...importedPlan,
      id: crypto.randomUUID(),
      updatedAt: new Date().toISOString(),
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header mealPlan={mealPlan} onImport={handleImport} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <InstructionsSection />
          
          <ProfileSelector onProfileSelect={updateGoals} />
          
          <NutritionSummaryComponent summary={nutritionSummary} />
          
          <NutritionGoals goals={mealPlan.goals} onUpdate={updateGoals} />
          
          <UserInfo 
            nutritionist={mealPlan.nutritionist!} 
            patient={mealPlan.patient!} 
            onUpdate={updateUserInfo} 
          />

          <div className="space-y-6">
            {mealPlan.meals.map((meal) => (
              <MealSection
                key={meal.id}
                meal={meal}
                onUpdate={updateMeal}
                onDelete={() => deleteMeal(meal.id)}
              />
            ))}
          </div>

          <button
            onClick={addMeal}
            className="mt-6 w-full bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center space-x-2"
          >
            <Database size={20} />
            <span>Adicionar Refeição</span>
          </button>

          <CreditsSection />
        </div>
      </main>
    </div>
  );
};

export default App;