import React from 'react'

// ---| core |---
import { cn } from 'tools'

// ---| components |---
import Block, { BlockProps } from 'components/layouts/Block'

// ---| self |---
import css from './Header.module.scss'


export type HeaderProps = BlockProps

/**
 * Component description.
 * @example
 * <Header />
 */
export function Header(props: HeaderProps) {
  const { children, className, ...otherProps } = props

  return (
    <Block
      as='header'
      className={cn(css.Header, className)}
      area='top'
      aligns='center'
      v='x'
      justifies='space-between'
      {...otherProps}
    >
      {children}
    </Block>
  )
}

Header.displayName = 'Header'

export default Header
