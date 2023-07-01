import React from 'react'

// ---| self |---
import { ABTestProviderStub } from './ABTestProvider'
import { AnalyticsProviderStub } from './AnalyticsProvider'
import { LogProviderStub } from './LogProvider'

export type MonitorLauncherStubProps = React.PropsWithChildren

export function MonitorLauncherStub(props: MonitorLauncherStubProps): JSX.Element {
  const { children } = props

  return (
    <LogProviderStub>
      <AnalyticsProviderStub>
        <ABTestProviderStub>
          {children}
        </ABTestProviderStub>
      </AnalyticsProviderStub>
    </LogProviderStub>
  )
}

export default MonitorLauncherStub
