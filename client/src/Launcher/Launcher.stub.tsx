import React from 'react'
import { AccountLauncherStub, AccountLauncherStubProps } from './AccountLauncher'
import { CoreLauncherStub, CoreLauncherStubProps } from './CoreLauncher'
import { SystemLauncherStub, SystemLauncherStubProps } from './SystemLauncher'
import { UILauncherStub, UILauncherStubProps } from './UILauncher'

export type LauncherStubProps = React.PropsWithChildren
  & CoreLauncherStubProps
  & SystemLauncherStubProps
  & AccountLauncherStubProps
  & UILauncherStubProps

export function LauncherStub(props: LauncherStubProps): JSX.Element {
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

export default LauncherStub
