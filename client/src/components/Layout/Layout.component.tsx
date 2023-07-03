import React from 'react'

// ---| common |---
import { cn } from 'common/tools'

// ---| self |---
import './Layout.module.scss'
import LayoutItem from './LayoutItem'

export type LayoutType = 'row' | 'column' | 'left-aside' | 'right-aside'

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
  const hasSelfComponents = React.Children
    .toArray(children)
    .some((child) => React.isValidElement(child) && LAYOUT_ITEMS.includes((child as JSX.Element).type))

  return (
    <div className={_className} {...otherProps} style={{ gap }}>
      {!hasSelfComponents && (
        <Layout.Content>
          {children}
        </Layout.Content>
      )}

      {hasSelfComponents && children}
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
