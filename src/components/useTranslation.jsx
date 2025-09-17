import { useState } from 'react';
import { translations } from '../utils/translate';

const defaultLanguage = 'en'; 

export const useTranslation = () => {
  const [language, setLanguage] = useState(defaultLanguage);

  const t = (key) => {
    return translations[language] && translations[language][key]
      ? translations[language][key]
      : translations[defaultLanguage][key] || key;
  };

  return { t, language, setLanguage };
};
