import { useState, useMemo, useCallback } from 'react'
import api from '../api.endpoint'
import { User } from './User.endpoint'


const PATHNAME = 'account'

export type AccountStaffPermission = 'CREATE' | 'READ' | 'UPDATE' | 'DELETE'



export type Account = {
  user: User
}

export const useAccount = () => {
  // const response = api.useRestReadEndpoint<Account>(PATHNAME) // should be called before AppProvider
  const [account, update] = useState<Partial<Account> | null>(null)

  const login = useCallback(() => update({}), [])
  const logout = useCallback(() => update(null), [])
  const isAuthorized = useCallback(() => !!account, [account])


  return useMemo(
    () => ({ update, login, logout, isAuthorized }),
    [login, logout, isAuthorized],
  )

  // return useMemo(
  //   () => ({ ...response, ...response.data, update, login, logout, isAuthorized }),
  //   [response, login, logout, isAuthorized],
  // )
}
