import { useState, useMemo, useCallback } from 'react'
import { ThemeVariant } from 'theme'
import api, { ApiResponse } from './api.endpoint'
import { User, USERS } from './user.endpoint'
import { Id, IsoDate } from './api.type'


const ENDPOINT = 'account'

export type AccountRole = 'ADMIN' | 'ANONYMOUS' | 'USER'
export type AccountStaffPermission = 'CREATE' | 'READ' | 'UPDATE' | 'DELETE'

export type AccountStaff = {
  user: Id
  active: boolean
  expiration: IsoDate
  permission: AccountStaffPermission
}

export type AccountSettings = {
  theme: ThemeVariant
  language: string
  role: AccountRole
}

export type Account = {
  user: User
  settings: AccountSettings
  staff: AccountStaff[]
}

export const ACCOUNT: Account = {
  user: USERS[0],
  settings: {
    theme: 'light',
    role: 'ANONYMOUS',
    language: 'EN',
  },
  staff: [
    {
      user: 0,
      active: false,
      permission: 'UPDATE',
      expiration: new Date().toISOString(),
    },
  ],
}

api.reg(ENDPOINT, ACCOUNT)

export type AccountManager = ApiResponse<Account> & {
  login: () => void,
  logout: () => void,
  isAuthorized: () => boolean
  update: (settings: Partial<Account>) => void
}

export const useAccount = (): AccountManager => {
  const response = api.useOptionsEndpoint<Account>(ENDPOINT)
  const [account, update] = useState<Partial<Account> | null>(ACCOUNT)

  const login = useCallback(() => update(ACCOUNT), [])
  const logout = useCallback(() => update(null), [])
  const isAuthorized = useCallback(() => !!account, [account])

  return useMemo(
    () => ({ ...response, ...account, update, login, logout, isAuthorized }),
    [response, account, login, logout, isAuthorized],
  )
}
