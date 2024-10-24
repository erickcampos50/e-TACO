import React from 'react';
import { X, Calendar } from 'lucide-react';
import type { SavedMealPlan } from '../types';

interface LoadPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoad: (planId: string) => void;
  savedPlans: SavedMealPlan[];
}

export const LoadPlanModal = ({ isOpen, onClose, onLoad, savedPlans }: LoadPlanModalProps) => {
  if (!isOpen) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Load Meal Plan</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>
        
        {savedPlans.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Calendar size={48} className="mx-auto mb-4 opacity-50" />
            <p>No saved meal plans found</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {savedPlans.map((plan) => (
              <div
                key={plan.id}
                className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer"
                onClick={() => onLoad(plan.id)}
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">{plan.name}</h3>
                  <span className="text-sm text-gray-500">
                    {formatDate(plan.updatedAt)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
        
        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};