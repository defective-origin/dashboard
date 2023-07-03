import React, { useEffect, useMemo, useState } from 'react'
import { StyledEngineProvider } from '@mui/material/styles'

// ---| core |---

// ---| self |---
import './UISettingsProvider.module.scss'
import {
  UISettingsProviderContext,
  UISettingsProviderOptions,
  UISettingsProviderState,
  DEFAULT_UI_SETTINGS_PROVIDER_STATE,
} from './UISettingsProvider.context'

export type UISettingsProviderProps = React.PropsWithChildren

export function UISettingsProvider(props: UISettingsProviderProps): JSX.Element {
  const { children } = props
  const [current, setCurrent] = useState<UISettingsProviderState>(DEFAULT_UI_SETTINGS_PROVIDER_STATE)
  const oppositeTheme = current.theme === 'light' ? 'dark' : 'light'

  const options = useMemo<UISettingsProviderOptions>(() => ({
    current,
    isTheme: (value) => current.theme === value,
    isMode: (value) => current.mode === value,
    change: (patch) => { setCurrent((state) => ({ ...state, ...patch})) },
    toggleTheme: () => {
      // TODO: analytic.register({ name: 'UITheme', value: oppositeTheme })
      // TODO: api.update({ name: 'UITheme', value: oppositeTheme })
      setCurrent((state) => ({ ...state, theme: oppositeTheme }))
    },
    toggleMode: () => {
      // TODO: analytic.register({ name: 'UIMode', value: state.mode === 'view' ? 'edit' : 'view' })
      // TODO: api.update({ name: 'UIMode', value: state.mode === 'view' ? 'edit' : 'view' })
      setCurrent((state) => ({ ...state, mode: state.mode === 'view' ? 'edit' : 'view' }))
    },
  }), [current, oppositeTheme])

  useEffect(() => {
    document.body.classList.add(current.theme)
    document.body.classList.remove(oppositeTheme)
  }, [current, oppositeTheme])

  return (
    <UISettingsProviderContext.Provider value={options}>
      {/* injectFirst allows override Material UI's styles. */}
      <StyledEngineProvider injectFirst>
        { children }
      </StyledEngineProvider>
    </UISettingsProviderContext.Provider>
  )
}

UISettingsProvider.displayName = 'UISettingsProvider'

export default UISettingsProvider
