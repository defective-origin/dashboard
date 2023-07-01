import React from 'react'

// ---| self |---
import { LogProvider } from './LogProvider'
import { AnalyticsProvider } from './AnalyticsProvider'
import { ABTestProvider } from './ABTestProvider'

export type MonitorLauncherProps = {
  children?: React.ReactNode
}

/**
 * Setup all monitor context providers.
 *
 * How to use
 * @example
 * <MonitorLauncher />
 */
export function MonitorLauncher(props: MonitorLauncherProps): JSX.Element {
  const { children } = props

  return (
    <LogProvider>
      <AnalyticsProvider>
        <ABTestProvider>
          {children}
        </ABTestProvider>
      </AnalyticsProvider>
    </LogProvider>
  )
}

MonitorLauncher.displayName = 'MonitorLauncher'

export default MonitorLauncher
