import React, { useEffect, useMemo, useState } from 'react'

// ---| core |---
import { useThemeProvider } from 'Launcher/UILauncher'

// ---| self |---
import { SettingsProviderContext, SettingsProviderOptions, SettingsProviderState } from './SettingsProvider.context'

export type SettingsProviderProps = React.PropsWithChildren

export function SettingsProvider(props: SettingsProviderProps): JSX.Element {
  const [current, setCurrent] = useState<SettingsProviderState>(null)
  const theme = useThemeProvider()

  // FIXME: show spinner until user loaded?

  useEffect(() => {
    if (current) {
      theme.change(current.theme)
    }
  }, [current])

  const options = useMemo<SettingsProviderOptions>(() => ({
    current,
    change: (patch) => setCurrent((state) => state && { ...state, ...patch }),
    isLoaded: !!current,
  }), [current])

  return <SettingsProviderContext.Provider value={options} {...props} />
}

SettingsProvider.displayName = 'SettingsProvider'

export default SettingsProvider
