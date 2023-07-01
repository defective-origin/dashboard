import React from 'react'
import {
  DEFAULT_ANALYTICS_PROVIDER_OPTIONS,
  AnalyticsProviderContext,
  AnalyticsProviderOptions,
} from './AnalyticsProvider.context'

export type AnalyticsProviderStubProps = React.PropsWithChildren & {
  value?: Partial<AnalyticsProviderOptions>
}

export function AnalyticsProviderStub(props: AnalyticsProviderStubProps): JSX.Element {
  const { value, children } = props
  const combinedValue = { ...DEFAULT_ANALYTICS_PROVIDER_OPTIONS, ...value }

  return <AnalyticsProviderContext.Provider value={combinedValue} children={children} />
}

export default AnalyticsProviderStub
