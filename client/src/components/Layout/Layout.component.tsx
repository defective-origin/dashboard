import React from 'react'

// ---| common |---
import { cn, react } from 'common/tools'

// ---| components |---
import Block from 'components/Block'

// ---| self |---
import './Layout.module.scss'
import LayoutItem, { LayoutItemProps } from './LayoutItem'

export type LayoutGap = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type LayoutVariant = 'row' | 'column' | 'top' | 'bottom' | 'left' | 'right'
export type LayoutItem = LayoutItemProps


export type LayoutProps = {
  className?: string
  children?: React.ReactNode
  v?: LayoutVariant
  gap?: LayoutGap
  areas?: React.CSSProperties['gridTemplateAreas']
  columns?: React.CSSProperties['gridTemplateColumns']
  rows?: React.CSSProperties['gridTemplateRows']
  items?: LayoutItem[]
  stretch?: boolean
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <Layout />
 */
export function Layout(props: LayoutProps): JSX.Element | null {
  const { gap, v = 'row', areas, columns, rows, items = [], stretch, children, className, ...otherProps } = props
  const _className = cn('layout', !areas && `layout--${v}`, stretch && 'layout--stretch', gap && `gap--${gap}`, className)
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

// FIXME: remove
Layout.Item = LayoutItem
Layout.Left = LayoutItem.Left
Layout.Right = LayoutItem.Right
Layout.Bottom = LayoutItem.Bottom
Layout.Top = LayoutItem.Top
Layout.Content = LayoutItem.Content
Layout.Block = Block

export const LAYOUT_ITEMS = [Layout.Item, Layout.Left, Layout.Right, Layout.Bottom, Layout.Top, Layout.Content]

export default react.attachComponents(Layout, {
  Item: LayoutItem,
  Left: LayoutItem.Left,
  Right: LayoutItem.Right,
  Bottom: LayoutItem.Bottom,
  Top: LayoutItem.Top,
  Content: LayoutItem.Content,
  Block: Block,
})
