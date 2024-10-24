import React from 'react';
import { UserCircle } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import { profiles, convertProfileToGoals } from '../data/profiles';
import type { Goals } from '../types';

interface ProfileSelectorProps {
  onProfileSelect: (goals: Goals) => void;
}

export const ProfileSelector = ({ onProfileSelect }: ProfileSelectorProps) => {
  const { t } = useTranslation();

  const handleProfileChange = (profileName: string) => {
    const selectedProfile = profiles.find(p => p.profile === profileName);
    if (selectedProfile) {
      const goals = convertProfileToGoals(selectedProfile);
      onProfileSelect(goals);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center space-x-4 mb-4">
        <UserCircle size={24} className="text-emerald-600" />
        <h2 className="text-xl font-semibold text-gray-800">{t('profile.title')}</h2>
      </div>
      
      <select
        onChange={(e) => handleProfileChange(e.target.value)}
        className="w-full p-2 border rounded-md bg-white"
        defaultValue=""
      >
        <option value="" disabled>{t('profile.select')}</option>
        {profiles.map((profile) => (
          <option key={profile.profile} value={profile.profile}>
            {t(`profile.types.${profile.profile.toLowerCase().replace(/\s+/g, '_')}`)}
          </option>
        ))}
      </select>
      
      <p className="mt-2 text-sm text-gray-500">
        {t('profile.description')}
      </p>
    </div>
  );
};