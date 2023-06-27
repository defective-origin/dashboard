import React, { useMemo, useState } from 'react'

// ---| self |---
import { UserProviderContext } from './UserProvider.context'

export type UserProviderProps = React.PropsWithChildren

export function UserProvider(props: UserProviderProps): JSX.Element {
  const [user, setUser] = useState<null | string>(null)

  const options = useMemo(() => ({
    user,
    login: () => setUser('user'),
    logout: () => setUser(null),
    isAuthorized: !!user,
  }), [user])

  return <UserProviderContext.Provider value={options} {...props} />
}

export default UserProvider
