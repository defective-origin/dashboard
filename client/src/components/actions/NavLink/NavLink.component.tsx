import React from 'react'

// ---| core |---
import { cn } from 'tools'
import {
  RouteLinks,
  RoutePath,
  useMatch,
  ROUTE_LINKS,
  generatePath,
  createSearchParams,
  URLSearchParamsInit,
  PathParam,
  RouteLink,
} from 'router'

// ---| pages |---
// ---| screens |---
// ---| components |---
import Action, { ActionProps } from 'components/actions/Action'

// ---| self |---
import css from './NavLink.module.scss'

export type NavLinkVariant = RouteLinks
export type NavLinkProps<Name extends NavLinkVariant = 'ROOT'> = ActionProps & {
  to?: Name
  search?: URLSearchParamsInit
  params?: {
    [key in PathParam<RoutePath<Name>>]: string | null;
  }
}


/**
 * Component description.
 *
 * How to use
 * @example
 * <NavLink to='WIDGETS' />
 */
export const NavLink = <Name extends NavLinkVariant,>(props: NavLinkProps<Name>) => {
  const { to = 'ROOT', params, search, active, className, ...otherProps } = props
  const _className = cn(css.NavLink, className)
  const template = `${ROUTE_LINKS[to]}?${createSearchParams(search)}`
  const url = generatePath(template, params)
  const isActive = !!useMatch(url)

  return (
    <Action
      as={RouteLink}
      className={_className}
      to={url}
      active={active ?? isActive}
      {...otherProps}
    />
  )
}

NavLink.displayName = 'NavLink'

export default NavLink
