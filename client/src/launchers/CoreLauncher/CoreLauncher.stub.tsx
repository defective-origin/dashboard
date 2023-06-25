import React from 'react'

export type CoreLauncherStubProps = React.PropsWithChildren

export function CoreLauncherStub(props: CoreLauncherStubProps): JSX.Element {
  const { children } = props

  return (
    <>
      {children}
    </>
  )
}

export default CoreLauncherStub
