import React, { useContext } from 'react'

export type TestLauncherState = Record<string, unknown>

export const DEFAULT_TEST_LAUNCHER_STATE: TestLauncherState = {}

export type TestLauncherActions = {
  change: (patch: Partial<TestLauncherState>) => void,
}

export const DEFAULT_TEST_LAUNCHER_ACTIONS: TestLauncherActions = {
  change: () => {},
}

export type TestLauncherOptions = TestLauncherState & TestLauncherActions

export const DEFAULT_TEST_LAUNCHER_OPTIONS: TestLauncherOptions = {
  ...DEFAULT_TEST_LAUNCHER_STATE,
  ...DEFAULT_TEST_LAUNCHER_ACTIONS,
}

export const TestLauncherContext = React.createContext(DEFAULT_TEST_LAUNCHER_OPTIONS)
TestLauncherContext.displayName = 'TestLauncherContext'

export function useTestLauncher(): TestLauncherOptions {
  return useContext(TestLauncherContext)
}

export default useTestLauncher
