import React, { useCallback, useEffect } from 'react'

// ---| core |---
// ---| pages |---
// ---| screens |---
// ---| components |---
import Layout from 'components/Layout'
import Modal from 'components/lib/Modal'
import Alert, { AlertProps } from 'components/lib/Alert'
import Card, { CardProps } from 'components/lib/Card'
import ToastContainer, { toast, ToastContainerProps, ToastOptions } from 'components/lib/Toast'
import Block, { BlockProps } from 'components/Block'

// ---| common |---
import { cn } from 'common/tools'

// ---| self |---
import css from './UILayout.module.scss'
import useUILauncher from '../UILauncher.context'
import UILayoutMenu, { UILayoutMenuItem } from './UILayoutMenu'


export type UIItem<P extends string, V> = Record<P, V>
export type UIItemMap = UIItem<'alert', AlertProps>
                      & UIItem<'toast', ToastOptions | ToastOptions[]>
                      & UIItem<'menu', UILayoutMenuItem | UILayoutMenuItem[]>
                      & UIItem<'leftAside' | 'rightAside' | 'content', React.ReactNode>
                      & UIItem<'header' | 'footer' | 'guard', BlockProps>
                      & UIItem<'drawer' | 'modal', CardProps>

export type UIPlace = keyof UIItemMap

export function initArray<T>(value: T | T[] = []): T[] {
  return Array.isArray(value) ? value : [value].filter(Boolean)
}

export type UILayoutProps = {
  className?: string
  children?: React.ReactNode
  toastConfig?: ToastContainerProps
  map: Partial<UIItemMap>
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <UILayout />
 */
export function UILayout(props: UILayoutProps): JSX.Element {
  const { toastConfig, map, children, className, ...otherProps } = props
  const _className = cn(css.UILayout, className)
  const ui = useUILauncher()

  const onModalClose = useCallback(() => ui.hide('modal'), [ui])
  const onDrawerClose = useCallback(() => ui.hide('drawer'), [ui])
  const onAlertClose = useCallback(() => ui.hide('alert'), [ui])

  // render toasts and remove from layout items to prevent duplicates
  useEffect(() => {
    initArray(map.toast)
      .forEach((item) => toast(item.content, item))

    delete map.toast
  }, [map])

  return (
    <Layout className={_className} type='header' {...otherProps}>
      <Layout.LeftAside className={css.Menu}>
        <UILayoutMenu items={initArray(map.menu)} />
      </Layout.LeftAside>

      <Layout.Header className={css.Alert}>
        <Alert {...map.alert} onClose={onAlertClose} />
      </Layout.Header>

      <Layout.RightAside className={css.Drawer}>
        <Card {...map.drawer} scroll='y' onClose={onDrawerClose} />
      </Layout.RightAside>

      <Layout.Footer className={css.Guard}>
        <Block {...map.guard} />
      </Layout.Footer>

      <Layout.Content className={css.SecondLayout}>
        <Layout className={css.Layout} type='header'>
          <Layout.LeftAside className={css.LeftAside} scroll='y'>
            {map.leftAside}
          </Layout.LeftAside>

          <Layout.Header className={css.Header}>
            <Block {...map.header} />
          </Layout.Header>

          <Layout.RightAside className={css.RightAside} scroll='y'>
            {map.rightAside}
          </Layout.RightAside>

          <Layout.Footer className={css.Footer}>
            <Block {...map.footer} />
          </Layout.Footer>

          <Layout.Content className={css.Content} scroll='y'>
            {map.content}
            {children}
          </Layout.Content>

          <ToastContainer className={css.ToastContainer} {...toastConfig} />
        </Layout>

      </Layout.Content>

      <Modal
        keepMounted
        onClose={onModalClose}
        open={!!map.modal}
        {...map.modal}
      />
    </Layout>
  )
}

UILayout.displayName = 'UILayout'

export default UILayout
