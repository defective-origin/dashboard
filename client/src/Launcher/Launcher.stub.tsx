import React from 'react'

// ---| self |---
import { AccountLauncherStub, AccountLauncherStubProps } from './AccountLauncherOld'
import { MonitorLauncherStub, MonitorLauncherStubProps } from './MonitorLauncher'
import { SystemLauncherStub, SystemLauncherStubProps } from './SystemLauncherOld'
import { UILauncherStub, UILauncherStubProps } from './UILauncher'

export type LauncherStubProps = React.PropsWithChildren & {
  system: SystemLauncherStubProps,
  monitor: MonitorLauncherStubProps,
  account: AccountLauncherStubProps,
  ui: UILauncherStubProps,
}

export function LauncherStub(props: LauncherStubProps): JSX.Element {
  const { system, monitor, account, ui, children } = props

  return (
    <SystemLauncherStub {...system}>
      <MonitorLauncherStub {...monitor}>
        <UILauncherStub {...ui}>
          <AccountLauncherStub {...account}>
            { children }
          </AccountLauncherStub>
        </UILauncherStub>
      </MonitorLauncherStub>
    </SystemLauncherStub>
  )
}

export default LauncherStub
