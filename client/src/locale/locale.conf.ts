import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import Backend from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'

// ---| core |---
import { ENV } from 'Launcher/Launcher.conf'

// ---| self |---
import i18n from './i18n'
import l10n from './l10n'


export type FlattenObjectKeys<
  T extends Record<string, unknown>,
  Sep extends string = '.',
  Key = keyof T
> = Key extends string
  ? T[Key] extends Record<string, unknown>
    ? `${Key}${Sep}${FlattenObjectKeys<T[Key], Sep>}`
    : `${Key}`
  : never


export type Languages = keyof typeof i18n
export type TranslateKeys = FlattenObjectKeys<typeof i18n.en>

// TODO: (kseniya_boldak) add provider export

/**
 * // the translations
 * // (tip move them in a JSON file and import them,
 * // or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
 * const resources = {
 *   en: {
 *     translation: {
 *       'Welcome to React': 'Welcome to React and react-i18next'
 *     },
 *   },
 *   fr: {
 *     translation: {
 *       'Welcome to React': 'Bienvenue à React et react-i18next'
 *     },
 *   },
 * }
 */
i18next
  // load translation using http -> see /public/locales (i.e. https://github.com/i18next/react-i18next/tree/master/example/react/public/locales)
  // learn more: https://github.com/i18next/i18next-http-backend
  // want your translations to be loaded from a professional CDN? => https://github.com/locize/react-tutorial#step-2---use-the-locize-cdn
  .use(Backend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next) // passes i18n down to react-i18next
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    resources: Object.keys(i18n).reduce((acc, key) => ({ ...acc, [key]: { translation: i18n[key as Languages] } }), {}),
    supportedLngs: Object.keys(i18n),

    // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option
    // lng: 'en',

    // preload?: false | readonly string[];

    // Allows 'en-US' and 'en-UK' to be implcitly supported when 'en' is supported
    nonExplicitSupportedLngs: true,

    fallbackLng: 'en',
    debug: ENV.MODE.DEV,
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  })

export default i18next
