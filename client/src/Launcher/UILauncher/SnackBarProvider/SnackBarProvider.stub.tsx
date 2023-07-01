import React from 'react'
import {
  DEFAULT_SNACK_BAR_PROVIDER_OPTIONS,
  SnackBarProviderContext,
  SnackBarProviderOptions,
} from './SnackBarProvider.context'

export type SnackBarProviderStubProps = React.PropsWithChildren & {
  value?: Partial<SnackBarProviderOptions>
}

export function SnackBarProviderStub(props: SnackBarProviderStubProps): JSX.Element {
  const { value, children } = props
  const combinedValue = { ...DEFAULT_SNACK_BAR_PROVIDER_OPTIONS, ...value }

  return <SnackBarProviderContext.Provider value={combinedValue} children={children} />
}

export default SnackBarProviderStub
