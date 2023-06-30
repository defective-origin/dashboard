import React, { useContext } from 'react'
import { Languages, t } from 'locale'

export type LocaleProviderState = Languages

export type LocaleProviderOptions = {
  current: LocaleProviderState,
  languages: Languages[],
  t: typeof t,
  change: (patch: LocaleProviderState) => void,
}

export const DEFAULT_LOCALE_PROVIDER_OPTIONS: LocaleProviderOptions = {
  current: 'en',
  languages: ['en', 'ru'],
  t: () => '',
  change: () => {},
}

export const LocaleProviderContext = React.createContext(DEFAULT_LOCALE_PROVIDER_OPTIONS)
LocaleProviderContext.displayName = 'LocaleProviderContext'

export function useLocaleProvider<T extends LocaleProviderOptions>(): T {
  return useContext(LocaleProviderContext) as T
}

export default useLocaleProvider
