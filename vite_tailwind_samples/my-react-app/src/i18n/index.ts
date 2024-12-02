import { initReactI18next } from "react-i18next";
import i18next from "i18next";
import detector from "i18next-browser-languagedetector";
import en from "./en";
import ja from "./ja";

// NOTE: app.tsx か main.tsx にこのファイルをimportするのを忘れずに！

export const LANGUAGES: {
  value: string;
  label: string;
}[] = [
  {
    value: "en",
    label: "English",
  },
  {
    value: "ja",
    label: "日本語",
  },
];

// NOTE: keyとvalueが同一の記法であることに注意
const resources = {
  en,
  ja,
};

// Settings i18n
const i18n = i18next
  .use(initReactI18next)
  .use(detector)
  .init({
    resources,
    fallbackLng: "ja",
    interpolation: {
      escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
    // true にすると開発コンソールに i18next が正しく初期化されたことを示す出力が表示される
    debug: true,
  });

export default i18n;
