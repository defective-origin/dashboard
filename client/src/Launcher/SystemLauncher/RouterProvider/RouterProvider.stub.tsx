import React from 'react'

// ---| self |---
import RouterProvider from './RouterProvider.component'

export type RouterProviderStubProps = React.PropsWithChildren

export function RouterProviderStub(props: RouterProviderStubProps): JSX.Element {
  const { children } = props

  return <RouterProvider>{children}</RouterProvider>
}

export default RouterProviderStub
