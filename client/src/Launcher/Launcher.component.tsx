import React from 'react'

// ---| self |---
import SystemLauncher, { SystemLauncherProps } from './SystemLauncher'
import UILauncher, { UILauncherProps } from './UILauncher'
import AccountLauncher, { AccountLauncherProps } from './AccountLauncher'
import MonitorLauncher, { MonitorLauncherProps } from './MonitorLauncher'

export type LauncherProps = React.PropsWithChildren & {
  system?: SystemLauncherProps,
  monitor?: MonitorLauncherProps,
  account?: AccountLauncherProps,
  ui?: UILauncherProps
}

/**
 * Run all launchers with main app page.
 *
 * How to use
 * @example
 * <Launcher />
 */
export function Launcher(props: LauncherProps): JSX.Element {
  const { system, monitor, account, ui, children } = props

  return (
    <SystemLauncher {...system}>
      <MonitorLauncher {...monitor}>
        <UILauncher {...ui} >
          <AccountLauncher {...account}>
            { children }
          </AccountLauncher>
        </UILauncher>
      </MonitorLauncher>
    </SystemLauncher>
  )
}

Launcher.displayName = 'Launcher'

export default Launcher
