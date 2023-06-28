import React from 'react'

// ---| self |---
import { ModalWindowProviderStub } from './ModalWindowProvider'
import { SnackBarProviderStub } from './SnackBarProvider'
import { ThemeProviderStub } from './ThemeProvider'

export type UILauncherStubProps = React.PropsWithChildren

export function UILauncherStub(props: UILauncherStubProps): JSX.Element {
  const { children } = props

  return (
    <ThemeProviderStub>
      <SnackBarProviderStub>
        <ModalWindowProviderStub>
          {children}
        </ModalWindowProviderStub>
      </SnackBarProviderStub>
    </ThemeProviderStub>
  )
}

export default UILauncherStub
