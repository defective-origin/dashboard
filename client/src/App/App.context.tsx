import React, { useContext, useMemo } from 'react'

// ---| core |---
import { HotKeysReturnOptions, useHotKeys } from 'hooks'
import { AccountManager, LogReturnOptions, EventReturnOptions, useLog, useEvent, useFeatureFlags } from 'api'

// ---| components |---
import { ToastReturnOptions, useToast } from 'components/Toast'
import { ModalReturnOptions, useModal } from 'components/Modal'

export type AppOptions =
  & AccountManager
  & HotKeysReturnOptions
  & ToastReturnOptions
  & {
    log: LogReturnOptions
    event: EventReturnOptions
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
  const ff = useFeatureFlags()
  const log = useLog()
  const event = useEvent()
  const hotkeys = useHotKeys()

  // ui
  const toast = useToast()
  const modal = useModal()

  const options = useMemo(
    () => Object.assign({ log, event, modal }, toast, hotkeys, account, defaultOptions),
    [account, defaultOptions, hotkeys, toast, log, event, modal],
  )

  return (
    <AppContext.Provider value={options}>
      { children }
    </AppContext.Provider>
  )
}

AppProvider.displayName = 'AppProvider'
