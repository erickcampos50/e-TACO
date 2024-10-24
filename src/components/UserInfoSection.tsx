import React from 'react';
import { UserCircle, User } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import type { UserInfo } from '../types';

interface UserInfoSectionProps {
  userInfo: UserInfo;
  onUpdate: (info: UserInfo) => void;
}

export const UserInfoSection = ({ userInfo, onUpdate }: UserInfoSectionProps) => {
  const { t } = useTranslation();

  const handleNutritionistChange = (field: keyof UserInfo['nutritionist'], value: string) => {
    onUpdate({
      ...userInfo,
      nutritionist: {
        ...userInfo.nutritionist,
        [field]: value,
      },
    });
  };

  const handlePatientChange = (field: keyof UserInfo['patient'], value: string | number) => {
    onUpdate({
      ...userInfo,
      patient: {
        ...userInfo.patient,
        [field]: field === 'age' || field === 'weight' || field === 'height' 
          ? Number(value) 
          : value,
      },
    });
  };

  return (
    <div className="space-y-6">
      {/* Nutritionist Information */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center space-x-3 mb-4">
          <UserCircle className="text-emerald-600" size={24} />
          <h2 className="text-xl font-semibold text-gray-800">{t('nutritionist.title')}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('nutritionist.name')}
            </label>
            <input
              type="text"
              value={userInfo.nutritionist.name}
              onChange={(e) => handleNutritionistChange('name', e.target.value)}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('nutritionist.crn')}
            </label>
            <input
              type="text"
              value={userInfo.nutritionist.crn}
              onChange={(e) => handleNutritionistChange('crn', e.target.value)}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('nutritionist.phone')}
            </label>
            <input
              type="tel"
              value={userInfo.nutritionist.phone}
              onChange={(e) => handleNutritionistChange('phone', e.target.value)}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('nutritionist.email')}
            </label>
            <input
              type="email"
              value={userInfo.nutritionist.email}
              onChange={(e) => handleNutritionistChange('email', e.target.value)}
              className="w-full p-2 border rounded-md"
            />
          </div>
        </div>
      </div>

      {/* Patient Information */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center space-x-3 mb-4">
          <User className="text-emerald-600" size={24} />
          <h2 className="text-xl font-semibold text-gray-800">{t('patient.title')}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('patient.name')}
            </label>
            <input
              type="text"
              value={userInfo.patient.name}
              onChange={(e) => handlePatientChange('name', e.target.value)}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('patient.age')}
            </label>
            <input
              type="number"
              value={userInfo.patient.age}
              onChange={(e) => handlePatientChange('age', e.target.value)}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('patient.gender')}
            </label>
            <select
              value={userInfo.patient.gender}
              onChange={(e) => handlePatientChange('gender', e.target.value)}
              className="w-full p-2 border rounded-md"
            >
              <option value="M">Masculino</option>
              <option value="F">Feminino</option>
              <option value="O">Outro</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('patient.weight')}
            </label>
            <input
              type="number"
              value={userInfo.patient.weight}
              onChange={(e) => handlePatientChange('weight', e.target.value)}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('patient.height')}
            </label>
            <input
              type="number"
              value={userInfo.patient.height}
              onChange={(e) => handlePatientChange('height', e.target.value)}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('patient.phone')}
            </label>
            <input
              type="tel"
              value={userInfo.patient.phone}
              onChange={(e) => handlePatientChange('phone', e.target.value)}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('patient.email')}
            </label>
            <input
              type="email"
              value={userInfo.patient.email}
              onChange={(e) => handlePatientChange('email', e.target.value)}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('patient.observations')}
            </label>
            <textarea
              value={userInfo.patient.observations}
              onChange={(e) => handlePatientChange('observations', e.target.value)}
              className="w-full p-2 border rounded-md"
              rows={4}
            />
          </div>
        </div>
      </div>
    </div>
  );
};