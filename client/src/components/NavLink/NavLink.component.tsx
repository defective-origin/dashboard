import React from 'react'

// ---| core |---
import { NavLink as RouterLink, useMatch } from 'router'
import { cn } from 'tools'

// ---| pages |---
// ---| screens |---
// ---| components |---
import Action, { ActionProps } from 'components/Action'

// ---| self |---
import css from './NavLink.module.scss'

export type NavLinkProps = ActionProps & {
  to: string
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <NavLink />
 */
export function NavLink(props: NavLinkProps): JSX.Element {
  const { to, active, className, ...otherProps } = props
  const _className = cn(css.NavLink, className)
  const isActive = !!useMatch(to ?? 'HAS_NO_MATCH')

  return (
    <Action
      as={RouterLink}
      className={_className}
      to={to}
      active={active ?? isActive}
      {...otherProps}
    />
  )
}

NavLink.displayName = 'NavLink'

export default NavLink
