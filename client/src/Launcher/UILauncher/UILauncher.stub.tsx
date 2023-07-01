import React from 'react'

// ---| self |---
import { ModalWindowProviderStub } from './ModalWindowProvider'
import { SnackBarProviderStub } from './SnackBarProvider'
import { UISettingsProviderStub } from './UISettingsProvider'

export type UILauncherStubProps = React.PropsWithChildren

export function UILauncherStub(props: UILauncherStubProps): JSX.Element {
  const { children } = props

  return (
    <UISettingsProviderStub>
      <SnackBarProviderStub>
        <ModalWindowProviderStub>
          {children}
        </ModalWindowProviderStub>
      </SnackBarProviderStub>
    </UISettingsProviderStub>
  )
}

export default UILauncherStub
