import React from 'react'

// ---| core |---
import { cn } from 'tools'

// ---| pages |---
// ---| screens |---
// ---| components |---
import Block, { BlockProps } from 'components/Block'

// ---| self |---
import css from './Footer.module.scss'

export type FooterProps = BlockProps

/**
 * Component description.
 *
 * How to use
 * @example
 * <Footer />
 */
export function Footer(props: FooterProps): JSX.Element {
  const { children, className, ...otherProps } = props
  const _className = cn(css.Footer, className)

  return <Block className={_className} area='bottom' v='x' {...otherProps}>{children}</Block>
}

Footer.displayName = 'Footer'

export default Footer
