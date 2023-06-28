import React from 'react'

// ---| self |---
import { AccountLauncherStub, AccountLauncherStubProps } from './AccountLauncher'
import { MonitorLauncherStub, MonitorLauncherStubProps } from './MonitorLauncher'
import { SystemLauncherStub, SystemLauncherStubProps } from './SystemLauncher'
import { UILauncherStub, UILauncherStubProps } from './UILauncher'

export type LauncherStubProps = React.PropsWithChildren
  & MonitorLauncherStubProps
  & SystemLauncherStubProps
  & AccountLauncherStubProps
  & UILauncherStubProps

export function LauncherStub(props: LauncherStubProps): JSX.Element {
  const { userProvider, settingsProvider, children } = props

  return (
    <SystemLauncherStub>
      <MonitorLauncherStub>
        <UILauncherStub>
          <AccountLauncherStub userProvider={userProvider} settingsProvider={settingsProvider}>
            { children }
          </AccountLauncherStub>
        </UILauncherStub>
      </MonitorLauncherStub>
    </SystemLauncherStub>
  )
}

export default LauncherStub
