import React from 'react'
import {
  DEFAULT_ACCOUNT_LAUNCHER_OPTIONS,
  AccountLauncherContext,
  AccountLauncherOptions,
} from './AccountLauncher.context'

export type AccountLauncherStubProps = React.PropsWithChildren & Partial<AccountLauncherOptions>

export function AccountLauncherStub(props: AccountLauncherStubProps): JSX.Element {
  const { children, ...otherProps } = props
  const combinedValue = { ...DEFAULT_ACCOUNT_LAUNCHER_OPTIONS, ...otherProps }

  return <AccountLauncherContext.Provider value={combinedValue} children={children} />
}

export default AccountLauncherStub
