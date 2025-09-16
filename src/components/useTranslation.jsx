import { useState, useEffect } from 'react';
import { translations } from '../utils/translate';

const defaultLanguage = 'en'; // fallback language

export const useTranslation = () => {
  const [language, setLanguage] = useState(defaultLanguage);

  // t('key') will return the translation for the current language
  const t = (key) => {
    return translations[language] && translations[language][key]
      ? translations[language][key]
      : translations[defaultLanguage][key] || key;
  };

  return { t, language, setLanguage };
};
