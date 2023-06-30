import React, { useContext } from 'react'

export type AccountSettingsProviderState = null | {
  theme: 'light' | 'dark'
}

export type AccountSettingsProviderOptions = {
  current: AccountSettingsProviderState,
  change: (patch: Partial<Exclude<AccountSettingsProviderState, 'null'>>) => void,
  isLoaded: boolean,
}

export const DEFAULT_ACCOUNT_SETTINGS_PROVIDER_OPTIONS: AccountSettingsProviderOptions = {
  current: null,
  change: () => {},
  isLoaded: false,
}

export const AccountSettingsProviderContext = React.createContext(DEFAULT_ACCOUNT_SETTINGS_PROVIDER_OPTIONS)
AccountSettingsProviderContext.displayName = 'AccountSettingsProviderContext'

export function useAccountSettingsProvider<T extends AccountSettingsProviderOptions>(): T {
  return useContext(AccountSettingsProviderContext) as T
}

export default useAccountSettingsProvider
