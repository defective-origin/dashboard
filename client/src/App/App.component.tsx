import React from 'react'

// ---| core |---
import { cn } from 'tools'

// ---| screens |---
// ---| components |---
import Layout, { LayoutProps } from 'components/Layout'
import Modal from 'components/Modal'
import Toast from 'components/Toast'

// ---| self |---
import './App.module.scss'
import AppMenu from './AppMenu'
import AppHeader from './AppHeader'
import AppContent from './AppContent'
import AppActions from './AppActions'

export type AppProps = LayoutProps

/**
 * Component description.
 *
 * How to use
 * @example
 * <App />
 */
export function App(props: AppProps): JSX.Element {
  const { children, className, ...otherProps } = props
  const _className = cn('app', className)

  return (
    <Layout className={_className} stretch v='left' {...otherProps}>
      <AppMenu />
      <AppHeader />
      <AppContent />
      <AppActions />

      {children}

      <Modal.Container name='global' />

      <Toast.Container name='alerts' position='top-center' />
      <Toast.Container name='messages' position='bottom-right' />
      <Toast.Container name='guards' position='bottom-center' width={700} />
    </Layout>
  )
}

App.displayName = 'App'

export default App
