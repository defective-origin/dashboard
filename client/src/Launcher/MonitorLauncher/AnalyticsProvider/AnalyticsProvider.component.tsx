import React, { useMemo, useState } from 'react'

// ---| self |---
import { AnalyticsProviderContext, AnalyticsProviderOptions, AnalyticsProviderState } from './AnalyticsProvider.context'

export type AnalyticsProviderProps = React.PropsWithChildren

export function AnalyticsProvider(props: AnalyticsProviderProps): JSX.Element {
  const [current, setCurrent] = useState<AnalyticsProviderState>(null)

  const options = useMemo<AnalyticsProviderOptions>(() => ({
    current,
    change: (patch) => setCurrent((state) => state && { ...state, ...patch }),
    isLoaded: !!current,
  }), [current])

  return <AnalyticsProviderContext.Provider value={options} {...props} />
}

AnalyticsProvider.displayName = 'AnalyticsProvider'

export default AnalyticsProvider
