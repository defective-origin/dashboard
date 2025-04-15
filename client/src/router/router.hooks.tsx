
import { NavigateOptions as ReactNavigateOptions, PathParam, useNavigate as useRouterNavigate, generatePath } from 'react-router-dom'
import { ROUTE_LINKS, RouteLinks, RoutePath } from './router.constants'
import { useFunc } from 'hooks'

export type NavigateOptions<Name extends RouteLinks> = ReactNavigateOptions & {
  params: {
    [key in PathParam<RoutePath<Name>>]: string | null;
  }
}

export function useNavigate<Name extends RouteLinks>() {
  const nav = useRouterNavigate()

  return useFunc((name: Name, options?: NavigateOptions<Name>) => {
    return nav(
      generatePath(
        ROUTE_LINKS[name],
        options?.params as any,
      ),
      options,
    )
  },
  )
}
