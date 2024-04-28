import React from 'react'
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

export type ThemeProviderProps = React.PropsWithChildren & {
  current?: 'light' | 'dark'
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <ThemeProvider />
 */
export function ThemeProvider(props: ThemeProviderProps): JSX.Element {
  const { current } = props
  const breakpoint = useBreakpoint(MEDIA_BREAKPOINTS)

  // use || instead of ?? because storybook return '' instead of undefined
  useMode(current || 'light')
  useMode(breakpoint.names)

  // injectFirst allows override Material UI's styles.
  // https://bareynol.github.io/mui-theme-creator/
  return (
    <StyledEngineProvider injectFirst>
      <CssVarsProvider>
        { props.children }
      </CssVarsProvider>
    </StyledEngineProvider>
  )
}

ThemeProvider.displayName = 'ThemeProvider'

export default ThemeProvider
