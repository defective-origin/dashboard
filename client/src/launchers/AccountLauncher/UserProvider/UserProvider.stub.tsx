import React from 'react'
import { UserProviderContext, UserProviderOptions } from './UserProvider.context'

export const UserProviderOptionSpy: UserProviderOptions = {
  user: 'string',
  login: () => {},
  logout: () => {},
  isAuthorized: true
}

export type UserProviderStubProps = React.PropsWithChildren & { value?: UserProviderOptions }

export function UserProviderStub(props: UserProviderStubProps): JSX.Element {
  const { value, children } = props

  return <UserProviderContext.Provider value={{ ...UserProviderOptionSpy, ...value }} children={children} />
}

export default UserProviderStub
