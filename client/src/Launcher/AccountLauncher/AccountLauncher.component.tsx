import React, { useMemo, useState } from 'react'

// ---| self |---
import {
  AccountLauncherContext,
  AccountLauncherOptions,
  DEFAULT_ACCOUNT_LAUNCHER_STATE,
} from './AccountLauncher.context'

export type AccountLauncherProps = React.PropsWithChildren

/**
 * Setup account context providers.
 *
 * How to use
 * @example
 * <AccountLauncher defaultProp={1} />
 */
export function AccountLauncher(props: AccountLauncherProps): JSX.Element {
  const [current, setCurrent] = useState(DEFAULT_ACCOUNT_LAUNCHER_STATE)

  const options = useMemo<AccountLauncherOptions>(() => ({
    ...current,
    login: () => setCurrent((state) => ({ ...state, user: {} })),
    logout: () => setCurrent((state) => ({ ...state, user: null })),
    isAuthorized: !!current.user,
  }), [current])

  return <AccountLauncherContext.Provider value={options} {...props} />
}

AccountLauncher.displayName = 'AccountLauncher'

export default AccountLauncher
