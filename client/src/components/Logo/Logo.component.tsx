import React from 'react'

// ---| core |---
import { cn } from 'tools'

// ---| pages |---
// ---| screens |---
// ---| components |---
import Image, { ImageProps } from 'components/Image'
import NavLink from 'components/NavLink'

// ---| self |---
import css from './Logo.module.scss'

export type LogoProps = {
  className?: string
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
  const { width = 42, height, className, ...otherProps } = props
  const _className = cn(css.Logo, className)

  return (
    <NavLink className={_className} to='ROOT' {...otherProps}>
      <Image className={css.Image} v='logo' width={width} height={height} />
    </NavLink>
  )
}

Logo.displayName = 'Logo'

export default Logo
