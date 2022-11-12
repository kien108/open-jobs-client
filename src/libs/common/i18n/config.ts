import vi from "./translations/vi.json";
import en from "./translations/en.json";
import { initReactI18next } from "react-i18next";
import i18next from "i18next";
import LngDetector from "i18next-browser-languagedetector";

export const resources = {
   en: { translation: en },
   vi: { translation: vi },
} as const;

const i18n = i18next.createInstance({
   interpolation: {
      escapeValue: false,
   },
   resources,
});

i18n.use(LngDetector).use(initReactI18next).init();

export default i18n;
