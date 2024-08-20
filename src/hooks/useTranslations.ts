import { useSelector } from 'react-redux';
import { RootState } from '../app/store';  // Import the RootState type
import en from '../locales/en.json';
import es from '../locales/es.json';

interface Translations {
  [key: string]: { [key: string]: string };
}

function useTranslations() {
  const language = useSelector((state: RootState) => state.language.language);

  const translations: Translations = {
    en,
    es
  };
  return translations[language] || translations['en'];  // Default to 'en' if language is not found
}

export default useTranslations;
