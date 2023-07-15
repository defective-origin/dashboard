import React, { useMemo } from 'react'

// ---| common |---
import { useObject } from 'common/hooks'

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
  const account = useObject(DEFAULT_ACCOUNT_LAUNCHER_STATE)

  const options = useMemo<AccountLauncherOptions>(() => ({
    ...account.current,
    login: () => account.merge({ user: {} }),
    logout: () => account.merge({ user: null }),
    isAuthorized: !!account.current.user,
  }), [account])

  return <AccountLauncherContext.Provider value={options} {...props} />
}

AccountLauncher.displayName = 'AccountLauncher'

export default AccountLauncher
