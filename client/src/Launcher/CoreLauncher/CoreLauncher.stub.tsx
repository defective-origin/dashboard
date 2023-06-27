import React from 'react'

// ---| self |---
import { RouterProviderStub } from './RouterProvider'

export type CoreLauncherStubProps = React.PropsWithChildren

export function CoreLauncherStub(props: CoreLauncherStubProps): JSX.Element {
  const { children } = props

  return (
    <RouterProviderStub>
      {children}
    </RouterProviderStub>
  )
}

export default CoreLauncherStub
