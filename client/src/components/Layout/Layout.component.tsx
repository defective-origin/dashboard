import React from 'react'

// ---| common |---
import { react } from 'common/tools'

// ---| components |---
import Block from 'components/Block'

// ---| self |---
import LayoutItem, { LayoutItemProps } from './LayoutItem'
import useLayout, { UseLayoutOptions } from './Layout.hook'

export type LayoutItem = LayoutItemProps

export type LayoutProps = UseLayoutOptions

/**
 * Component description.
 *
 * How to use
 * @example
 * <Layout />
 */
export function Layout(props: LayoutProps): JSX.Element | null {
  const { options, children, className, style, ...otherProps } = useLayout(props)

  if (!children) {
    return null
  }

  const items = React.Children.toArray(children)
  const layoutItems = items.filter((child) => react.hasExemplar(LAYOUT_ITEMS, child))
  const otherItems = items.filter((child) => !react.hasExemplar(LAYOUT_ITEMS, child))
  const hasContentItem = items.some((child) => react.isExemplar(LayoutWithItems.Content, child))

  return (
    <div className={className} {...otherProps} style={style}>
      {hasContentItem && otherItems}

      {!hasContentItem && (
        <LayoutWithItems.Content>
          {otherItems}
        </LayoutWithItems.Content>
      )}

      {layoutItems}
    </div>
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
