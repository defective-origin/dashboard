// Don't move to config file to prevent circle dependencies
export const ROUTE_LINKS = {
  ROOT: '/',
  BOARDS: 'boards',
  BOARD: 'boards/:id',
  WIDGETS: 'widgets',
  WIDGET: 'widgets/:id',
  ACCOUNT: 'account',
  GUIDE: 'guide',
  DONATION: 'donation',
  SUPPORT: 'support',
  ERROR: 'error/:v',
}

export type RouteLinks = keyof typeof ROUTE_LINKS
