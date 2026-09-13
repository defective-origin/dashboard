import React from 'react'

// ---| core |---
import { cn } from 'tools'

// ---| pages |---
// ---| screens |---
// ---| components |---
import Layout, { LayoutProps } from 'components/layouts/Layout'

// ---| self |---
import css from './Header.module.scss'

export type HeaderProps = LayoutProps

/**
 * Component description.
 * @example
 * <Header />
 */
export function Header(props: HeaderProps) {
  const { children, className, ...otherProps } = props

  return <Layout className={cn(css.Header, className)} area='top' v='cr' aligns='center' {...otherProps}>{children}</Layout>
}

Header.displayName = 'Header'

export default Header
