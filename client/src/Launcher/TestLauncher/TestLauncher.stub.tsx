import React from 'react'
import {
  TestLauncherContext,
  TestLauncherOptions,
  DEFAULT_TEST_LAUNCHER_OPTIONS,
} from './TestLauncher.context'

export type TestLauncherStubProps = React.PropsWithChildren & Partial<TestLauncherOptions>

export function TestLauncherStub(props: TestLauncherStubProps): JSX.Element {
  const { children, ...otherProps } = props
  const combinedValue = { ...DEFAULT_TEST_LAUNCHER_OPTIONS, ...otherProps }

  return <TestLauncherContext.Provider value={combinedValue} children={children} />
}

export default TestLauncherStub
