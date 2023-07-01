import React, { useContext } from 'react'

export type HotKeysProviderState = null | object

export type HotKeysProviderOptions = {
  current: HotKeysProviderState,
  change: (patch: Partial<Exclude<HotKeysProviderState, 'null'>>) => void,
  isLoaded: boolean,
}

export const DEFAULT_HOT_KEYS_PROVIDER_OPTIONS: HotKeysProviderOptions = {
  current: null,
  change: () => {},
  isLoaded: false,
}

export const HotKeysProviderContext = React.createContext(DEFAULT_HOT_KEYS_PROVIDER_OPTIONS)
HotKeysProviderContext.displayName = 'HotKeysProviderContext'

export function useHotKeysProvider<T extends HotKeysProviderOptions>(): T {
  return useContext(HotKeysProviderContext) as T
}

export default useHotKeysProvider
