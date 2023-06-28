import React from 'react'
import {
  DEFAULT_USER_PROVIDER_OPTIONS,
  UserProviderContext,
  UserProviderOptions,
} from './UserProvider.context'

export type UserProviderStubProps = React.PropsWithChildren & {
  value?: Partial<UserProviderOptions>
}

export function UserProviderStub(props: UserProviderStubProps): JSX.Element {
  const { value, children } = props
  const combinedValue = { ...DEFAULT_USER_PROVIDER_OPTIONS, ...value }

  return <UserProviderContext.Provider value={combinedValue} children={children} />
}

export default UserProviderStub
