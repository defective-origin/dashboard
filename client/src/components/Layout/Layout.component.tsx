import React from 'react'

// ---| common |---
import { cn, react } from 'common/tools'

// ---| self |---
import './Layout.module.scss'
import LayoutItem from './LayoutItem'

export type LayoutType = 'row' | 'column' | 'header' | 'left-aside' | 'right-aside'

export type LayoutProps = {
  className?: string
  children?: React.ReactNode
  type?: LayoutType
  gap?: string | number
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <Layout />
 */
export function Layout(props: LayoutProps): JSX.Element {
  const { gap, type = 'row', children, className, ...otherProps } = props
  const _className = cn('layout', `layout--${type}`, className)

  const items = React.Children.toArray(children)
  const layoutItems = items.filter((child) => react.hasExemplar(LAYOUT_ITEMS, child))
  const otherItems = items.filter((child) => !react.hasExemplar(LAYOUT_ITEMS, child))
  const hasContentItem = items.some((child) => react.isExemplar(Layout.Content, child))

  return (
    <div className={_className} {...otherProps} style={{ gap }}>
      {hasContentItem && otherItems}

      {!hasContentItem && (
        <Layout.Content>
          {otherItems}
        </Layout.Content>
      )}

      {layoutItems}
    </div>
  )
}

Layout.displayName = 'Layout'

Layout.LeftAside = LayoutItem.LeftAside
Layout.RightAside = LayoutItem.RightAside
Layout.Footer = LayoutItem.Footer
Layout.Header = LayoutItem.Header
Layout.Content = LayoutItem.Content

export const LAYOUT_ITEMS = [Layout.LeftAside, Layout.RightAside, Layout.Footer, Layout.Header, Layout.Content]

export default Layout
