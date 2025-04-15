// Don't move to config file to prevent circle dependencies
export const ROUTE_LINKS = {
  ROOT: '/',
  BOARDS: '/boards',
  BOARD: '/boards/:id',
  WIDGETS: '/widgets',
  WIDGET: '/widgets/:id',
  APPS: '/apps',
  APP: '/apps/:id',
  SERVICES: '/services',
  SERVICE: '/services/:id',
  TRANSLATES: '/translates',
  TRANSLATE: '/translates/:id',
  ACCOUNT: '/account',
  ACCOUNT_WIDGETS: '/account/widgets',
  ACCOUNT_BOARDS: '/account/dashboards',
  GUIDE: '/guide',
  DONATION: '/donation',
  SUPPORT: '/support',
  ERROR: '/error/:v',
} as const

export type RouteLinks = keyof typeof ROUTE_LINKS
export type RoutePath<K extends RouteLinks> = (typeof ROUTE_LINKS)[K]
