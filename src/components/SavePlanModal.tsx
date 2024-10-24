import React, { useState } from 'react';
import { X } from 'lucide-react';
import type { MealPlan } from '../types';

interface SavePlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string) => void;
  existingName?: string;
}

export const SavePlanModal = ({ isOpen, onClose, onSave, existingName }: SavePlanModalProps) => {
  const [name, setName] = useState(existingName || '');

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onSave(name.trim());
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Save Meal Plan</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSave}>
          <div className="mb-4">
            <label htmlFor="planName" className="block text-sm font-medium text-gray-700 mb-1">
              Plan Name
            </label>
            <input
              type="text"
              id="planName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded-md"
              placeholder="Enter plan name"
              autoFocus
            />
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
            >
              Save Plan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};