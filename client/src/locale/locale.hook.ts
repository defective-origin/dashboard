import { useMemo } from 'react'
import i18next, { Callback } from 'i18next'

// TODO: (kseniya_boldak) add locale.context.tsx

// ---| self |---
import { Languages, TranslateKeys } from './locale.conf'


export const t = (key?: TranslateKeys, options?: object) => key && i18next.t(key, options)
export const changeLanguage = (key?: Languages, callback?: Callback) => i18next.changeLanguage(key, callback)


export type UseLocaleReturnOptions = {
  t: typeof t
  language: Languages
  languages: Languages[]
  changeLanguage: typeof changeLanguage
}

// TODO: (kseniya_boldak) update generator template and readme files

/**
 * Hook descriptions
 *
 * @example
 * const options = useLocale(conf)
 */
export const useLocale = (): UseLocaleReturnOptions => {
  return useMemo(() => ({
    language: 'en',
    languages: i18next.languages as Languages[],
    changeLanguage,
    t,
  }), [])
}

export default useLocale
