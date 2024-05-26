import React, { useContext, useMemo } from 'react'

// ---| core |---
import { FeaturesReturnOptions, HotKeysReturnOptions, useFeatures, useHotKeys } from 'hooks'
import { AccountManager, MonitoringReturnOptions, useMonitoring } from 'api'

// ---| components |---
import { ToastReturnOptions, useToast } from 'components/Toast'
import { ModalReturnOptions, useModal } from 'components/Modal'

export type AppOptions =
  & AccountManager
  & MonitoringReturnOptions
  & HotKeysReturnOptions
  & ToastReturnOptions
  & {
    feature: FeaturesReturnOptions
    modal: ModalReturnOptions
  }

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
  const modal = useModal()
  const feature = useFeatures()

  const options = useMemo(
    () => Object.assign({ modal, feature }, toast, monitor, hotkeys, account, defaultOptions),
    [account, defaultOptions, hotkeys, monitor, toast, feature, modal],
  )

  return (
    <AppContext.Provider value={options}>
      { children }
    </AppContext.Provider>
  )
}

AppProvider.displayName = 'AppProvider'
