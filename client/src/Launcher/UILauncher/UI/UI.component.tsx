import React, { useCallback } from 'react'

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

export type CustomPlace = 'menu' | 'left-aside' | 'right-aside' | 'content' | 'header' | 'footer' | 'guard' | 'drawer' | 'modal' | 'alert'
export type UIItem<P extends string, V> = Record<P, V>
export type UIItemMap = UIItem<CustomPlace, React.ReactNode>

export type UIPlace = keyof UIItemMap
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
  const { toaster, map = {}, className, ...otherProps } = props
  const _className = cn(css.UI, className)
  const ui = useUILauncher()

  const onModalClose = useCallback(() => ui.detach('modal'), [ui])
  const onDrawerClose = useCallback(() => ui.detach('drawer'), [ui])

  const layoutItems = Object.keys(map).map((area) => (
    <Layout.Item key={area} area={area} content={map[area as keyof UIItemMap]} />
  ))

  return (
    <Layout className={_className} {...DEFAULT_UI_LAYOUT} {...otherProps}>
      {layoutItems}

      <ToastContainer className={css.ToastContainer} position='bottom-right' hideProgressBar {...toaster} />
      {/* <Modal keepMounted open={!!itemMap.modal} content={itemMap.modal} onClose={onModalClose} /> */}
    </Layout>
  )
}

UI.displayName = 'UI'

export default UI
