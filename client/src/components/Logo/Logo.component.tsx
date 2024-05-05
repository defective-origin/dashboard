import React from 'react'

// ---| core |---
import { cn } from 'tools'

// ---| pages |---
// ---| screens |---
// ---| components |---
import Image, { ImageProps, ImageVariant } from 'components/Image'
import Link, { LinkProps } from 'components/Link'

// ---| self |---
import css from './Logo.module.scss'

export type LogoProps = Omit<LinkProps, 'v'> & {
  className?: string
  v: ImageVariant
  width?: ImageProps['width']
  height?: ImageProps['height']
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <Logo />
 */
export function Logo(props: LogoProps): JSX.Element {
  const { width, height, v, className, ...otherProps } = props
  const _className = cn(css.Logo, className)

  return (
    <Link className={_className} {...otherProps}>
      <Image className={css.Image} v={v} width={width} height={height} />
    </Link>
  )
}

Logo.displayName = 'Logo'

export default Logo
