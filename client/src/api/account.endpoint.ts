import { useState, useMemo, useCallback } from 'react'
import { ThemeVariant } from 'theme'

export type AccountUser = object
export type Account = {
  user?: AccountUser
  theme?: ThemeVariant
}

export type AccountManager = Account & {
  login: () => void,
  logout: () => void,
  isAuthorized: () => boolean
  update: (settings: Partial<Account>) => void
}

export const useAccount = (): AccountManager => {
  const [account, update] = useState<Account | null>(null)

  const login = useCallback(() => update({ user: {}, theme: 'light' }), [])
  const logout = useCallback(() => update(null), [])
  const isAuthorized = useCallback(() => !!account, [account])

  return useMemo(
    () => ({ ...account, update, login, logout, isAuthorized }),
    [account, update, login, logout, isAuthorized],
  )
}

export default useAccount
