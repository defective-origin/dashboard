import React from 'react'

// ---| core |---
import { cn } from 'tools'

// ---| components |---
import { ButtonStyleOptions, useButtonStyle } from '../Button'
import { withPopup } from 'components/popups/Popup'

// ---| self |---
import css from './Link.module.scss'

export type LinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & ButtonStyleOptions

/**
 * Allows to open other sites.
 * @example
 * <Link />
 */
export const Link = withPopup((props: LinkProps) => {
  const { className, ...otherProps } = useButtonStyle({
    color: props.v !== 'wrapper' ? 'info' : undefined,
    end: 'open_in_new',
    ...props,
  })

  return (
    <a
      {...otherProps}
      className={cn(css.Link, className)}
      target='_blank'
      rel='noreferrer'
    />
  )
})

Link.displayName = 'Link'

export default Link
