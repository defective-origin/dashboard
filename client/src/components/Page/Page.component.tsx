import React from 'react'

// ---| core |---
import { cn, react } from 'tools'

// ---| screens |---
// ---| components |---
import Meta, { MetaItem } from 'components/Meta'
import Layout, { LayoutProps } from 'components/Layout'

import Item from 'components/Item'
import Aside from 'components/Aside'
import Block from 'components/Block'
import Content from 'components/Content'
import Footer from 'components/Footer'
import Header from 'components/Header'
import Section from 'components/Section'

// ---| self |---
import css from './Page.module.scss'

export type PageProps = LayoutProps & {
  name?: string
  meta?: MetaItem[]
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <Page />
 */
export function Page(props: PageProps): JSX.Element {
  const { name, meta, children, className, ...otherProps } = props
  const _className = cn(css.Page, className)

  return (
    <Layout className={_className} v='columns' stretch {...otherProps}>
      <Meta title={name} items={meta} />

      {children}
    </Layout>
  )
}

export default react.attachComponents(Page, {
  Item,
  Footer,
  Header,
  Content,
  Section,
  Block,
  LeftAside: Aside.Left,
  RightAside: Aside.Right,
})
