import React from 'react'
import MuiLink from '@mui/material/Link'

// ---| core |---
import { cn } from 'tools'

// ---| components |---
import Icon from 'components/Icon'
import Action, { ActionProps } from 'components/Action'

// ---| self |---
import css from './Link.module.scss'
import { isNewTabLink } from './Link.tool'

export type LinkProps = ActionProps & {
  withIcon?: boolean
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <Link />
 */
export function Link(props: LinkProps): JSX.Element {
  const { end, href, target, withIcon, className, ...otherProps } = props
  const _className = cn(css.Link, className)
  const isOpenInNewTab = isNewTabLink(href, target)
  const linkTarget = isOpenInNewTab ? '_blank' : target
  const showLinkIcon = withIcon || isOpenInNewTab

  return (
    <Action
      as={MuiLink}
      className={_className}
      target={linkTarget}
      rel={isOpenInNewTab ? 'noreferrer' : undefined}
      underline='hover'
      href={href}
      end={end || showLinkIcon && <Icon size={props.size} v='open_in_new' />}
      {...otherProps}
    />
  )
}

Link.displayName = 'Link'

export default Link
