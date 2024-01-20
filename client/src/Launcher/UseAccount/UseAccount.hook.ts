import { useState, useMemo, useCallback } from 'react'

export type AccountUser = object
export type AccountSettings = {
  theme: 'light' | 'dark'
}

export type Account = {
  user: null | AccountUser
  settings: null | AccountSettings
}

export const DEFAULT_ACCOUNT_STATE = {
  user: null,
  settings: null,
}

export type UseAccountReturnOptions = Account & {
  //actions
  login: () => void,
  logout: () => void,
  // selectors
  isAuthorized: () => boolean
}

/**
 * Hook descriptions
 *
 * @example
 * const options = useAccount(conf)
 */
export const useAccount = (): UseAccountReturnOptions | null => {
  const [account, setAccount] = useState<Account>(DEFAULT_ACCOUNT_STATE)

  const login = useCallback(() => setAccount({ user: {}, settings: null }), [])
  const logout = useCallback(() => setAccount(DEFAULT_ACCOUNT_STATE), [])
  const isAuthorized = useCallback(() => !!account.user, [account.user])

  return useMemo<UseAccountReturnOptions>(
    () => ({ ...account, login, logout, isAuthorized }),
    [account, isAuthorized, login, logout],
  )
}

export default useAccount
