import React from 'react'

// ---| core |---
import { Outlet } from 'router'
import { cn } from 'tools'

// ---| screens |---
// ---| components |---
import Layout from 'components/Layout'
import Toast from 'components/Toast'

// ---| self |---
import './App.module.scss'
import AppMenu from './AppMenu'
import AppHeader from './AppHeader'

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
  const _className = cn('app', className)

  // TODO: add AppDrawer
  // TODO: add AppModal
  // TODO: add AppDialog
  return (
    <Layout className={_className} stretch v='columns' {...otherProps}>
      <Layout.LeftAside as='nav'><AppMenu /></Layout.LeftAside>
      <Layout.Header as='header'><AppHeader /></Layout.Header>
      <Layout.Content as='main'><Outlet /></Layout.Content>

      {/* <Modal keepMounted open={!!itemMap.modal} content={itemMap.modal} onClose={onModalClose} /> */}

      <Toast.Container name='alerts' className='alert-container' position='top-center' />
      <Toast.Container name='messages' className='message-container' position='bottom-right' />
      <Toast.Container name='guards' className='guard-container' position='bottom-center' />
    </Layout>
  )
}

App.displayName = 'App'

export default App
