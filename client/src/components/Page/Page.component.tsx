import React from 'react'

// ---| core |---
import { cn, react } from 'tools'

// ---| screens |---
// ---| components |---
import Meta, { MetaItem } from 'components/Meta'
import Layout, { LayoutProps } from 'components/Layout'

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
  LeftAside: Layout.LeftAside,
  RightAside: Layout.RightAside,
  Footer: Layout.Footer,
  Header: Layout.Header,
  Content: Layout.Content,
  Section: Layout.Section,
  Block: Layout.Block,
})
