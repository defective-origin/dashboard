import React from 'react'

// ---| self |---
import SystemLauncher from './SystemLauncher'
import UILauncher from './UILauncher'
import AccountLauncher from './AccountLauncher'
import MonitorLauncher from './MonitorLauncher'

export type LauncherProps = {
  children?: React.ReactNode
}

/**
 * Run all launchers with main app page.
 *
 * How to use
 * @example
 * <Launcher />
 */
export function Launcher(props: LauncherProps): JSX.Element {
  const { children } = props

  return (
    <SystemLauncher>
      <MonitorLauncher>
        <UILauncher>
          <AccountLauncher>
            { children }
          </AccountLauncher>
        </UILauncher>
      </MonitorLauncher>
    </SystemLauncher>
  )
}

Launcher.displayName = 'Launcher'

export default Launcher
