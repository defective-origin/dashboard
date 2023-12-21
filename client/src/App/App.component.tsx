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
import AppFooter from './AppFooter'
import AppDrawer from './AppDrawer'
import AppLeftPanel from './AppLeftPanel'
import AppRightPanel from './AppRightPanel'
import AppGuard from './AppGuard'

export type CustomPlace = 'menu' | 'left' | 'right' | 'content' | 'top' | 'bottom' | 'guard' | 'drawer' | 'modal'
export type UIItem<P extends string, V> = Record<P, V>
export type UIItemMap = UIItem<CustomPlace, React.ReactNode>

export type UIPlace = keyof UIItemMap
export type UILayout = LayoutProps

export const APP_LAYOUT: UILayout = {
  areas: `
    'menu top top top drawer'
    'menu left content right drawer'
    'menu left guard right drawer'
    'menu bottom bottom bottom drawer'
  `,
  columns: 'auto auto 1fr auto auto',
  rows: 'auto 1fr auto auto',
  items: [
    { area: 'menu', content: <AppMenu />, as: 'nav' },
    { area: 'top', content: <AppHeader />, as: 'header' },
    { area: 'bottom', content: <AppFooter />, as: 'footer' },
    // { area: 'modal', content: <div>MODAL</div> },
    { area: 'drawer', content: <AppDrawer />, as: 'aside' },
    { area: 'left', content: <AppLeftPanel />, as: 'aside' },
    { area: 'right', content: <AppRightPanel />, as: 'aside' },
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
  const breakpoints = useBreakpoints()

  useMode(app.theme)
  useMode(breakpoints.names)

  // const closeModal = useCallback(() => app.detach('modal'), [])
  // const closeDrawer = useCallback(() => app.detach('drawer'), [])

  return (
    <Layout className={_className} stretch {...APP_LAYOUT} {...otherProps}>
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
