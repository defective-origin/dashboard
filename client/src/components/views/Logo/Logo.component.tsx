import React from 'react'

// ---| core |---
import { cn } from 'tools'
import { AppLink } from 'router'

// ---| components |---
import Media, { MediaProps } from 'components/views/Media'

// ---| self |---
import css from './Logo.module.scss'

export type LogoProps = Pick<MediaProps, 'width' | 'height'> & {
  className?: string
}

/**
 * Component description.
 * @example
 * <Logo />
 */
export function Logo(props: LogoProps) {
  const { width, height, className, ...otherProps } = props

  return (
    <AppLink className={cn(css.Logo, className)} v='wrapper' to='ROOT' {...otherProps}>
      <Media className={css.Image} v='logo' width={width} height={height} />
    </AppLink>
  )
}

Logo.displayName = 'Logo'

export default Logo
