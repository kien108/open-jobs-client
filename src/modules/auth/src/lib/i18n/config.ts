import i18next from "i18next";
import vi from "./translations/vi.json";
import en from "./translations/en.json";
import { initReactI18next } from "react-i18next";
import { commonEn, commonVi } from "../../../../../libs/common";

export const resources = {
   en: { common: commonEn, translation: en },
   vi: { common: commonVi, translation: vi },
} as const;

const i18n = i18next.createInstance({
   lng: "en",
   interpolation: {
      escapeValue: false,
   },
   resources,
});

i18n.use(initReactI18next).init();

export default i18n;
