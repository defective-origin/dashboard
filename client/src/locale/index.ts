// import i18n from 'i18next';
// import { initReactI18next } from 'react-i18next';

import messages_en from './en.json'
import messages_ru from './ru.json'
import messages_zh from './zh.json'
import messages_hi from './hi.json'
import messages_ar from './ar.json'
import messages_ja from './ja.json'
import messages_de from './de.json'
import messages_fr from './fr.json'
import messages_es from './es.json'
import messages_sv from './sv.json'
import messages_tr from './tr.json'
import messages_pt from './pt.json'
import messages_bn from './bn.json'

export const LOCALES: Record<string, string> = {
  Arabic: 'ar',
  Bengali: 'bn',
  German: 'de',
  English: 'en',
  Spanish: 'es',
  French: 'fr',
  Hindi: 'hi',
  Japanese: 'ja',
  Portuguese: 'pt',
  Russian: 'ru',
  Swedish: 'sv',
  Turkish: 'tr',
  Chinese: 'zh',
}

export const l10n = {
  [LOCALES.English]: messages_en,
  [LOCALES.Russian]: messages_ru,
  [LOCALES.Chinese]: messages_zh,
  [LOCALES.Hindi]: messages_hi,
  [LOCALES.Arabic]: messages_ar,
  [LOCALES.Japanese]: messages_ja,
  [LOCALES.German]: messages_de,
  [LOCALES.French]: messages_fr,
  [LOCALES.Spanish]: messages_es,
  [LOCALES.Swedish]: messages_sv,
  [LOCALES.Turkish]: messages_tr,
  [LOCALES.Portuguese]: messages_pt,
  [LOCALES.Bengali]: messages_bn,
}

export const LANGUAGE_OPTIONS = Object.keys(LOCALES).map((key, index) => ({
  code: LOCALES[key].toUpperCase(),
  name: key,
  coverage: index * 8,
}))

export const DEFAULT_LOCALE = 'en'
export const LOCALE_CODE_SPLIT_REGEXP = /[-_]/

export function getLocaleCode(): string {
  return (navigator.languages && navigator.languages[0])
      || navigator.language
      || DEFAULT_LOCALE
}

export function getLocale(): string {
  const code = getLocaleCode()
  return code.split(LOCALE_CODE_SPLIT_REGEXP)[0]
}

export function getRegion(): string {
  const code = getLocaleCode()
  return code.split(LOCALE_CODE_SPLIT_REGEXP)[1]
}

// // the translations
// // (tip move them in a JSON file and import them,
// // or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
// const resources = {
//   en: {
//     translation: {
//       "Welcome to React": "Welcome to React and react-i18next"
//     },
//   },
//   fr: {
//     translation: {
//       "Welcome to React": "Bienvenue à React et react-i18next"
//     },
//   },
// }

// i18n
//   .use(initReactI18next) // passes i18n down to react-i18next
//   .init({
//     resources,
//     lng: "en", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
//     // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
//     // if you're using a language detector, do not define the lng option

//     interpolation: {
//       escapeValue: false, // react already safes from xss
//     },
//   })

// export default i18n
