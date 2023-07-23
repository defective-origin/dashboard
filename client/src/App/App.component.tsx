import React, { useEffect } from 'react'

// ---| core |---
import { Router, useUILauncher } from 'Launcher'

// ---| pages |---
import StatusPage from 'pages/StatusPage'
import HotKeysPage from 'pages/HotKeysPage'
import AccountPage from 'pages/AccountPage'
import DonationPage from 'pages/DonationPage'
import GuidePage from 'pages/GuidePage'
import SupportPage from 'pages/SupportPage'
import DashboardPage from 'pages/DashboardPage'
import WidgetPage from 'pages/WidgetPage'

// ---| screens |---
// ---| components |---

// ---| common |---
import { cn } from 'common/tools'

// ---| self |---
import css from './App.module.scss'
import AppMenu from './AppMenu'
import AppHeader from './AppHeader'

export type AppProps = {
  className?: string
  children?: React.ReactNode
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <App />
 */
export function App(props: AppProps): JSX.Element {
  const { children, className, ...otherProps } = props
  const _className = cn(css.App, className)
  const ui = useUILauncher()

  useEffect(() => {
    ui.attach({
      menu: <AppMenu />,
      header: <AppHeader />,
      // modal: <div>MODAL</div>,
      alert: <div>ALERT</div>,
      drawer: <div>DRAWER</div>,
      'left-aside': <div>LEFT ASIDE</div>,
      'right-aside': <div>RIGHT ASIDE</div>,
      footer: <div>FOOTER</div>,
      guard: <div>GUARD</div>,
    })

    ui.message({ content: 'TOAST +' })

    // setTimeout(() => ui.message({ content: 'TOAST +' }), 5000)
    // setInterval(() => ui.message({ content: 'TOAST +' }), 1000)
  }, [])


  return (
    <Router className={_className} {...otherProps}>
      <StatusPage path='/' type='welcome' />
      <DashboardPage path='/dashboard/:id' />
      <WidgetPage path='/widget/?:id' />
      <AccountPage path='/account' />
      <GuidePage path='/guide' />
      <DonationPage path='/donation' />
      <HotKeysPage path='/hotkeys' />
      <SupportPage path='/support' />
      <StatusPage path='/error/:type' />
      <StatusPage default type={404} />

      {children}
    </Router>
  )
}

App.displayName = 'App'

export default App
