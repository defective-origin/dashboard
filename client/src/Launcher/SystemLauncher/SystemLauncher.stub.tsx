import React from 'react'

// ---| self |---
import { RouterProviderStub } from './RouterProvider'
import { HotKeysProviderStub } from './HotKeysProvider'
import { LocaleProviderStub } from './LocaleProvider'

export type SystemLauncherStubProps = React.PropsWithChildren

export function SystemLauncherStub(props: SystemLauncherStubProps): JSX.Element {
  const { children } = props

  return (
    <React.StrictMode>
      <React.Suspense fallback={<h1>Loading...</h1>}>
        <RouterProviderStub>
          <LocaleProviderStub>
            <HotKeysProviderStub>
              { children }
            </HotKeysProviderStub>
          </LocaleProviderStub>
        </RouterProviderStub>
      </React.Suspense>
    </React.StrictMode>
  )
}

export default SystemLauncherStub
