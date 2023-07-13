import React from 'react'

// ---| components |---
import Layout, { LayoutProps } from 'components/Layout'
import Block from 'components/Block'
import Helmet from 'components/lib/Helmet'

// ---| common |---
import { cn } from 'common/tools'

// ---| self |---
import './Page.module.scss'

export type PageProps = LayoutProps & {
  className?: string
  children?: React.ReactNode
  name?: string
}

const NAME = 'page'

/**
 * Component description.
 *
 * How to use
 * @example
 * <Page />
 */
export function Page(props: PageProps): JSX.Element {
  const { name, children, className, ...otherProps } = props
  const _className = cn(NAME, className)

  return (
    <Layout className={_className} {...otherProps}>
      {/* Add page metadata */}
      <Helmet>
        { name && <title>{name}</title> }
      </Helmet>

      {children}
    </Layout>
  )
}

export default Page

Page.LeftAside = Layout.LeftAside
Page.RightAside = Layout.RightAside
Page.Footer = Layout.Footer
Page.Header = Layout.Header
Page.Content = Layout.Content
Page.Block = Block
