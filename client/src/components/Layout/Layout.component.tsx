import React from 'react'

// ---| common |---
import { cn, react } from 'common/tools'

// ---| components |---
import Block, { BlockProps } from 'components/Block'

// ---| self |---
import './Layout.module.scss'
import LayoutItem, { LayoutItemProps } from './LayoutItem'

export type LayoutVariant = 'row' | 'rows' | 'column' | 'columns' | 'header' | 'footer' | 'left-aside' | 'right-aside' | 'grid'
export type LayoutItem = LayoutItemProps


export type LayoutProps = BlockProps<typeof LayoutItem> & {
  className?: string
  children?: React.ReactNode
  v?: LayoutVariant
  areas?: React.CSSProperties['gridTemplateAreas'] // remove dynamic layout?
  columns?: React.CSSProperties['gridTemplateColumns'] // remove dynamic layout?
  rows?: React.CSSProperties['gridTemplateRows'] // remove dynamic layout?
  items?: LayoutItem[] // remove dynamic layout?
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <Layout />
 */
export function Layout(props: LayoutProps): JSX.Element | null {
  const { v = 'rows', areas, columns, rows, direction, items = [], scroll, children, className, ...otherProps } = props
  const _className = cn('layout', !areas && `layout--${v}`, className)
  const style = {
    gridTemplateAreas: areas,
    gridTemplateColumns: columns,
    gridTemplateRows: rows,
  }

  if (!children) {
    return null
  }

  const generatedItems = items.map((item) => <LayoutWithItems.Item key={item.area} {...item} />)
  const allItems = [...React.Children.toArray(children), ...generatedItems]
  const layoutItems = allItems.filter((child) => react.hasExemplar(LAYOUT_ITEMS, child))
  const otherItems = allItems.filter((child) => !react.hasExemplar(LAYOUT_ITEMS, child))
  const hasContentItem = allItems.some((child) => react.isExemplar(LayoutWithItems.Content, child))

  return (
    <Block className={_className} {...otherProps} style={style}>
      {hasContentItem && otherItems}

      {!hasContentItem && (
        <LayoutWithItems.Content scroll={scroll} direction={direction}>
          {otherItems}
        </LayoutWithItems.Content>
      )}

      {layoutItems}
    </Block>
  )
}

Layout.displayName = 'Layout'

const LayoutWithItems = react.attachComponents(Layout, {
  Item: LayoutItem,
  LeftAside: LayoutItem.LeftAside,
  RightAside: LayoutItem.RightAside,
  Footer: LayoutItem.Footer,
  Header: LayoutItem.Header,
  Content: LayoutItem.Content,
  Block: Block,
})

export const LAYOUT_ITEMS = [
  LayoutWithItems.Item,
  LayoutWithItems.LeftAside,
  LayoutWithItems.RightAside,
  LayoutWithItems.Footer,
  LayoutWithItems.Header,
  LayoutWithItems.Content,
]

export default LayoutWithItems
