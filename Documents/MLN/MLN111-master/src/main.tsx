import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { LanguageProvider } from './contexts/LanguageContext'
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import languages from './locales'; // Import resources from index.ts

// Prepare resources in the structure i18next expects: {lng: {namespace: keys}}
const resources = {
  en: {
    translation: languages.en // Wrap english translations in 'translation' namespace
  },
  vi: {
    translation: languages.vi // Wrap vietnamese translations in 'translation' namespace
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: resources, // Use the restructured resources object
    lng: 'vi', // default language
    fallbackLng: 'en', // fallback language
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
    // Explicitly set default namespace if needed, though 'translation' is default
    // ns: ['translation'],
    // defaultNS: 'translation'
  });

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </React.StrictMode>,
)
