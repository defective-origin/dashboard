import React, { Suspense } from 'react'

// ---| contexts |---
import Router, { TestRouterProps, TestRouter } from 'contexts/Router'

export type LauncherProps = {
  children: React.ReactNode,
}

export default function Launcher(props: LauncherProps): JSX.Element {
  return (
    <React.StrictMode>
      <Suspense fallback={<h1>Loading...</h1>}>
        <Router>
          { props.children }
        </Router>
      </Suspense>
    </React.StrictMode>
  )
}

export type TestLauncherProps = {
  router?: TestRouterProps
  children: React.ReactNode,
}

export function TestLauncher(props: TestLauncherProps): JSX.Element {
  const { router, children } = props

  return (
    <TestRouter {...router}>
      {children}
    </TestRouter>
  )
}
