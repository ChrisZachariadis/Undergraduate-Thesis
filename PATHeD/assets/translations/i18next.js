import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

import en from './en.json';
import gr from './gr.json';
import pt from './pt.json';
import hu from './hu.json';
import si from './si.json';
import cz from './cz.json';
import fr from './fr.json';
import es from './es.json';
import nl from './nl.json';

i18n.use(initReactI18next).init({
  resources: {
    en: {translation: en},
    gr: {translation: gr},
    pt: {translation: pt},
    hu: {translation: hu},
    si: {translation: si},
    cz: {translation: cz},
    fr: {translation: fr},
    es: {translation: es},
    nl: {translation: nl},
  },
  lng: 'en', // Set the default language
  fallbackLng: 'en', // Fallback language if a translation is missing
  compatibilityJSON: 'v3',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
