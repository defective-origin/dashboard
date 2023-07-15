import React, { useMemo } from 'react'

// ---| common |---
import { useObject } from 'common/hooks'

// ---| self |---
import {
  AccountLauncherContext,
  AccountLauncherActions,
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

  // actions are separated to prevent side effects
  // if we subscribe to change dependencies. Example: useHook(val, [dep1, dep2])
  const actions = useMemo<AccountLauncherActions>(() => ({
    login: () => account.merge({ user: {}, isAuthorized: true }),
    logout: () => account.merge({ user: null, isAuthorized: false }),
  }), [account])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const options = useMemo<AccountLauncherOptions>(() => Object.assign(actions, account.current), [account.current, actions])

  return <AccountLauncherContext.Provider value={options} {...props} />
}

AccountLauncher.displayName = 'AccountLauncher'

export default AccountLauncher
