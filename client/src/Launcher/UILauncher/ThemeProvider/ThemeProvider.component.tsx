import React, { useEffect, useMemo, useState } from 'react'

// ---| self |---
import './ThemeProvider.module.scss'
import { ThemeProviderContext, ThemeProviderOptions, ThemeProviderState } from './ThemeProvider.context'

export type ThemeProviderProps = React.PropsWithChildren

export function ThemeProvider(props: ThemeProviderProps): JSX.Element {
  const [current, setCurrent] = useState<ThemeProviderState>('light')
  const opposite = current === 'light' ? 'dark' : 'light'

  const options = useMemo<ThemeProviderOptions>(() => ({
    current,
    opposite,
    is: (value) => current === value,
    toggle: () => {
      // TODO: analytic.register({ name: 'Locale', value: locale })
      // TODO: api.update({ name: 'Locale', value: locale })
      setCurrent(opposite)
    },
    change: setCurrent,
  }), [current, opposite])

  useEffect(() => {
    document.body.classList.add(current)
    document.body.classList.remove(opposite)
  }, [current, opposite])

  return <ThemeProviderContext.Provider value={options} {...props} />
}

ThemeProvider.displayName = 'ThemeProvider'

export default ThemeProvider
