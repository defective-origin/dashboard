import React from 'react'
import { StyledEngineProvider } from '@mui/material/styles'

// ---| self |---
import { DEFAULT_UI_LAUNCHER_OPTIONS, UILauncherContext, UILauncherOptions } from './UILauncher.context'

export type UILauncherStubProps = React.PropsWithChildren & Partial<UILauncherOptions>

export function UILauncherStub(props: UILauncherStubProps): JSX.Element {
  const { children, ...otherProps } = props
  const combinedValue = { ...DEFAULT_UI_LAUNCHER_OPTIONS, ...otherProps }

  return (
    <React.Suspense fallback={<h1>Loading...</h1>}>
      <UILauncherContext.Provider value={combinedValue}>
        {/* injectFirst allows override Material UI's styles. */}
        <StyledEngineProvider injectFirst>
          { children }
        </StyledEngineProvider>
      </UILauncherContext.Provider>
    </React.Suspense>
  )
}

export default UILauncherStub
