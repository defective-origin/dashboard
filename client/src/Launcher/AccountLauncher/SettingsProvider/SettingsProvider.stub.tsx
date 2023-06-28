import React from 'react'
import {
  DEFAULT_SETTINGS_PROVIDER_OPTIONS,
  SettingsProviderContext,
  SettingsProviderOptions,
} from './SettingsProvider.context'

export type SettingsProviderStubProps = React.PropsWithChildren & {
  value?: Partial<SettingsProviderOptions>
}

export function SettingsProviderStub(props: SettingsProviderStubProps): JSX.Element {
  const { value, children } = props
  const combinedValue = { ...DEFAULT_SETTINGS_PROVIDER_OPTIONS, ...value }

  return <SettingsProviderContext.Provider value={combinedValue} children={children} />
}

export default SettingsProviderStub
