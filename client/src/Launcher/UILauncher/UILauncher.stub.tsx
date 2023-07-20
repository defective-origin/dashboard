import React from 'react'
import { StyledEngineProvider } from '@mui/material/styles'

// ---| self |---
import UI, { UIItemMap } from './UI'
import { DEFAULT_UI_LAUNCHER_OPTIONS, UILauncherContext, UILauncherOptions } from './UILauncher.context'

export type UILauncherStubProps = React.PropsWithChildren & Partial<UILauncherOptions> & {
  items: UIItemMap
}

export function UILauncherStub(props: UILauncherStubProps): JSX.Element {
  const { items, children, ...otherProps } = props
  const combinedValue = { ...DEFAULT_UI_LAUNCHER_OPTIONS, ...otherProps }

  return (
    <React.Suspense fallback={<h1>Loading...</h1>}>
      <UILauncherContext.Provider value={combinedValue}>
        {/* injectFirst allows override Material UI's styles. */}
        <StyledEngineProvider injectFirst>
          <UI map={items}>
            { children }
          </UI>
        </StyledEngineProvider>
      </UILauncherContext.Provider>
    </React.Suspense>
  )
}

export default UILauncherStub
