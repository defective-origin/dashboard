import React, { useContext } from 'react'

export type UIThemeType = 'light' | 'dark'
export type UIModeType = 'view' | 'edit'

export type UISettingsProviderState = {
  theme: UIThemeType
  mode: UIModeType
}

export const DEFAULT_UI_SETTINGS_PROVIDER_STATE: UISettingsProviderState = {
  theme: 'light',
  mode: 'view'
}

export type UISettingsProviderOptions = {
  current: UISettingsProviderState,
  isTheme: (theme: UIThemeType) => boolean,
  change: (patch: Partial<UISettingsProviderState>) => void,
  toggleTheme: () => void,
  toggleMode: () => void,
}

export const DEFAULT_UI_SETTINGS_PROVIDER_OPTIONS: UISettingsProviderOptions = {
  current: DEFAULT_UI_SETTINGS_PROVIDER_STATE,
  isTheme: () => true,
  change: () => {},
  toggleTheme: () => {},
  toggleMode: () => {},
}

export const UISettingsProviderContext = React.createContext(DEFAULT_UI_SETTINGS_PROVIDER_OPTIONS)
UISettingsProviderContext.displayName = 'UISettingsProviderContext'

export function useUISettingsProvider<T extends UISettingsProviderOptions>(): T {
  return useContext(UISettingsProviderContext) as T
}

export default useUISettingsProvider
