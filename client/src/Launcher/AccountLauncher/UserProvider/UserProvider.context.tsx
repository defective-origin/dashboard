import React, { useContext } from 'react'

export type UserProviderState = null | object

export type UserProviderOptions = {
  current: UserProviderState,
  login: () => void,
  logout: () => void,
  isAuthorized: boolean,
}

export const DEFAULT_USER_PROVIDER_OPTIONS: UserProviderOptions = {
  current: null,
  login: () => {},
  logout: () => {},
  isAuthorized: false,
}

export const UserProviderContext = React.createContext(DEFAULT_USER_PROVIDER_OPTIONS)
UserProviderContext.displayName = 'UserProviderContext'

export function useUserProvider<T extends UserProviderOptions>(): T {
  return useContext(UserProviderContext) as T
}

export default useUserProvider
