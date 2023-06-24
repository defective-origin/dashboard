import React, { useContext } from 'react'

export type UserProviderOptions = {
  user: null | string,
  login: () => void,
  logout: () => void,
  isAuthorized: boolean,
}

export const DEFAULT_USER_PROVIDER_OPTIONS: UserProviderOptions = {
  user: null,
  login: () => {},
  logout: () => {},
  isAuthorized: false,
}

export const UserProviderContext = React.createContext(DEFAULT_USER_PROVIDER_OPTIONS)

export function useUserProvider<T extends UserProviderOptions>(): T {
  return useContext(UserProviderContext) as T
}

export default useUserProvider