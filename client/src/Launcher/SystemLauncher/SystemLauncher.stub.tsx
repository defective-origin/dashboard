import React from 'react'
import i18next, { I18nextProvider } from 'locale'

// ---| self |---
import {
  DEFAULT_SYSTEM_LAUNCHER_OPTIONS,
  SystemLauncherContext,
  SystemLauncherOptions,
} from './SystemLauncher.context'

export type SystemLauncherStubProps = React.PropsWithChildren & Partial<SystemLauncherOptions>

export function SystemLauncherStub(props: SystemLauncherStubProps): JSX.Element {
  const { children, ...otherProps } = props
  const combinedValue = { ...DEFAULT_SYSTEM_LAUNCHER_OPTIONS, ...otherProps }

  return (
    <React.StrictMode>
      <SystemLauncherContext.Provider value={combinedValue}>
        <I18nextProvider i18n={i18next}>
          {children}
        </I18nextProvider>
      </SystemLauncherContext.Provider>
    </React.StrictMode>
  )
}

export default SystemLauncherStub
