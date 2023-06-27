import React from 'react'
import { UserProviderOptions, UserProviderStub } from './UserProvider'

export type AccountLauncherStubProps = React.PropsWithChildren & {
  userProvider: UserProviderOptions
}

export function AccountLauncherStub(props: AccountLauncherStubProps): JSX.Element {
  const { userProvider, children } = props

  return (
    <UserProviderStub value={userProvider}>
      {children}
    </UserProviderStub>
  )
}

export default AccountLauncherStub
