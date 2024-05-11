import React from 'react'

// ---| core |---
import { RouteLinks, RouteLink, useMatch } from 'router'
import { cn } from 'tools'

// ---| pages |---
// ---| screens |---
// ---| components |---
import Action, { ActionProps } from 'components/Action'

// ---| self |---
import css from './NavLink.module.scss'

export type NavLinkProps = ActionProps & {
  to?: RouteLinks
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <NavLink to='WIDGETS' />
 */
export function NavLink(props: NavLinkProps): JSX.Element {
  const { to, active, className, ...otherProps } = props
  const _className = cn(css.NavLink, className)
  const isActive = !!useMatch(to ?? 'HAS_NO_MATCH')

  return (
    <Action
      as={RouteLink}
      className={_className}
      to={to}
      active={active ?? isActive}
      {...otherProps}
    />
  )
}

NavLink.displayName = 'NavLink'

export default NavLink
