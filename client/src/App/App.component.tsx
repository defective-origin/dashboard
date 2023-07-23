import React, { useEffect } from 'react'

// ---| core |---
import Router, { APP_ROUTES } from 'router'
import { useUILauncher } from 'Launcher'

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
  const ui = useUILauncher()

  useEffect(() => {
    ui.message({ content: 'TOAST +' })

    // setTimeout(() => ui.message({ content: 'TOAST +' }), 5000)
    // setInterval(() => ui.message({ content: 'TOAST +' }), 1000)

    return ui.attach({
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
  }, [])

  useEffect(() => {
    document.body.classList.add(ui.theme)
    document.body.classList.remove(ui.theme === 'dark' ? 'light' : 'dark')
    // document.body.classList.remove(toggle(ui.theme, 'light', 'dark'))
  }, [ui, ui.theme])


  return <Router className={_className} items={APP_ROUTES} {...otherProps} />
}

App.displayName = 'App'

export default App
