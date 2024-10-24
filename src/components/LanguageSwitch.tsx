import React from 'react';
import { Globe } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

export const LanguageSwitch = () => {
  const { language, setLanguage } = useTranslation();

  return (
    <button
      onClick={() => setLanguage(language === 'en' ? 'pt-BR' : 'en')}
      className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors"
      title={language === 'en' ? 'Mudar para Português' : 'Switch to English'}
    >
      <Globe size={20} />
      <span className="text-sm font-medium">{language === 'en' ? 'EN' : 'PT'}</span>
    </button>
  );
};