import React from 'react'
import i18next from 'i18next'
import { I18nextProvider, initReactI18next } from 'react-i18next'
import Backend from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
// don't want to use this?
// have a look at the Quick start guide 
// for passing in lng and translations on init

// ---| core |---
import { ENV } from 'Launcher'

// ---| self |---
import i18n from './i18n'
import l10n from './l10n'
import { getLocaleCode } from './locale.tool'

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




i18next
  // load translation using http -> see /public/locales (i.e. https://github.com/i18next/react-i18next/tree/master/example/react/public/locales)
  // learn more: https://github.com/i18next/i18next-http-backend
  // want your translations to be loaded from a professional CDN? => https://github.com/locize/react-tutorial#step-2---use-the-locize-cdn
  .use(Backend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    resources: i18n,
    lng: 'en',
    fallbackLng: 'en',
    debug: ENV.MODE.IS_DEV,
    keySeparator: false,
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    }
  })

export type LocaleProviderProps = React.PropsWithChildren

export function LocaleProvider(props: LocaleProviderProps): JSX.Element {
  const { children } = props

  return <I18nextProvider i18n={i18next}>{children}</I18nextProvider>
}

LocaleProvider.displayName = 'LocaleProvider'

export default LocaleProvider


export const { t } = i18next
export { useTranslation } from 'react-i18next'
