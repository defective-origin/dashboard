import React from 'react'

// ---| self |---
import { UserProviderOptions, UserProviderStub } from './UserProvider'
import { AccountSettingsProviderOptions, AccountSettingsProviderStub } from './AccountSettingsProvider'

export type AccountLauncherStubProps = React.PropsWithChildren & {
  userProvider: UserProviderOptions
  accountSettingsProvider: AccountSettingsProviderOptions
}

export function AccountLauncherStub(props: AccountLauncherStubProps): JSX.Element {
  const { userProvider, accountSettingsProvider, children } = props

  return (
    <AccountSettingsProviderStub value={accountSettingsProvider}>
      <UserProviderStub value={userProvider}>
        {children}
      </UserProviderStub>
    </AccountSettingsProviderStub>
  )
}

export default AccountLauncherStub
