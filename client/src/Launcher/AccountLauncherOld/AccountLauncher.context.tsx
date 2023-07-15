import React, { useContext } from 'react'

export type AccountUser = object
export type AccountSettings = {
  theme: 'light' | 'dark'
}

export type AccountLauncherState = {
  user: null | AccountUser
  settings: null | AccountSettings
}

export const DEFAULT_ACCOUNT_LAUNCHER_STATE: AccountLauncherState = {
  user: null,
  settings: null,
}

export type AccountLauncherActions = {
  login: () => void,
  logout: () => void,
  isAuthorized: boolean,
}

export type AccountLauncherOptions = AccountLauncherState & AccountLauncherActions

export const DEFAULT_ACCOUNT_LAUNCHER_OPTIONS: AccountLauncherOptions = {
  ...DEFAULT_ACCOUNT_LAUNCHER_STATE,
  login: () => {},
  logout: () => {},
  isAuthorized: false,
}

export const AccountLauncherContext = React.createContext(DEFAULT_ACCOUNT_LAUNCHER_OPTIONS)
AccountLauncherContext.displayName = 'AccountLauncherContext'

export function useAccountLauncher(): AccountLauncherOptions {
  return useContext(AccountLauncherContext)
}

export default useAccountLauncher
