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
  short?: ImageTypes
  full?: ImageTypes
  open?: boolean
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <Logo />
 */
export function Logo(props: LogoProps): JSX.Element {
  const { open, full, short, content, children = content, className, ...otherProps } = props
  const _className = cn(css.Logo, open && css.Full, className)
  const hasOneLogo = !(full && short)
  const isShortActive = hasOneLogo || !open
  const isFullActive = hasOneLogo || open

  return (
    <a className={_className} {...otherProps}>
      {short && <Image className={cn(css.Image, isShortActive && css.Active)} v={short} />}
      {full && <Image className={cn(css.Image, isFullActive && css.Active)} v={full} />}

      {children}
    </a>
  )
}

Logo.displayName = 'Logo'

export default Logo
