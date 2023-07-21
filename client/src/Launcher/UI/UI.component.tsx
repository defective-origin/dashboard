import React, { useCallback, useEffect, useMemo } from 'react'

// ---| components |---
import Layout, { LayoutProps } from 'components/Layout'
import Modal, { ModalProps } from 'components/lib/Modal'
import ToastContainer, { toast, ToastContainerProps, ToastOptions } from 'components/lib/Toast'

// ---| common |---
import { cn } from 'common/tools'
import { useObject } from 'common/hooks'

// ---| self |---
import css from './UI.module.scss'
import useLauncher from '../Launcher.context'
import { UIItemMap, UIPlace, DEFAULT_UI_LAYOUT } from './UI.conf'

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
  const { toaster, children, className, ...otherProps } = props
  const _className = cn(css.UI, className)
  const itemMap = useObject({ content: children } as UIItemMap)
  const app = useLauncher()

  const onModalClose = useCallback(() => app.hide('modal'), [app])
  const onDrawerClose = useCallback(() => app.hide('drawer'), [app])

  useEffect(() => {
    const actions = {
      attach: (store: any, options: Partial<UIItemMap>) => itemMap.merge(options),
      detach: (store: any, ...args: UIPlace[]) => itemMap.omit(...args),
      message: (store: any, ...args: ToastOptions[]) => args.forEach((item) => toast(item.content, item)),
      // modal: (store: any, ...args: UIPlace[]) => itemMap.omit(), // center left right top bottom
      // drawer: (store: any, ...args: UIPlace[]) => {},
    }

    console.log({...app})
    app.register(actions)

    return () => app.unregister(actions)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  console.log(itemMap.current)

  const layoutItems = useMemo(() => Object.keys(itemMap.current).map((area) => (
    <Layout.Item key={area} area={area} content={itemMap.current[area as keyof typeof itemMap.current]} />
  )), [itemMap.current])

  return (
    <Layout className={_className} {...DEFAULT_UI_LAYOUT} {...otherProps}>
      {layoutItems}

      <ToastContainer className={css.ToastContainer} hideProgressBar {...toaster} />
      {/* <Modal keepMounted open={!!itemMap.modal} content={itemMap.modal} onClose={onModalClose} /> */}
    </Layout>
  )
}

UI.displayName = 'UI'

export default UI
