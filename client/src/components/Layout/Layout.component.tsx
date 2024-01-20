import React from 'react'

// ---| common |---
import { react } from 'common/tools'

// ---| components |---
import Block from 'components/Block'
import Section from 'components/Section'

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

  return (
    <div className={className} {...otherProps} style={style}>
      {children}
    </div>
  )
}

Layout.displayName = 'Layout'

export default react.attachComponents(Layout, {
  Item: LayoutItem,
  LeftAside: LayoutItem.LeftAside,
  RightAside: LayoutItem.RightAside,
  Footer: LayoutItem.Footer,
  Header: LayoutItem.Header,
  Content: LayoutItem.Content,
  Section: Section,
  Block: Block,
})
