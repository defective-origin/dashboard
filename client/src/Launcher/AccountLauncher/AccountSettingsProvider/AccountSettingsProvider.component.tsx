import React, { useEffect, useMemo, useState } from 'react'

// ---| core |---
import { useUISettingsProvider } from 'Launcher/UILauncher/UISettingsProvider'

// ---| self |---
import {
  AccountSettingsProviderContext,
  AccountSettingsProviderOptions,
  AccountSettingsProviderState,
} from './AccountSettingsProvider.context'

export type AccountSettingsProviderProps = React.PropsWithChildren

export function AccountSettingsProvider(props: AccountSettingsProviderProps): JSX.Element {
  const [current, setCurrent] = useState<AccountSettingsProviderState>(null)
  const ui = useUISettingsProvider()

  // FIXME: show spinner until user loaded?

  useEffect(() => {
    if (current) {
      ui.change({ theme: current.theme })
    }
  }, [current])

  const options = useMemo<AccountSettingsProviderOptions>(() => ({
    current,
    change: (patch) => setCurrent((state) => state && { ...state, ...patch }),
    isLoaded: !!current,
  }), [current])

  return <AccountSettingsProviderContext.Provider value={options} {...props} />
}

AccountSettingsProvider.displayName = 'AccountSettingsProvider'

export default AccountSettingsProvider
