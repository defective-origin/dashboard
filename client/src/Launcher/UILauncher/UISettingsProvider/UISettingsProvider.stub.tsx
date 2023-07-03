import React from 'react'
import { StyledEngineProvider } from '@mui/material/styles'
import {
  DEFAULT_UI_SETTINGS_PROVIDER_OPTIONS,
  UISettingsProviderContext,
  UISettingsProviderOptions,
} from './UISettingsProvider.context'

export type UISettingsProviderStubProps = React.PropsWithChildren & {
  value?: Partial<UISettingsProviderOptions>
}

export function UISettingsProviderStub(props: UISettingsProviderStubProps): JSX.Element {
  const { value, children } = props
  const combinedValue = { ...DEFAULT_UI_SETTINGS_PROVIDER_OPTIONS, ...value }

  return (
    <UISettingsProviderContext.Provider value={combinedValue}>
      <StyledEngineProvider injectFirst>
        { children }
      </StyledEngineProvider>
    </UISettingsProviderContext.Provider>
  )
}

export default UISettingsProviderStub
