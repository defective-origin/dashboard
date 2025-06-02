import React from 'react'

// ---| core |---
import { cn } from 'tools'

// ---| screens |---
// ---| components |---
import Layout, { LayoutProps } from 'components/layouts/Layout'
import Modal from 'components/popups/Modal'
import Toast from 'components/popups/Toast'

// ---| self |---
import './App.module.scss'
import AppMenu from './AppMenu'
import AppHeader from './AppHeader'
import AppContent from './AppContent'

export type AppProps = LayoutProps

/**
 * Component description.
 *
 * How to use
 * @example
 * <App />
 */
export function App(props: AppProps) {
  const { children, className, ...otherProps } = props
  const _className = cn('app', className)

  // TODO: change and load account theme
  // // update account theme on app theme change
  // useEffect(() => account.update({ user: { settings: { theme: theme.current.toUpperCase() } } }), [theme])

  // update app theme on account load
  // useEffect(() => theme.set(account.user?.settings.theme.toLowerCase()), [account])

  return (
    <Layout className={_className} stretch v='left' {...otherProps}>
      <AppMenu />
      <AppHeader />
      <AppContent />

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
