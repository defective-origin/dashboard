import React from 'react'

export type SystemLauncherStubProps = React.PropsWithChildren

export function SystemLauncherStub(props: SystemLauncherStubProps): JSX.Element {
  const { children } = props

  return (
    <>
      {children}
    </>
  )
}

export default SystemLauncherStub
