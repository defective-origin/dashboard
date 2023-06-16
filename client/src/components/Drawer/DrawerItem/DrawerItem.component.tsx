import React, { useLayoutEffect } from 'react'

// ---| components |---
import Layout, { LayoutItemProps } from 'components/Layout'

// ---| common |---
import { cn } from 'common/tools'

// ---| self |---
import css from './DrawerItem.module.scss'
import { useDrawerContext } from '../Drawer.context'

export type DrawerItemProps = LayoutItemProps

export default function DrawerItem(props: DrawerItemProps): JSX.Element | null {
  const { open, className, ...otherProps } = props
  const _className = cn(css.DrawerItem, className)
  const drawerContext = useDrawerContext()

  useLayoutEffect(()  => {
    if (open) {
      drawerContext?.increment()
    }

    return () => {
      if (open) {
        drawerContext?.decrement()
      }
    }
  }, [open])

  return <Layout.Item className={_className} open={open} stretch="xy" {...otherProps} />
}
