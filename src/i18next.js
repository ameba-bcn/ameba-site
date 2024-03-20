import i18next from "i18next";
import translations_es from "./translations/es/translation.json";
import translations_cat from "./translations/cat/translation.json";
import I18nextBrowserLanguageDetector from "i18next-browser-languagedetector";

const storedLang = localStorage.getItem("i18nextLng");

i18next.use(I18nextBrowserLanguageDetector).init({
  resources: {
    es: {
      translation: translations_es,
    },
    ca: {
      translation: translations_cat,
    },
  },
  ns: ["common"],
  fallbackLng: "ca",
  supportedLngs: ["ca", "es"],
  debug: false,
  storedLang,
});

export default i18next;
