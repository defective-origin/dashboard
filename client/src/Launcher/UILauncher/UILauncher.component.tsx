import React from 'react'

// ---| self |---
import { UISettingsProvider } from './UISettingsProvider'
import { ModalWindowProvider } from './ModalWindowProvider'
import { SnackBarProvider } from './SnackBarProvider'

export type UILauncherProps = {
  children?: React.ReactNode
}

/**
 * Setup all ui context providers.
 *
 * How to use
 * @example
 * <UILauncher defaultProp={1} />
 */
export function UILauncher(props: UILauncherProps): JSX.Element {
  const { children } = props

  return (
    <UISettingsProvider>
      <SnackBarProvider>
        <ModalWindowProvider>
          {children}
        </ModalWindowProvider>
      </SnackBarProvider>
    </UISettingsProvider>
  )
}

UILauncher.displayName = 'UILauncher'

export default UILauncher
