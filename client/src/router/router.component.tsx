import { useMemo } from 'react'
import { Router as ReachRouter, RouteComponentProps, RouterProps as ReachRouterProps, createHistory, createMemorySource } from '@reach/router'

// ---| common |---
import { cn } from 'common/tools'

// ---| self |---
import './router.module.scss'

export type RouteProps = RouteComponentProps
export type RouteItem = RouteProps & Record<string, any>

export type RouterProps = ReachRouterProps & {
  className?: string
  items: RouteItem[]
}

export const Router = (props: RouterProps) => {
  const { items, className, ...otherProps } = props
  const _className = cn('router', className)

  const routeItems = useMemo(() => items.map(({ comp: Route, ...routeProps }, idx) => (
    <Route key={routeProps.path ?? idx} {...routeProps} />
  )), [items])

  return (
    <ReachRouter className={_className} {...otherProps}>
      {routeItems}
    </ReachRouter>
  )
}

Router.displayName = 'Router'

export default Router

export { Link, useMatch, useNavigate, useParams, useLocation, LocationProvider } from '@reach/router'
export type { LinkProps, LinkGetProps } from '@reach/router'

export const source = createMemorySource('/')
export const history = createHistory(window as any)
