import React, { useCallback, useEffect } from 'react'

// ---| core |---
// ---| pages |---
// ---| screens |---
// ---| components |---
import Layout, { LayoutProps } from 'components/Layout'
import Modal, { ModalProps } from 'components/lib/Modal'
import ToastContainer, { toast, ToastContainerProps, ToastOptions } from 'components/lib/Toast'

// ---| common |---
import { cn } from 'common/tools'

// ---| self |---
import css from './UI.module.scss'
import useUILauncher from '../UILauncher.context'

export type CustomPlace = 'menu' | 'leftAside' | 'rightAside' | 'content' | 'header' | 'footer' | 'guard' | 'drawer' | 'modal' | 'alert'
export type UIItem<P extends string, V> = Record<P, V>
export type UIItemMap = UIItem<'toast', ToastOptions | ToastOptions[]>
                      & UIItem<CustomPlace, React.ReactNode>

export type UIPlace = keyof UIItemMap

export function initArray<T>(value: T | T[] = []): T[] {
  return Array.isArray(value) ? value : [value].filter(Boolean)
}

export type UILayout = LayoutProps

export const DEFAULT_UI_LAYOUT: UILayout = {
  areas: `
    'menu alert alert alert alert'
    'menu header header header drawer'
    'menu left-aside content right-aside drawer'
    'menu left-aside guard right-aside drawer'
    'menu footer footer footer drawer'
  `,
  columns: 'auto auto 1fr auto auto',
  rows: 'auto auto 1fr auto auto',
}

export type UIProps = LayoutProps & {
  className?: string
  children?: React.ReactNode
  toaster?: ToastContainerProps
  map?: Partial<UIItemMap>
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <UI />
 */
export function UI(props: UIProps): JSX.Element {
  const { toaster, map = {}, children, className, ...otherProps } = props
  const _className = cn(css.UI, className)
  const ui = useUILauncher()

  const onModalClose = useCallback(() => ui.hide('modal'), [ui])
  const onDrawerClose = useCallback(() => ui.hide('drawer'), [ui])

  // render toasts and remove from layout items to prevent duplicates
  useEffect(() => {
    initArray(map.toast)
      .forEach((item) => toast(item.content, item))

    delete map.toast
  }, [map.toast])

  return (
    <Layout className={_className} {...DEFAULT_UI_LAYOUT} {...otherProps}>
      <Layout.Item area='menu' content={map.menu} as='nav' />
      <Layout.Item area='alert' content={map.alert} />
      <Layout.Item area='drawer' content={map.drawer} as='aside' />
      <Layout.Item area='guard' content={map.guard} />
      <Layout.Item area='left-aside' content={map.leftAside} as='aside' />
      <Layout.Item area='header' content={map.header} as='header' />
      <Layout.Item area='right-aside' content={map.rightAside} as='aside' />
      <Layout.Item area='footer' content={map.footer} as='footer' />
      <Layout.Item area='content' content={children || map.content} as='main' />

      <ToastContainer className={css.ToastContainer} hideProgressBar {...toaster} />
      <Modal keepMounted open={!!map.modal} content={map.modal} onClose={onModalClose} />
    </Layout>
  )
}

UI.displayName = 'UI'

export default UI
