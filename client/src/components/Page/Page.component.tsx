import React from 'react'
import { Helmet } from '../Helmet'
// ---| pages |---
// ---| screens |---
// ---| components |---
// ---| root |---

// ---| common |---
import { cn } from 'common/tools'

// ---| self |---
import css from './Page.module.scss'
import Layout, {LayoutProps} from '../Layout'

export type PageProps = LayoutProps & {
  title?: string
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
  const { title, children, className, ...otherProps } = props
  const _className = cn(css.Page, className)

  return (
    <Layout className={_className} {...otherProps}>
      <Helmet>
        { title && <title>{title}</title> }
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

