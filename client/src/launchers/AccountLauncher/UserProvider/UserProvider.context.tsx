import React, { useContext } from 'react'

export type UserProviderOptions = {
  user: null | string,
  login: () => void,
  logout: () => void,
  isAuthorized: boolean,
}

export const UserProviderContext = React.createContext<UserProviderOptions>({
  user: null,
  login: () => {},
  logout: () => {},
  isAuthorized: false,
})

export function useUserProvider<T extends UserProviderOptions>(): T {
  return useContext(UserProviderContext) as T
}

export default useUserProvider
