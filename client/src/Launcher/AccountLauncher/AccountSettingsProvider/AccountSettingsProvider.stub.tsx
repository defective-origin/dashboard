import React from 'react'
import {
  DEFAULT_ACCOUNT_SETTINGS_PROVIDER_OPTIONS,
  AccountSettingsProviderContext,
  AccountSettingsProviderOptions,
} from './AccountSettingsProvider.context'

export type AccountSettingsProviderStubProps = React.PropsWithChildren & {
  value?: Partial<AccountSettingsProviderOptions>
}

export function AccountSettingsProviderStub(props: AccountSettingsProviderStubProps): JSX.Element {
  const { value, children } = props
  const combinedValue = { ...DEFAULT_ACCOUNT_SETTINGS_PROVIDER_OPTIONS, ...value }

  return <AccountSettingsProviderContext.Provider value={combinedValue} children={children} />
}

export default AccountSettingsProviderStub
