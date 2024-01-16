import React from 'react'

// ---| core |---
import { Outlet } from 'router'

// ---| screens |---
// ---| components |---
import Layout, { LayoutProps } from 'components/Layout'
import Modal, { ModalProps } from 'components/Modal'
import Toast from 'components/Toast'

// ---| common |---
import { cn } from 'common/tools'

// ---| self |---
import css from './App.module.scss'
import AppMenu from './AppMenu'
import AppHeader from './AppHeader'
// TODO: implement drawer, modal, left aside, right aside
import AppDrawer from './AppDrawer'
import AppLeftPanel from './AppLeftPanel'
import AppRightPanel from './AppRightPanel'

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

  // TODO: add drawer
  // TODO: add modal
  return (
    <Layout className={_className} stretch v='left-aside' {...otherProps}>
      <Layout.LeftAside as='nav'><AppMenu /></Layout.LeftAside>
      <Layout.Header as='header'><AppHeader /></Layout.Header>
      <Layout.Content as='main'><Outlet /></Layout.Content>

      {/* <Modal keepMounted open={!!itemMap.modal} content={itemMap.modal} onClose={onModalClose} /> */}

      <Toast.Container name='alerts' className={css.AlertContainer} position='top-center' />
      <Toast.Container name='messages' className={css.MessageContainer} position='bottom-right' />
      <Toast.Container name='guards' className={css.GuardContainer} position='bottom-center' />
    </Layout>
  )
}

App.displayName = 'App'

export default App
