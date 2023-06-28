import React, { useMemo, useState } from 'react'

// ---| self |---
import { ThemeProviderContext, ThemeProviderOptions, ThemeProviderState } from './ThemeProvider.context'

export type ThemeProviderProps = React.PropsWithChildren

export function ThemeProvider(props: ThemeProviderProps): JSX.Element {
  const [current, setCurrent] = useState<ThemeProviderState>(null)

  const options = useMemo<ThemeProviderOptions>(() => ({
    current,
    change: (patch) => setCurrent((state) => state && { ...state, ...patch }),
    isLoaded: !!current,
  }), [current])

  return <ThemeProviderContext.Provider value={options} {...props} />
}

ThemeProvider.displayName = 'ThemeProvider'

export default ThemeProvider
