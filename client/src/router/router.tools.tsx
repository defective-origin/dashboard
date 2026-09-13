
import { PathParam, URLSearchParamsInit, createSearchParams, generatePath } from 'react-router-dom'
import { ROUTE_LINKS, RouteLinks, RoutePath } from './router.constants'


export type AppLinkVariant = RouteLinks
export type AppLinkOptions<Name extends AppLinkVariant = 'ROOT'> = {
  to?: Name
  search?: URLSearchParamsInit
  params?: {
    [key in PathParam<RoutePath<Name>>]: string | null;
  }
}

export function generateAppPath<Name extends AppLinkVariant>(options: AppLinkOptions<Name> = {}) {
  const { to = 'ROOT', search, params } = options
  const template = `${ROUTE_LINKS[to]}?${createSearchParams(search)}`

  return generatePath(template, params)
}
