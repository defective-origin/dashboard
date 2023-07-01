import React from 'react'
import {
  DEFAULT_HOT_KEYS_PROVIDER_OPTIONS,
  HotKeysProviderContext,
  HotKeysProviderOptions,
} from './HotKeysProvider.context'

export type HotKeysProviderStubProps = React.PropsWithChildren & {
  value?: Partial<HotKeysProviderOptions>
}

export function HotKeysProviderStub(props: HotKeysProviderStubProps): JSX.Element {
  const { value, children } = props
  const combinedValue = { ...DEFAULT_HOT_KEYS_PROVIDER_OPTIONS, ...value }

  return <HotKeysProviderContext.Provider value={combinedValue} children={children} />
}

export default HotKeysProviderStub
