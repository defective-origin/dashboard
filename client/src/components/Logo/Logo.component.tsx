import React, { AnchorHTMLAttributes } from 'react'

// ---| core |---
// ---| pages |---
// ---| screens |---
// ---| components |---
import Icon, { IconSize, IconTypes } from 'components/lib/Icon'
import Image from 'components/Image'

// ---| common |---
import { cn } from 'common/tools'

// ---| self |---
import css from './Logo.module.scss'

export type LogoProps = Omit<React.HTMLProps<HTMLAnchorElement>, 'content'> & {
  className?: string
  children?: React.ReactNode
  content?: React.ReactNode
  icon?: IconTypes
  image?: string
  size?: IconSize
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <Logo />
 */
export function Logo(props: LogoProps): JSX.Element {
  const { size, icon, image, content, children = content, className, ...otherProps } = props
  const _className = cn(css.Logo, className)

  return (
    <a className={_className} {...otherProps}>
      {icon && <Icon className={css.Icon} size={size} type={icon} />}
      {image && <Image className={css.Image} src={image} />}

      {children}
    </a>
  )
}

Logo.displayName = 'Logo'

export default Logo
