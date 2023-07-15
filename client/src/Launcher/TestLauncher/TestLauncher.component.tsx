import React, { useMemo } from 'react'

// ---| common |---
import { useObject } from 'common/hooks'

// ---| self |---
import {
  TestLauncherContext,
  TestLauncherActions,
  TestLauncherOptions,
  DEFAULT_TEST_LAUNCHER_STATE,
} from './TestLauncher.context'

export type TestLauncherProps = React.PropsWithChildren

/**
 * Setup TestLauncher context providers.
 *
 * How to use
 * @example
 * <TestLauncher defaultProp={1} />
 */
export function TestLauncher(props: TestLauncherProps): JSX.Element {
  const value = useObject(DEFAULT_TEST_LAUNCHER_STATE)

  // actions are separated to prevent side effects
  // if we subscribe to change dependencies. Example: useHook(val, [dep1, dep2])
  const actions = useMemo<TestLauncherActions>(() => ({
    change: value.merge,
  }), [value])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const options = useMemo<TestLauncherOptions>(() => Object.assign(actions, value.current), [value.current, actions])

  return <TestLauncherContext.Provider value={options} {...props} />
}

TestLauncher.displayName = 'TestLauncher'

export default TestLauncher
