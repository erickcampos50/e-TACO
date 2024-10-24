import React, { useState } from 'react';
import { Book, Info, ChevronDown, ChevronUp } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

export const InstructionsSection = () => {
  const { t } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between"
      >
        <div className="flex items-center space-x-3">
          <Book className="text-emerald-600" size={24} />
          <h2 className="text-xl font-semibold text-gray-800">{t('instructions.title')}</h2>
        </div>
        {isExpanded ? (
          <ChevronUp className="text-gray-500" size={24} />
        ) : (
          <ChevronDown className="text-gray-500" size={24} />
        )}
      </button>

      {isExpanded && (
        <div className="mt-6">
          {/* How to Use Section */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-3">{t('instructions.howToUse.title')}</h3>
            
            <div className="space-y-4">
              {/* Profile Setup */}
              <div>
                <h4 className="font-medium mb-2">{t('instructions.howToUse.profile.title')}</h4>
                <p className="text-gray-600">{t('instructions.howToUse.profile.description')}</p>
              </div>

              {/* Goals */}
              <div>
                <h4 className="font-medium mb-2">{t('instructions.howToUse.goals.title')}</h4>
                <p className="text-gray-600">{t('instructions.howToUse.goals.description')}</p>
                <ul className="list-disc list-inside mt-2 text-gray-600">
                  <li>{t('instructions.howToUse.goals.point1')}</li>
                  <li>{t('instructions.howToUse.goals.point2')}</li>
                  <li>{t('instructions.howToUse.goals.point3')}</li>
                </ul>
              </div>

              {/* Meal Plan */}
              <div>
                <h4 className="font-medium mb-2">{t('instructions.howToUse.mealPlan.title')}</h4>
                <p className="text-gray-600">{t('instructions.howToUse.mealPlan.description')}</p>
                <ul className="list-disc list-inside mt-2 text-gray-600">
                  <li>{t('instructions.howToUse.mealPlan.point1')}</li>
                  <li>{t('instructions.howToUse.mealPlan.point2')}</li>
                  <li>{t('instructions.howToUse.mealPlan.point3')}</li>
                </ul>
              </div>

              {/* Summary */}
              <div>
                <h4 className="font-medium mb-2">{t('instructions.howToUse.summary.title')}</h4>
                <p className="text-gray-600">{t('instructions.howToUse.summary.description')}</p>
                <div className="mt-2 p-3 bg-gray-50 rounded-md">
                  <div className="flex items-center space-x-2">
                    <Info size={18} className="text-emerald-600" />
                    <p className="text-sm text-gray-600">{t('instructions.howToUse.summary.tip')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Scientific Foundations */}
          <div>
            <h3 className="text-lg font-semibold mb-3">{t('instructions.scientific.title')}</h3>
            
            <div className="space-y-4">
              {/* TACO Table */}
              <div>
                <h4 className="font-medium mb-2">{t('instructions.scientific.taco.title')}</h4>
                <p className="text-gray-600">{t('instructions.scientific.taco.description')}</p>
              </div>

              {/* Methodology */}
              <div>
                <h4 className="font-medium mb-2">{t('instructions.scientific.methodology.title')}</h4>
                <p className="text-gray-600">{t('instructions.scientific.methodology.description')}</p>
              </div>

              {/* Importance */}
              <div>
                <h4 className="font-medium mb-2">{t('instructions.scientific.importance.title')}</h4>
                <p className="text-gray-600">{t('instructions.scientific.importance.description')}</p>
                <ul className="list-disc list-inside mt-2 text-gray-600">
                  <li>{t('instructions.scientific.importance.point1')}</li>
                  <li>{t('instructions.scientific.importance.point2')}</li>
                  <li>{t('instructions.scientific.importance.point3')}</li>
                </ul>
              </div>

              {/* History */}
              <div>
                <h4 className="font-medium mb-2">{t('instructions.scientific.history.title')}</h4>
                <p className="text-gray-600">{t('instructions.scientific.history.description')}</p>
                <ul className="list-disc list-inside mt-2 text-gray-600">
                  <li>{t('instructions.scientific.history.phase1')}</li>
                  <li>{t('instructions.scientific.history.phase2')}</li>
                  <li>{t('instructions.scientific.history.current')}</li>
                </ul>
              </div>

              {/* Benefits */}
              <div>
                <h4 className="font-medium mb-2">{t('instructions.scientific.benefits.title')}</h4>
                <ul className="list-disc list-inside text-gray-600">
                  <li>{t('instructions.scientific.benefits.point1')}</li>
                  <li>{t('instructions.scientific.benefits.point2')}</li>
                  <li>{t('instructions.scientific.benefits.point3')}</li>
                  <li>{t('instructions.scientific.benefits.point4')}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};