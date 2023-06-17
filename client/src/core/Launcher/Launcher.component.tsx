import React, { Suspense } from 'react'

// ---| contexts |---

export type LauncherProps = {
  children: React.ReactNode,
}

export default function Launcher(props: LauncherProps): JSX.Element {
  return (
    <React.StrictMode>
      <Suspense fallback={<h1>Loading...</h1>}>
          { props.children }
      </Suspense>
    </React.StrictMode>
  )
}

export type TestLauncherProps = {
  // router?: TestRouterProps
  children: React.ReactNode,
}

export function TestLauncher(props: TestLauncherProps): JSX.Element {
  const { children } = props

  return (
    <>
      {children}
    </>
  )

  // return (
  //   <TestRouter {...router}>
  //     {children}
  //   </TestRouter>
  // )
}
