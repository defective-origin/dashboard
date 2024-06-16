import React, { forwardRef } from 'react'

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
import Action, { ActionProps } from 'components/Action'

// ---| self |---
import css from './NavLink.module.scss'

export type NavLinkProps<Name extends RouteLinks = 'ROOT'> = ActionProps & {
  to?: Name
  search?: URLSearchParamsInit
  params?: {
    [key in PathParam<RoutePath<Name>>]: string | null;
  }
}
// TODO: remove forwardRef after migrating to react 19

/**
 * Component description.
 *
 * How to use
 * @example
 * <NavLink to='WIDGETS' />
 */
export const NavLink = forwardRef<unknown, NavLinkProps>(<Name extends RouteLinks,>(props: NavLinkProps<Name>, ref: React.LegacyRef<unknown>): JSX.Element => {
  const { to = 'ROOT', params, search, active, className, ...otherProps } = props
  const _className = cn(css.NavLink, className)
  const template = `${ROUTE_LINKS[to]}?${createSearchParams(search)}`
  const url = generatePath(template, params)
  const isActive = !!useMatch(url)

  return (
    <Action
      ref={ref}
      as={RouteLink}
      className={_className}
      to={url}
      active={active ?? isActive}
      {...otherProps}
    />
  )
}) as <Name extends RouteLinks,>(props: NavLinkProps<Name>, ref: unknown) => JSX.Element

// NavLink.displayName = 'NavLink'

export default NavLink
