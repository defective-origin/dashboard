import React from 'react'

// ---| core |---
import { react } from 'tools'

// ---| components |---
// ---| self |---
import useLayout, { LayoutOptions } from './Layout.hooks'

export type LayoutProps<E extends React.ElementType = React.ElementType> = react.CustomTagProps<LayoutOptions, E>

/**
 * Grid orientation component.
 * Allows to work with Grid items.
 *
 * Pay attention that preset components,
 * like: Content, Header and so on,
 * have block layout.
 *
 * How to use
 * @example
 * // grid markup
 * <Layout>
 *  <Item />
 *  <Item area='2/2' />
 *  <Item area='3/3' />
 *  <Block area='4/4' />
 *  <Layout area='5/5' />
 * </Layout>
 *
 * // markup
 * <Layout>
 *  <Item area='top' />
 *  <Item area='left' />
 *  <Item area='content' />
 *  <Block area='right' />
 *  <Layout area='bottom' />
 * </Layout>
 * // or via preset components
 * <Layout>
 *  <Header />
 *  <Left />
 *  <Content />
 *  <Right />
 *  <Footer />
 * </Layout>
 */
export function Layout<E extends React.ElementType = 'div'>(props: LayoutProps<E>) {
  const { as: Tag = 'div', ...layoutProps } = useLayout(props)

  return <Tag {...layoutProps} />
}

Layout.displayName = 'Layout'

export default Layout
