import React from 'react'

// ---| core |---
import { cn } from 'tools'

// ---| components |---
import Block, { BlockProps } from 'components/layouts/Block'

// ---| self |---
import css from './Footer.module.scss'

export type FooterProps = BlockProps

/**
 * Component description.
 * @example
 * <Footer />
 */
export function Footer(props: FooterProps) {
  const { children, className, ...otherProps } = props

  return <Block as='footer' className={cn(css.Footer, className)} area='bottom' v='x' {...otherProps}>{children}</Block>
}

Footer.displayName = 'Footer'

export default Footer
