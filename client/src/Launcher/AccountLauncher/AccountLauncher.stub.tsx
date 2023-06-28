import React from 'react'

// ---| self |---
import { UserProviderOptions, UserProviderStub } from './UserProvider'
import { SettingsProviderOptions, SettingsProviderStub } from './SettingsProvider'

export type AccountLauncherStubProps = React.PropsWithChildren & {
  userProvider: UserProviderOptions
  settingsProvider: SettingsProviderOptions
}

export function AccountLauncherStub(props: AccountLauncherStubProps): JSX.Element {
  const { userProvider, settingsProvider, children } = props

  return (
    <UserProviderStub value={userProvider}>
      <SettingsProviderStub value={settingsProvider}>
        {children}
      </SettingsProviderStub>
    </UserProviderStub>
  )
}

export default AccountLauncherStub
