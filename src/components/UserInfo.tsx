import React, { useState } from 'react';
import { User, Phone, Mail, FileText, UserCircle, ChevronDown, ChevronUp } from 'lucide-react';
import type { NutritionistInfo, PatientInfo } from '../types';

interface UserInfoProps {
  nutritionist: NutritionistInfo;
  patient: PatientInfo;
  onUpdate: (updates: { nutritionist?: NutritionistInfo; patient?: PatientInfo }) => void;
}

export const UserInfo = ({ nutritionist, patient, onUpdate }: UserInfoProps) => {
  const [isNutritionistExpanded, setIsNutritionistExpanded] = useState(false);
  const [isPatientExpanded, setIsPatientExpanded] = useState(false);

  return (
    <div className="space-y-6 mb-6">
      {/* Nutritionist Information */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <button 
          onClick={() => setIsNutritionistExpanded(!isNutritionistExpanded)}
          className="w-full flex items-center justify-between"
        >
          <div className="flex items-center space-x-3">
            <UserCircle className="text-primary-600" size={24} />
            <h2 className="text-xl font-semibold text-gray-800">Dados do Nutricionista</h2>
          </div>
          {isNutritionistExpanded ? (
            <ChevronUp className="text-gray-500" size={24} />
          ) : (
            <ChevronDown className="text-gray-500" size={24} />
          )}
        </button>
        
        {isNutritionistExpanded && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nome
              </label>
              <input
                type="text"
                value={nutritionist.name}
                onChange={(e) => onUpdate({ nutritionist: { ...nutritionist, name: e.target.value } })}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                CRN
              </label>
              <input
                type="text"
                value={nutritionist.license}
                onChange={(e) => onUpdate({ nutritionist: { ...nutritionist, license: e.target.value } })}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Telefone
              </label>
              <input
                type="tel"
                value={nutritionist.phone}
                onChange={(e) => onUpdate({ nutritionist: { ...nutritionist, phone: e.target.value } })}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                E-mail
              </label>
              <input
                type="email"
                value={nutritionist.email}
                onChange={(e) => onUpdate({ nutritionist: { ...nutritionist, email: e.target.value } })}
                className="w-full p-2 border rounded-md"
              />
            </div>
          </div>
        )}
      </div>

      {/* Patient Information */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <button 
          onClick={() => setIsPatientExpanded(!isPatientExpanded)}
          className="w-full flex items-center justify-between"
        >
          <div className="flex items-center space-x-3">
            <User className="text-primary-600" size={24} />
            <h2 className="text-xl font-semibold text-gray-800">Dados do Paciente</h2>
          </div>
          {isPatientExpanded ? (
            <ChevronUp className="text-gray-500" size={24} />
          ) : (
            <ChevronDown className="text-gray-500" size={24} />
          )}
        </button>
        
        {isPatientExpanded && (
          <div className="mt-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nome
                </label>
                <input
                  type="text"
                  value={patient.name}
                  onChange={(e) => onUpdate({ patient: { ...patient, name: e.target.value } })}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Idade
                </label>
                <input
                  type="number"
                  value={patient.age}
                  onChange={(e) => onUpdate({ patient: { ...patient, age: Number(e.target.value) } })}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Gênero
                </label>
                <select
                  value={patient.gender}
                  onChange={(e) => onUpdate({ patient: { ...patient, gender: e.target.value as 'M' | 'F' | 'O' } })}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="M">Masculino</option>
                  <option value="F">Feminino</option>
                  <option value="O">Outro</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Peso (kg)
                </label>
                <input
                  type="number"
                  value={patient.weight}
                  onChange={(e) => onUpdate({ patient: { ...patient, weight: Number(e.target.value) } })}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Altura (cm)
                </label>
                <input
                  type="number"
                  value={patient.height}
                  onChange={(e) => onUpdate({ patient: { ...patient, height: Number(e.target.value) } })}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Telefone
                </label>
                <input
                  type="tel"
                  value={patient.phone}
                  onChange={(e) => onUpdate({ patient: { ...patient, phone: e.target.value } })}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  E-mail
                </label>
                <input
                  type="email"
                  value={patient.email}
                  onChange={(e) => onUpdate({ patient: { ...patient, email: e.target.value } })}
                  className="w-full p-2 border rounded-md"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Observações
              </label>
              <textarea
                value={patient.observations}
                onChange={(e) => onUpdate({ patient: { ...patient, observations: e.target.value } })}
                className="w-full p-2 border rounded-md"
                rows={4}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};