import React from 'react'

export type UILauncherStubProps = React.PropsWithChildren

export function UILauncherStub(props: UILauncherStubProps): JSX.Element {
  const { children } = props

  return (
    <>
      {children}
    </>
  )
}

export default UILauncherStub
