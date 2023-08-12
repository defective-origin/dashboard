import React from 'react'

// ---| core |---
// ---| pages |---
// ---| screens |---
// ---| components |---
import Image, { ImageTypes } from 'components/Image'
import Link, { LinkProps } from 'components/lib/Link'

// ---| common |---
import { cn } from 'common/tools'

// ---| self |---
import css from './Logo.module.scss'

export type LogoProps = LinkProps & {
  className?: string
  v: ImageTypes
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <Logo />
 */
export function Logo(props: LogoProps): JSX.Element {
  const { v, className, ...otherProps } = props
  const _className = cn(css.Logo, className)

  return (
    <Link className={_className} {...otherProps}>
      <Image className={css.Image} v={v} />
    </Link>
  )
}

Logo.displayName = 'Logo'

export default Logo
