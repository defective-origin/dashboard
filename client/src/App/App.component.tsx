import React, { useCallback, useEffect } from 'react'

// ---| core |---
import { Outlet } from 'router'
import { useLauncher } from 'Launcher'

// ---| screens |---
// ---| components |---
import Layout, { LayoutProps } from 'components/Layout'
import Modal, { ModalProps } from 'components/lib/Modal'
import ToastContainer from 'components/lib/Toast'

// ---| common |---
import { cn } from 'common/tools'

// ---| self |---
import css from './App.module.scss'
import AppMenu from './AppMenu'
import AppAlert from './AppAlert'
import AppHeader from './AppHeader'
import AppFooter from './AppFooter'
import AppDrawer from './AppDrawer'
import AppLeftPanel from './AppLeftPanel'
import AppRightPanel from './AppRightPanel'
import AppGuard from './AppGuard'

export type CustomPlace = 'menu' | 'left-aside' | 'right-aside' | 'content' | 'header' | 'footer' | 'guard' | 'drawer' | 'modal' | 'alert'
export type UIItem<P extends string, V> = Record<P, V>
export type UIItemMap = UIItem<CustomPlace, React.ReactNode>

export type UIPlace = keyof UIItemMap
export type UILayout = LayoutProps

export const APP_LAYOUT: UILayout = {
  areas: `
    'alert alert alert alert alert'
    'menu header header header drawer'
    'menu left-aside content right-aside drawer'
    'menu left-aside guard right-aside drawer'
    'menu footer footer footer drawer'
  `,
  columns: 'auto auto 1fr auto auto',
  rows: 'auto auto 1fr auto auto',
  items: [
    { area: 'menu', content: <AppMenu />, as: 'nav' },
    { area: 'header', content: <AppHeader />, as: 'header' },
    { area: 'footer', content: <AppFooter />, as: 'footer' },
    // { area: 'modal', content: <div>MODAL</div> },
    { area: 'alert', content: <AppAlert /> },
    { area: 'drawer', content: <AppDrawer />, as: 'aside' },
    { area: 'left-aside', content: <AppLeftPanel />, as: 'aside' },
    { area: 'right-aside', content: <AppRightPanel />, as: 'aside' },
    { area: 'guard', content: <AppGuard /> },
  ],
}

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

  // const closeModal = useCallback(() => app.detach('modal'), [])
  // const closeDrawer = useCallback(() => app.detach('drawer'), [])

  useEffect(() => {
    document.body.classList.add(app.theme)
    document.body.classList.remove(app.theme === 'dark' ? 'light' : 'dark')
    // document.body.classList.remove(toggle(ui.theme, 'light', 'dark'))
  }, [app.theme])

  return (
    <Layout className={_className} {...APP_LAYOUT} {...otherProps}>
      <Layout.Content as='main'>
        <Outlet />
      </Layout.Content>

      <ToastContainer className={css.ToastContainer} position='bottom-right' hideProgressBar />
      {/* <Modal keepMounted open={!!itemMap.modal} content={itemMap.modal} onClose={onModalClose} /> */}
    </Layout>
  )
}

App.displayName = 'App'

export default App
