import React, { useContext } from 'react'

export type ABTestProviderState = null | object

export type ABTestProviderOptions = {
  current: ABTestProviderState,
  change: (patch: Partial<Exclude<ABTestProviderState, 'null'>>) => void,
  isLoaded: boolean,
}

export const DEFAULT_A_B_TEST_PROVIDER_OPTIONS: ABTestProviderOptions = {
  current: null,
  change: () => {},
  isLoaded: false,
}

export const ABTestProviderContext = React.createContext(DEFAULT_A_B_TEST_PROVIDER_OPTIONS)

export function useABTestProvider<T extends ABTestProviderOptions>(): T {
  return useContext(ABTestProviderContext) as T
}

export default useABTestProvider
