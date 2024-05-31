import { useState, useMemo, useCallback } from 'react'
import { ThemeVariant } from 'theme'
import { ApiResponse, useOptionsEndpoint } from './api.endpoint'
import { USER, User } from './user.endpoint'


const ENDPOINT = 'account'

export type AccountRole = 'admin' | 'anonymous' | 'user'

export type Account = {
  user: User
  theme: ThemeVariant
  role: AccountRole
}

export const ACCOUNT: Account = { user: USER, theme: 'light', role: 'anonymous' }

export type AccountManager = ApiResponse<Account> & {
  login: () => void,
  logout: () => void,
  isAuthorized: () => boolean
  update: (settings: Partial<Account>) => void
}

export const useAccount = (): AccountManager => {
  const response = useOptionsEndpoint(ENDPOINT, ACCOUNT)
  const [account, update] = useState<Partial<Account> | null>(null)

  const login = useCallback(() => update(ACCOUNT), [])
  const logout = useCallback(() => update(null), [])
  const isAuthorized = useCallback(() => !!account, [account])

  return useMemo(
    () => ({ loading: false, ...ACCOUNT, ...account, update, login, logout, isAuthorized }),
    [account, login, logout, isAuthorized],
  )
}
