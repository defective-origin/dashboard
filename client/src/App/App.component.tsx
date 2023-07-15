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
      // content: <div>CONTENT</div>,
      toast: { content: 'TOAST' },
      // modal: { content: 'TOAST' },
      alert: { content: 'ALERT' },
      drawer: { title: 'DRAWER' },
      leftAside: <div>LEFT ASIDE</div>,
      rightAside: <div>RIGHT ASIDE</div>,
      footer: { start: <div>FOOTER START</div>, center: <div>FOOTER CENTER</div>, end: <div>FOOTER END</div> },
      header: { start: <div>HEADER START</div>, center: <div>HEADER CENTER</div>, end: <div>HEADER END</div> },
      guard: { start: <div>GUARD START</div>, center: <div>GUARD CENTER</div>, end: <div>GUARD END</div> },
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
