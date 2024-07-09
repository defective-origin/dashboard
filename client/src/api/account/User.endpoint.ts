import { useMemo } from 'react'
import { ChangeStamps, Id } from '../api.type'
import api from '../api.endpoint'


const PATHNAME = 'users'

export type UserRole = 'ADMIN' | 'USER' | 'TEMPORARY' | 'SYSTEM'
export type UserStatus = 'ACTIVE' | 'INACTIVE' | 'DELETED'
export type UserSettingsTheme = 'LIGHT' | 'DARK'
export type User = ChangeStamps & {
  id: string
  name: string
  email: string
  image: string
  role: UserRole
  status: UserStatus
  settings: {
    language: string
    theme: UserSettingsTheme
  }
}

export const useUser = (id?: Id) => api.useRestReadEndpoint<User>(`${PATHNAME}/${id}`, { enabled: !!id })
export const useUsers = () => api.useRestReadEndpoint<User[]>(PATHNAME)

export const useUserMutations = () => {
  const create = api.useRestCreateEndpoint<User>(PATHNAME)
  const update = api.useRestUpdateEndpoint<User>(PATHNAME)
  const remove = api.useRestDeleteEndpoint(PATHNAME)

  return useMemo(() => ({ create, update, remove }), [create, remove, update])
}
