import React, { useCallback } from 'react'

// ---| core |---
// ---| screens |---
// ---| components |---
import Head, { HeadItem } from 'components/Head'
import Layout, { LayoutProps } from 'components/Layout'

// ---| common |---
import { cn, react } from 'common/tools'

// ---| self |---
import css from './Page.module.scss'

export type PageProps = LayoutProps & {
  name?: string
  meta?: HeadItem[]
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
      <Head title={name} items={meta} />

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
