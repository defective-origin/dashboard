import React, { useEffect } from 'react'

// ---| core |---
import { Router, useUILauncher } from 'Launcher'

// ---| pages |---
import StatusPage from 'pages/StatusPage'
import HotKeysPage from 'pages/HotKeysPage'

// ---| screens |---
// ---| components |---

// ---| common |---
import { cn } from 'common/tools'

// ---| self |---
import css from './App.module.scss'
import AppMenu from './AppMenu'

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
    ui.show({
      menu: <AppMenu />,
      // modal: <div>MODAL</div>,
      alert: <div>ALERT</div>,
      drawer: <div>DRAWER</div>,
      leftAside: <div>LEFT ASIDE</div>,
      rightAside: <div>RIGHT ASIDE</div>,
      footer: <div>FOOTER</div>,
      header: <div>HEADER</div>,
      guard: <div>GUARD</div>,
      toast: { content: 'TOAST' },
    })

    // setTimeout(() => ui.show({ toast: { content: 'TOAST +' } }), 5000)
    // setInterval(() => ui.show({ toast: { content: 'TOAST +' } }), 5000)
  }, [ui.show])


  return (
    <Router className={_className} {...otherProps}>
      <StatusPage path='/hotkeys' type='welcome' />
      {/* <DashboardPage path='/dashboard/:id' />
      <WidgetPage path='/widget/:id' />
      <AccountPage path='/account' />
      <GuidePage path='/guide' />
      <DonationPage path='/donation' /> */}
      <HotKeysPage path='/' />
      {/* <SupportPage path='/support' /> */}
      <StatusPage path='/error/:type' />
      <StatusPage default type={404} />

      {children}
    </Router>
  )
}

App.displayName = 'App'

export default App
