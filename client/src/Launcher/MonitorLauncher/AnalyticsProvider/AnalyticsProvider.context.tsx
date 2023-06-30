import React, { useContext } from 'react'

export type AnalyticsProviderState = null | object

export type AnalyticsProviderOptions = {
  current: AnalyticsProviderState,
  change: (patch: Partial<Exclude<AnalyticsProviderState, 'null'>>) => void,
  isLoaded: boolean,
}

export const DEFAULT_ANALYTICS_PROVIDER_OPTIONS: AnalyticsProviderOptions = {
  current: null,
  change: () => {},
  isLoaded: false,
}

export const AnalyticsProviderContext = React.createContext(DEFAULT_ANALYTICS_PROVIDER_OPTIONS)
AnalyticsProviderContext.displayName = 'AnalyticsProviderContext'

export function useAnalyticsProvider<T extends AnalyticsProviderOptions>(): T {
  return useContext(AnalyticsProviderContext) as T
}

export default useAnalyticsProvider
