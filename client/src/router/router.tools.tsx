
import { PathParam, generatePath } from 'react-router-dom'
import { ROUTE_LINKS, RouteLinks, RoutePath } from './router.constants'

export type GenerateRouterPathOptions<Name extends RouteLinks> = {
  [key in PathParam<RoutePath<Name>>]: string | null;
}

export function generateRouterPath<Name extends RouteLinks>(name: Name, options?: GenerateRouterPathOptions<Name>) {
  return generatePath(
    ROUTE_LINKS[name],
    options as any,
  )
}
