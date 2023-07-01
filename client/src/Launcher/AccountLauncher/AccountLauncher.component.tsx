import React from 'react'

// ---| self |---
import UserProvider from './UserProvider'
import AccountSettingsProvider from './AccountSettingsProvider'

export type AccountLauncherProps = {
  children?: React.ReactNode
}

/**
 * Setup account context providers.
 *
 * How to use
 * @example
 * <AccountLauncher defaultProp={1} />
 */
export function AccountLauncher(props: AccountLauncherProps): JSX.Element {
  const { children } = props

  return (
    <AccountSettingsProvider>
      <UserProvider>
        {children}
      </UserProvider>
    </AccountSettingsProvider>
  )
}

AccountLauncher.displayName = 'AccountLauncher'

export default AccountLauncher
