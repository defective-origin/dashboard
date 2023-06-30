import React, { useContext } from 'react'

export type LogProviderState = null | object

export type LogProviderOptions = {
  current: LogProviderState,
  change: (patch: Partial<Exclude<LogProviderState, 'null'>>) => void,
  isLoaded: boolean,
}

export const DEFAULT_LOG_PROVIDER_OPTIONS: LogProviderOptions = {
  current: null,
  change: () => {},
  isLoaded: false,
}

export const LogProviderContext = React.createContext(DEFAULT_LOG_PROVIDER_OPTIONS)
LogProviderContext.displayName = 'LogProviderContext'

export function useLogProvider<T extends LogProviderOptions>(): T {
  return useContext(LogProviderContext) as T
}

export default useLogProvider
