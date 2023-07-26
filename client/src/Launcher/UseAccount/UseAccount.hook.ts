import { useMemo } from 'react'

// ---| common |---
import { useObject } from 'common/hooks'

export type AccountUser = object
export type AccountSettings = {
  theme: 'light' | 'dark'
}

export type AccountState = {
  user: null | AccountUser
  settings: null | AccountSettings
}

export const DEFAULT_ACCOUNT_STATE: AccountState = {
  user: null,
  settings: null,
}

export type AccountActions = {
  login: () => void,
  logout: () => void,
}

export type AccountSelectors = {
  isAuthorized: () => boolean
}

export type UseAccountReturnOptions = AccountState & AccountActions & AccountSelectors

/**
 * Hook descriptions
 *
 * @example
 * const options = useAccount(conf)
 */
export const useAccount = (): UseAccountReturnOptions | null => {
  const state = useObject(DEFAULT_ACCOUNT_STATE)

  const actions = useMemo<AccountActions>(() => ({
    login: () => state.merge({ user: {} }),
    logout: () => state.merge({ user: null }),
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [])

  const selectors = useMemo<AccountSelectors>(() => ({
    isAuthorized: () => !!state.current.user,
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo<UseAccountReturnOptions>(() => ({ ...state.current, ...actions, ...selectors }), [state.current])
}

export default useAccount
