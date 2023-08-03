import React from 'react'

// ---| common |---
import { cn, react } from 'common/tools'

// ---| self |---
import './Layout.module.scss'
import LayoutItem, { LayoutItemProps } from './LayoutItem'

export type LayoutGap = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type LayoutType = 'row' | 'column' | 'header' | 'left-aside' | 'right-aside'
export type LayoutItem = LayoutItemProps


export type LayoutProps = {
  className?: string
  children?: React.ReactNode
  v?: LayoutType
  gap?: LayoutGap
  areas?: React.CSSProperties['gridTemplateAreas']
  columns?: React.CSSProperties['gridTemplateColumns']
  rows?: React.CSSProperties['gridTemplateRows']
  items?: LayoutItem[]
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <Layout />
 */
export function Layout(props: LayoutProps): JSX.Element | null {
  const { gap, v = 'row', areas, columns, rows, items = [], children, className, ...otherProps } = props
  const _className = cn('layout', !areas && `layout--${v}`, gap && `gap--${gap}`, className)
  const style = {
    gridTemplateAreas: areas,
    gridTemplateColumns: columns,
    gridTemplateRows: rows,
  }

  if (!children) {
    return null
  }

  const generatedItems = items.map((item) => <Layout.Item key={item.area} {...item} />)
  const allItems = [...React.Children.toArray(children), ...generatedItems]
  const layoutItems = allItems.filter((child) => react.hasExemplar(LAYOUT_ITEMS, child))
  const otherItems = allItems.filter((child) => !react.hasExemplar(LAYOUT_ITEMS, child))
  const hasContentItem = allItems.some((child) => react.isExemplar(Layout.Content, child))

  return (
    <div className={_className} {...otherProps} style={style}>
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

Layout.Item = LayoutItem
Layout.LeftAside = LayoutItem.LeftAside
Layout.RightAside = LayoutItem.RightAside
Layout.Footer = LayoutItem.Footer
Layout.Header = LayoutItem.Header
Layout.Content = LayoutItem.Content

export const LAYOUT_ITEMS = [Layout.Item, Layout.LeftAside, Layout.RightAside, Layout.Footer, Layout.Header, Layout.Content]

export default Layout
