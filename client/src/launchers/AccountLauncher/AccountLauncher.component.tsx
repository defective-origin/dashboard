import React from 'react'

// ---| pages |---
// ---| screens |---
// ---| components |---
// ---| root |---
// ---| common |---
// ---| self |---

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

  return <>{children}</>
}

AccountLauncher.displayName = 'AccountLauncher'

export default AccountLauncher
