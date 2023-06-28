import React, { useContext } from 'react'

export type ModalWindowProviderState = null | object

export type ModalWindowProviderOptions = {
  current: ModalWindowProviderState,
  change: (patch: Partial<Exclude<ModalWindowProviderState, 'null'>>) => void,
  isLoaded: boolean,
}

export const DEFAULT_MODAL_WINDOW_PROVIDER_OPTIONS: ModalWindowProviderOptions = {
  current: null,
  change: () => {},
  isLoaded: false,
}

export const ModalWindowProviderContext = React.createContext(DEFAULT_MODAL_WINDOW_PROVIDER_OPTIONS)

export function useModalWindowProvider<T extends ModalWindowProviderOptions>(): T {
  return useContext(ModalWindowProviderContext) as T
}

export default useModalWindowProvider
