import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import enTranslations from '../i18n/en';
import ptBRTranslations from '../i18n/pt-BR';

type Language = 'en' | 'pt-BR';
type TranslationKey = keyof typeof enTranslations;

interface TranslationState {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

export const useTranslation = create<TranslationState>()(
  persist(
    (set, get) => ({
      language: 'pt-BR',
      setLanguage: (language: Language) => set({ language }),
      t: (key: string) => {
        const translations = get().language === 'en' ? enTranslations : ptBRTranslations;
        const keys = key.split('.');
        let value: any = translations;
        
        for (const k of keys) {
          value = value?.[k];
          if (value === undefined) return key;
        }
        
        return value as string;
      },
    }),
    {
      name: 'language-storage',
    }
  )
);