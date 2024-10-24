import React from 'react';
import { CheckCircle, AlertCircle, XCircle } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import type { NutritionSummary } from '../utils/calculations';

interface NutritionSummaryProps {
  summary: NutritionSummary;
}

const statusIcons = {
  success: <CheckCircle className="text-emerald-500" size={20} />,
  warning: <AlertCircle className="text-amber-500" size={20} />,
  error: <XCircle className="text-red-500" size={20} />,
};

const statusColors = {
  success: 'bg-emerald-100 text-emerald-800',
  warning: 'bg-amber-100 text-amber-800',
  error: 'bg-red-100 text-red-800',
};

export const NutritionSummaryComponent = ({ summary }: NutritionSummaryProps) => {
  const { t } = useTranslation();
  const formatValue = (value: number) => Math.round(value * 10) / 10;

  const renderNutrient = (nutrient: string) => {
    const data = summary[nutrient];
    if (!data) return null;

    const tolerance = data.target * (data.tolerance / 100);
    const range = data.type === 'min' 
      ? `>${formatValue(data.target - tolerance)}`
      : `<${formatValue(data.target + tolerance)}`;

    const unit = t(`units.${nutrient === 'energy' ? 'kcal' : 'g'}`);

    return (
      <div key={nutrient} className={`p-4 rounded-lg ${statusColors[data.status]}`}>
        <div className="flex items-center justify-between mb-2">
          <span className="font-medium">{t(`nutrients.${nutrient}`)}</span>
          {statusIcons[data.status]}
        </div>
        <div className="text-2xl font-bold mb-1">
          {formatValue(data.value)}{unit}
        </div>
        <div className="text-sm opacity-75">
          {t('nutrition.summary.target')}: {range} {unit}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        {t('nutrition.summary.title')}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Object.keys(summary).map(renderNutrient)}
      </div>
    </div>
  );
};