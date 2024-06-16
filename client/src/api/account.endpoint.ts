import { useState, useMemo, useCallback } from 'react'
import { ThemeVariant } from 'theme'
import api, { ApiResponse } from './api.endpoint'
import { Id } from './api.type'
import { useUser } from './user.endpoint'


const ENDPOINT = 'account'

export type AccountRole = 'ADMIN' | 'ANONYMOUS' | 'USER'

export type Account = {
  user: Id
  theme: ThemeVariant
  role: AccountRole
}

export const ACCOUNT: Account = { user: 0, theme: 'light', role: 'ANONYMOUS' }

api.reg(ENDPOINT, ACCOUNT)

export type AccountManager = ApiResponse<Account> & {
  login: () => void,
  logout: () => void,
  isAuthorized: () => boolean
  update: (settings: Partial<Account>) => void
}

export const useAccount = (): AccountManager => {
  const response = api.useOptionsEndpoint<Account>(ENDPOINT)
  const user = useUser(response.user)
  const [account, update] = useState<Partial<Account> | null>(ACCOUNT)

  const login = useCallback(() => update(ACCOUNT), [])
  const logout = useCallback(() => update(null), [])
  const isAuthorized = useCallback(() => !!account, [account])

  return useMemo(
    () => ({ loading: false, ...ACCOUNT, ...account, update, login, logout, isAuthorized }),
    [account, login, logout, isAuthorized],
  )
}
