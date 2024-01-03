import React, { useCallback, useEffect } from 'react'

// ---| core |---
import { Outlet } from 'router'
import { useLauncher } from 'Launcher'

// ---| screens |---
// ---| components |---
import Layout, { LayoutProps } from 'components/Layout'
import Modal, { ModalProps } from 'components/Modal'
import ToastContainer from 'components/Toast'

// ---| common |---
import { cn } from 'common/tools'
import { useMode, useBreakpoints } from 'common/hooks'

// ---| self |---
import css from './App.module.scss'
import AppMenu from './AppMenu'
import AppHeader from './AppHeader'
// TODO: implement drawer, modal, left aside, right aside
import AppDrawer from './AppDrawer'
import AppLeftPanel from './AppLeftPanel'
import AppRightPanel from './AppRightPanel'

export type CustomPlace = 'menu' | 'left' | 'right' | 'content' | 'top' | 'bottom' | 'guard' | 'drawer' | 'modal'
export type UIItem<P extends string, V> = Record<P, V>
export type UIItemMap = UIItem<CustomPlace, React.ReactNode>

export type UIPlace = keyof UIItemMap
export type UILayout = LayoutProps

export type AppProps = {
  className?: string
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <App />
 */
export function App(props: AppProps): JSX.Element {
  const { className, ...otherProps } = props
  const _className = cn(css.App, className)
  const app = useLauncher()
  // TODO: занести в UI лончер
  const breakpoints = useBreakpoints()

  // TODO: занести в UI лончер
  // move to ui launcher
  useMode(app.theme)
  useMode(breakpoints.names)

  // const closeModal = useCallback(() => app.detach('modal'), [])
  // const closeDrawer = useCallback(() => app.detach('drawer'), [])

  // TODO: add drawer
  // TODO: add modal
  return (
    <Layout className={_className} stretch v='left' {...otherProps}>
      <Layout.Left as='nav'><AppMenu /></Layout.Left>
      <Layout.Top as='header'><AppHeader /></Layout.Top>
      <Layout.Content as='main'><Outlet /></Layout.Content>


      {/* TODO: change layout */}
      {/* <Layout.Item as='aside' area='drawer' ><AppDrawer /></Layout.Item>
      <Layout.Item as='aside' area='left' ><AppLeftPanel /></Layout.Item>
      <Layout.Item as='aside' area='right' ><AppRightPanel /></Layout.Item> */}



      <ToastContainer enableMultiContainer containerId='alerts' className={css.AlertContainer} position='top-center' hideProgressBar />
      <ToastContainer enableMultiContainer containerId='messages' className={css.MessageContainer} position='bottom-right' hideProgressBar />
      <ToastContainer enableMultiContainer containerId='guards' className={css.GuardContainer} position='bottom-center' hideProgressBar />
      {/* <Modal keepMounted open={!!itemMap.modal} content={itemMap.modal} onClose={onModalClose} /> */}
    </Layout>
  )
}

App.displayName = 'App'

export default App
