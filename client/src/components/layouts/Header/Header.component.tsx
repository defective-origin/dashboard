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
 *
 * How to use
 * @example
 * <Header />
 */
export function Header(props: HeaderProps) {
  const { children, className, ...otherProps } = props
  const _className = cn(css.Header, className)

  return <Layout className={_className} area='top' v='cr' aligns='center' {...otherProps}>{children}</Layout>
}

Header.displayName = 'Header'

export default Header
