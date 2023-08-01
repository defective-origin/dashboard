import React from 'react'

// ---| core |---
// ---| pages |---
// ---| screens |---
// ---| components |---
import Image, { ImageTypes } from 'components/Image'

// ---| common |---
import { cn } from 'common/tools'

// ---| self |---
import css from './Logo.module.scss'

export type LogoProps = Omit<React.HTMLProps<HTMLAnchorElement>, 'content'> & {
  className?: string
  children?: React.ReactNode
  content?: React.ReactNode
  image?: ImageTypes
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <Logo />
 */
export function Logo(props: LogoProps): JSX.Element {
  const { image, content, children = content, className, ...otherProps } = props
  const _className = cn(css.Logo, className)

  return (
    <a className={_className} {...otherProps}>
      {image && <Image className={css.Image} type={image} />}

      {children}
    </a>
  )
}

Logo.displayName = 'Logo'

export default Logo
