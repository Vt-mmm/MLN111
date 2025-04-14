import en from './en';
import vi from './vi';

export const languages = {
  en,
  vi,
};

export type Language = keyof typeof languages;
export type TranslationKey = keyof typeof languages.en;

export default languages; 