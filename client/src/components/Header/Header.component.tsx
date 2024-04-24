import React from 'react'

// ---| core |---
import { cn } from 'tools'

// ---| pages |---
// ---| screens |---
// ---| components |---
import Block, { BlockProps } from 'components/Block'

// ---| self |---
import css from './Header.module.scss'

export type HeaderProps = BlockProps

/**
 * Component description.
 *
 * How to use
 * @example
 * <Header />
 */
export function Header(props: HeaderProps): JSX.Element {
  const { children, className, ...otherProps } = props
  const _className = cn(css.Header, className)

  return <Block className={_className} area='top' {...otherProps}>{children}</Block>
}

Header.displayName = 'Header'

export default Header
