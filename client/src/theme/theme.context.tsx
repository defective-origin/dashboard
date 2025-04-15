import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { StyledEngineProvider, Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material'

// ---| core |---
import { Breakpoint, useBreakpoint, useMode } from 'hooks'

import './theme.scss'

export class MediaBreakpoint implements Breakpoint {
  constructor(
    public names: string[],
    public size = Number.MAX_SAFE_INTEGER,
  ) {}
}

// related to breakpoint documentation https://zeroheight.com/3f9f837f9/p/71b709-layout/b/56984a
export const MEDIA_BREAKPOINTS = [
  // Mobile platforms
  new MediaBreakpoint(['mobile', 'vertical'], 480),
  new MediaBreakpoint(['mobile', 'horizontal'], 768),

  // Tablet or Low resolution Desktops
  new MediaBreakpoint(['tablet', 'vertical'], 1024),
  new MediaBreakpoint(['tablet', 'horizontal'], 1280),

  // Low resolutions Desktop or High resolution Desktops with 150% system zoom
  new MediaBreakpoint(['desktop'], 1536),

  // Tv or High resolution Desktops
  new MediaBreakpoint(['tv']),
]

export type ThemeVariant = 'light' | 'dark'

export type ThemeOptions = {
  current: ThemeVariant
  is: (value: ThemeVariant) => boolean
  set: (value: ThemeVariant) => void
  toggle: () => void
}

export const ThemeContext = React.createContext({} as ThemeOptions)
ThemeContext.displayName = 'ThemeContext'

export const useTheme = () => useContext(ThemeContext)

const getCurrentTheme = () => window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'

export type ThemeProviderProps = React.PropsWithChildren

/**
 * Component description.
 *
 * How to use
 * @example
 * <ThemeProvider />
 */
export function ThemeProvider(props: ThemeProviderProps) {
  const breakpoint = useBreakpoint(MEDIA_BREAKPOINTS)
  const [theme, set] = useState<ThemeVariant>(getCurrentTheme())
  const current = theme || 'light' // use || instead of ?? because storybook return '' instead of undefined
  const is = useCallback((value: ThemeVariant) => current === value, [current])
  const toggle = useCallback(() => set(curr => curr === 'dark' ? 'light': 'dark'), [set])

  // detect browser theme
  useEffect(() => {
    const setColorScheme = () => set(getCurrentTheme())

    // MediaQueryList
    const darkModePreference = window.matchMedia('(prefers-color-scheme: dark)')

    // recommended method for newer browsers: specify event-type as first argument
    darkModePreference.addEventListener('change', setColorScheme)

    // deprecated method for backward compatibility
    darkModePreference.addListener(setColorScheme)

    return () => {
      darkModePreference.removeEventListener('change', setColorScheme)
      darkModePreference.removeListener(setColorScheme)
    }
  }, [])

  useMode(current)
  useMode(breakpoint.names)

  const value = useMemo(
    () => ({ current, is, toggle, set }),
    [current, is, toggle],
  )

  // injectFirst allows override Material UI's styles.
  // https://bareynol.github.io/mui-theme-creator/
  return (
    <StyledEngineProvider injectFirst>
      <CssVarsProvider>
        <ThemeContext.Provider value={value}>
          { props.children }
        </ThemeContext.Provider>
      </CssVarsProvider>
    </StyledEngineProvider>
  )
}

ThemeProvider.displayName = 'ThemeProvider'

export default ThemeProvider
