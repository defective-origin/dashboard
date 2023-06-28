import React from 'react'
import {
  DEFAULT_LOCALE_PROVIDER_OPTIONS,
  LocaleProviderContext,
  LocaleProviderOptions,
} from './LocaleProvider.context'

export type LocaleProviderStubProps = React.PropsWithChildren & {
  value?: Partial<LocaleProviderOptions>
}

export function LocaleProviderStub(props: LocaleProviderStubProps): JSX.Element {
  const { value, children } = props
  const combinedValue = { ...DEFAULT_LOCALE_PROVIDER_OPTIONS, ...value }

  return <LocaleProviderContext.Provider value={combinedValue} children={children} />
}

export default LocaleProviderStub
