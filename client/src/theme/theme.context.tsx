import React from 'react'
import { StyledEngineProvider, Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material'

export type ThemeProviderProps = React.PropsWithChildren

/**
 * Component description.
 *
 * How to use
 * @example
 * <ThemeProvider />
 */
export function ThemeProvider(props: ThemeProviderProps): JSX.Element {
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
