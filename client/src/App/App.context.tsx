import React, { useContext, useMemo } from 'react'

// ---| core |---
import { FeaturesReturnOptions, HotKeysReturnOptions, useFeatures, useHotKeys } from 'hooks'
import { AccountManager, MonitoringReturnOptions, useMonitoring } from 'api'

// ---| components |---
import { ToastReturnOptions, useToast } from 'components/Toast'

export type AppOptions = AccountManager
                      & MonitoringReturnOptions
                      & FeaturesReturnOptions
                      & HotKeysReturnOptions
                      & ToastReturnOptions

export const AppContext = React.createContext({} as AppOptions)
AppContext.displayName = 'AppContext'

export const useApp = () => useContext(AppContext)

export default useApp

export type AppProviderProps = React.PropsWithChildren & {
  account: AccountManager
}

export function AppProvider(props: AppProviderProps): JSX.Element {
  const { account, children, ...defaultOptions } = props
  // system
  const hotkeys = useHotKeys()
  const monitor = useMonitoring()
  // ui
  const toast = useToast()
  const features = useFeatures()

  const options = useMemo(
    () => Object.assign({}, toast, features, monitor, hotkeys, account, defaultOptions),
    [account, defaultOptions, features, hotkeys, monitor, toast],
  )

  return (
    <AppContext.Provider value={options}>
      { children }
    </AppContext.Provider>
  )
}

AppProvider.displayName = 'AppProvider'
