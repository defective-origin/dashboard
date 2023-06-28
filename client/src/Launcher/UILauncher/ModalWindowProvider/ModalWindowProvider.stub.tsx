import React from 'react'
import {
  DEFAULT_MODAL_WINDOW_PROVIDER_OPTIONS,
  ModalWindowProviderContext,
  ModalWindowProviderOptions,
} from './ModalWindowProvider.context'

export type ModalWindowProviderStubProps = React.PropsWithChildren & {
  value?: Partial<ModalWindowProviderOptions>
}

export function ModalWindowProviderStub(props: ModalWindowProviderStubProps): JSX.Element {
  const { value, children } = props
  const combinedValue = { ...DEFAULT_MODAL_WINDOW_PROVIDER_OPTIONS, ...value }

  return <ModalWindowProviderContext.Provider value={combinedValue} children={children} />
}

export default ModalWindowProviderStub
