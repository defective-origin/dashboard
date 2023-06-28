import React, { useContext } from 'react'

export type ThemeProviderState = null | object

export type ThemeProviderOptions = {
  current: ThemeProviderState,
  change: (patch: Partial<Exclude<ThemeProviderState, 'null'>>) => void,
  isLoaded: boolean,
}

export const DEFAULT_THEME_PROVIDER_OPTIONS: ThemeProviderOptions = {
  current: null,
  change: () => {},
  isLoaded: false,
}

export const ThemeProviderContext = React.createContext(DEFAULT_THEME_PROVIDER_OPTIONS)

export function useThemeProvider<T extends ThemeProviderOptions>(): T {
  return useContext(ThemeProviderContext) as T
}

export default useThemeProvider
