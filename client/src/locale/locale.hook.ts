import { useMemo } from 'react'
import i18next, { Callback } from 'i18next'

// ---| self |---
import { Languages, TranslateKeys } from './locale.conf'


export const t = <O extends object = object>(key?: TranslateKeys, options?: O) => key && i18next.t(key, options ?? {})
export const changeLanguage = (key?: Languages, callback?: Callback) => i18next.changeLanguage(key, callback)


export type LocaleReturnOptions = {
  t: typeof t
  language: Languages
  languages: Languages[]
  changeLanguage: typeof changeLanguage
}

/**
 * Hook descriptions
 *
 * @example
 * const options = useLocale(conf)
 */
export const useLocale = (): LocaleReturnOptions => {
  return useMemo(() => ({
    language: 'en',
    languages: i18next.languages as Languages[],
    changeLanguage,
    t,
  }), [])
}

export default useLocale
