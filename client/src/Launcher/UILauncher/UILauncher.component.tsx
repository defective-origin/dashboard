import React from 'react'

// ---| self |---
import './UILauncher.module.scss'
import { ThemeProvider } from './ThemeProvider'
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
    <ThemeProvider>
      <SnackBarProvider>
        <ModalWindowProvider>
          {children}
        </ModalWindowProvider>
      </SnackBarProvider>
    </ThemeProvider>
  )
}

UILauncher.displayName = 'UILauncher'

export default UILauncher
