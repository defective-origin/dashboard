import { ChangeStamps, Id, Ref } from '../api.types'
import api from '../api.endpoint'
import { useMemo, useState } from 'react'
import { useFunc } from 'hooks'


const PATHNAME = 'users'

export type StaffAccess = 'WIDGETS' | 'BOARDS' | 'ACCOUNTS'
export type Staff = {
  user: Ref
  active: boolean,
  access: StaffAccess[]
}

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
  staff: Staff[]
  bookmarks: Ref[]
  settings: {
    language: string
    theme: UserSettingsTheme
  }
}

export const useAuth = () => api.useRestReadEndpoint<User>('auth')
export const useUser = (id?: Id) => api.useRestReadEndpoint<User>(`${PATHNAME}/${id}`, { enabled: !!id })
export const useUsers = () => api.useRestReadEndpoint<User[]>(PATHNAME)
export const useUserMutations = () => api.useRestMutations<User>(PATHNAME)

export const useBookmark = (id?: Id) => {
  const bookmark = api.useRestReadEndpoint<Ref>(`${PATHNAME}/bookmarks/${id}`, { enabled: !!id })
  const bookmarkMutations = api.useRestMutations<Ref>(`${PATHNAME}/bookmarks`, {
    invalidate: () => [`${PATHNAME}/bookmarks/${id}`],
  })

  return useMemo(() => ({
    isOn: !!bookmark.data?.id,
    toggle: (ref?: Ref) => bookmark.data?.id
      ? bookmarkMutations.remove({ id: ref?.id })
      : bookmarkMutations.create({ id: ref?.id }),
  }), [bookmark.data?.id, bookmarkMutations])
}

export const useAccount = () => {
  const user = useAuth()
  const [isAuthorized, setIsAuthorized] = useState(false)

  const login = useFunc(() => setIsAuthorized(!!user.data))
  const logout = useFunc(() => setIsAuthorized(false))

  return useMemo(
    () => ({ user, isAuthorized, login, logout }),
    [user, isAuthorized, login, logout],
  )
}
