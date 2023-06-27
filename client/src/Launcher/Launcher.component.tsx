import React from 'react'

// ---| pages |---
// ---| screens |---
// ---| components |---

// ---| common |---

// ---| self |---
import CoreLauncher from './CoreLauncher'
import SystemLauncher from './SystemLauncher'
import AccountLauncher from './AccountLauncher'
import UILauncher from './UILauncher'

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

Launcher.displayName = 'Launcher'

export default Launcher
