import React from 'react'
import { AccountLauncherStub, AccountLauncherStubProps } from 'launchers/AccountLauncher'
import { CoreLauncherStub, CoreLauncherStubProps } from 'launchers/CoreLauncher'
import { SystemLauncherStub, SystemLauncherStubProps } from 'launchers/SystemLauncher'
import { UILauncherStub, UILauncherStubProps } from 'launchers/UILauncher'

export type AppLauncherStubProps = React.PropsWithChildren
  & CoreLauncherStubProps
  & SystemLauncherStubProps
  & AccountLauncherStubProps
  & UILauncherStubProps

export function AppLauncherStub(props: AppLauncherStubProps): JSX.Element {
  const { userProvider, children } = props

  return (
    <CoreLauncherStub>
      <SystemLauncherStub>
        <AccountLauncherStub userProvider={userProvider}>
          <UILauncherStub>
            { children }
          </UILauncherStub>
        </AccountLauncherStub>
      </SystemLauncherStub>
    </CoreLauncherStub>
  )
}

export default AppLauncherStub
