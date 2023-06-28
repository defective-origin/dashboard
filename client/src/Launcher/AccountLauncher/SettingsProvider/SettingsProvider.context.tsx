import React, { useContext } from 'react'

export type SettingsProviderState = null | object

export type SettingsProviderOptions = {
  current: SettingsProviderState,
  change: (patch: Partial<Exclude<SettingsProviderState, 'null'>>) => void,
  isLoaded: boolean,
}

export const DEFAULT_SETTINGS_PROVIDER_OPTIONS: SettingsProviderOptions = {
  current: null,
  change: () => {},
  isLoaded: false,
}

export const SettingsProviderContext = React.createContext(DEFAULT_SETTINGS_PROVIDER_OPTIONS)

export function useSettingsProvider<T extends SettingsProviderOptions>(): T {
  return useContext(SettingsProviderContext) as T
}

export default useSettingsProvider
