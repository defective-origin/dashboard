import React, { useContext } from 'react'

export type ThemeProviderState = 'light' | 'dark'

export type ThemeProviderOptions = {
  current: ThemeProviderState,
  opposite: ThemeProviderState,
  is: (theme: ThemeProviderState) => boolean,
  toggle: () => void,
  change: (theme: ThemeProviderState) => void,
}

export const DEFAULT_THEME_PROVIDER_OPTIONS: ThemeProviderOptions = {
  current: 'light',
  opposite: 'dark',
  is: () => true,
  toggle: () => { },
  change: () => { },
}

export const ThemeProviderContext = React.createContext(DEFAULT_THEME_PROVIDER_OPTIONS)

export function useThemeProvider<T extends ThemeProviderOptions>(): T {
  return useContext(ThemeProviderContext) as T
}

export default useThemeProvider
