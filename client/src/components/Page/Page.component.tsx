import React from 'react'

// ---| components |---
import Layout, { LayoutProps } from 'components/Layout'
import Helmet from 'components/lib/Helmet'

// ---| common |---
import { cn } from 'common/tools'

// ---| self |---
import css from './Page.module.scss'

export type PageProps = LayoutProps & {
  name?: string
  className?: string
  children?: React.ReactNode
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <Page />
 */
export function Page(props: PageProps): JSX.Element {
  const { name, children, className, ...otherProps } = props
  const _className = cn(css.Page, className)
  const isHeadChanged = name

  return (
    <Layout className={_className} {...otherProps}>
      {isHeadChanged && (
        <Helmet>
          { name && <title>{name}</title> }
        </Helmet>
      )}

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
