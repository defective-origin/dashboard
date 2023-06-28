import React, { useContext } from 'react'

export type SnackBarProviderState = null | object

export type SnackBarProviderOptions = {
  current: SnackBarProviderState,
  change: (patch: Partial<Exclude<SnackBarProviderState, 'null'>>) => void,
  isLoaded: boolean,
}

export const DEFAULT_SNACK_BAR_PROVIDER_OPTIONS: SnackBarProviderOptions = {
  current: null,
  change: () => {},
  isLoaded: false,
}

export const SnackBarProviderContext = React.createContext(DEFAULT_SNACK_BAR_PROVIDER_OPTIONS)

export function useSnackBarProvider<T extends SnackBarProviderOptions>(): T {
  return useContext(SnackBarProviderContext) as T
}

export default useSnackBarProvider
