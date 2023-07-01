import React, { useMemo, useState } from 'react'

// ---| self |---
import { UserProviderContext, UserProviderOptions, UserProviderState } from './UserProvider.context'

export type UserProviderProps = React.PropsWithChildren

export function UserProvider(props: UserProviderProps): JSX.Element {
  const [current, setCurrent] = useState<UserProviderState>(null)

  const options = useMemo<UserProviderOptions>(() => ({
    current,
    login: () => setCurrent({}),
    logout: () => setCurrent(null),
    isAuthorized: !!current,
  }), [current])

  return <UserProviderContext.Provider value={options} {...props} />
}

UserProvider.displayName = 'UserProvider'

export default UserProvider
