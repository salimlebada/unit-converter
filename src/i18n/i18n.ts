
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// الترجمات
const resources = {
  en: {
    translation: {
      appName: "UniConvert",
      unitConverter: "Unit Converter",
      convertDescription: "Convert between different units of measurement",
      recentConversions: "Recent Conversions",
      noRecentConversions: "No recent conversions yet",
      value: "Value",
      from: "From",
      to: "To",
      result: "Result",
      copy: "Copy",
      copied: "Copied!",
      share: "Share",
      favorite: "Favorite",
      switchUnits: "Switch units",
      footer: "Built with ❤️ - Snkls studio",
      language: "Language",
      english: "English",
      arabic: "Arabic",
      spanish: "Spanish"
    },
  },
  ar: {
    translation: {
      appName: "يونيكونفرت",
      unitConverter: "محول الوحدات",
      convertDescription: "تحويل بين وحدات القياس المختلفة",
      recentConversions: "التحويلات الأخيرة",
      noRecentConversions: "لا توجد تحويلات حديثة بعد",
      value: "القيمة",
      from: "من",
      to: "إلى",
      result: "النتيجة",
      copy: "نسخ",
      copied: "تم النسخ!",
      share: "مشاركة",
      favorite: "المفضلة",
      switchUnits: "تبديل الوحدات",
      footer: "صنع بـ ❤️ - استوديو سنكلس",
      language: "اللغة",
      english: "الإنجليزية",
      arabic: "العربية",
      spanish: "الإسبانية"
    },
  },
  es: {
    translation: {
      appName: "UniConvert",
      unitConverter: "Conversor de Unidades",
      convertDescription: "Convertir entre diferentes unidades de medida",
      recentConversions: "Conversiones Recientes",
      noRecentConversions: "No hay conversiones recientes",
      value: "Valor",
      from: "De",
      to: "A",
      result: "Resultado",
      copy: "Copiar",
      copied: "¡Copiado!",
      share: "Compartir",
      favorite: "Favorito",
      switchUnits: "Cambiar unidades",
      footer: "Hecho con ❤️ - Snkls studio",
      language: "Idioma",
      english: "Inglés",
      arabic: "Árabe",
      spanish: "Español"
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
  });

export default i18n;
