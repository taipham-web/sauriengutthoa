// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import vi from './locales/vi/translation.json';
import en from './locales/en/translation.json';
import zh from './locales/zh/translation.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      vi: { translation: vi },
      en: { translation: en },
      zh: { translation: zh },
    },
    fallbackLng: 'vi',
    supportedLngs: ['vi', 'en', 'zh'],
    detection: {
      // Thứ tự ưu tiên: localStorage trước, sau đó browser
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'app_language',
      caches: ['localStorage'],
    },
    interpolation: {
      escapeValue: false, // React đã tự escape
    },
  });

export default i18n;
