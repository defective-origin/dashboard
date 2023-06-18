import React from 'react'

// ---| launchers |---
import CoreLauncher from 'launchers/CoreLauncher'
import SystemLauncher from 'launchers/SystemLauncher'
import AccountLauncher from 'launchers/AccountLauncher'
import UILauncher from 'launchers/UILauncher'

export type AppLauncherProps = {
  children?: React.ReactNode
}

/**
 * Run all launchers with main app page.
 *
 * How to use
 * @example
 * <AppLauncher />
 */
export function AppLauncher(props: AppLauncherProps): JSX.Element {
  const { children } = props

  return (
    <CoreLauncher>
      <SystemLauncher>
        <AccountLauncher>
          <UILauncher>
            { children }
          </UILauncher>
        </AccountLauncher>
      </SystemLauncher>
    </CoreLauncher>
  )
}

AppLauncher.displayName = 'AppLauncher'

export default AppLauncher
