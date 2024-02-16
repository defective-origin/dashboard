import React from 'react'

// ---| core |---
import { react } from 'tools'

// ---| components |---
import Block from 'components/Block'
import Section from 'components/Section'

// ---| self |---
import LayoutItem from './LayoutItem'
import useLayout, { LayoutOptions } from './Layout.hook'

export type LayoutProps = LayoutOptions

/**
 * Component description.
 *
 * How to use
 * @example
 * <Layout />
 */
export function Layout(props: LayoutProps): JSX.Element | null {
  const { children, className, style, ...otherProps } = useLayout(props)

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
