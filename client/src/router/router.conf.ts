// ---| pages |---
import AccountPage from 'pages/AccountPage'
import DashboardPage from 'pages/DashboardPage'
import DonationPage from 'pages/DonationPage'
import GuidePage from 'pages/GuidePage'
import StatusPage from 'pages/StatusPage'
import SupportPage from 'pages/SupportPage'
import WidgetPage from 'pages/WidgetPage'

// ---| self |---
import { RouteItem } from './router.component'

export const ROUTE_LINKS = {
  ROOT: '/',
  DASHBOARDS: '/dashboards',
  DASHBOARD: '/dashboards/:id',
  WIDGETS: '/widgets',
  WIDGET: '/widgets/:id',
  ACCOUNT: '/account',
  GUIDE: '/guide',
  DONATION: '/donation',
  SUPPORT: '/support',
  ERROR: '/error/:v',
}

export const APP_ROUTES: RouteItem[] = [
  { comp: StatusPage, path: ROUTE_LINKS.ROOT, v: 'welcome' },
  { comp: DashboardPage, path: ROUTE_LINKS.DASHBOARDS },
  { comp: WidgetPage, path: ROUTE_LINKS.WIDGETS },
  { comp: AccountPage, path: ROUTE_LINKS.ACCOUNT },
  { comp: GuidePage, path: ROUTE_LINKS.GUIDE },
  { comp: DonationPage, path: ROUTE_LINKS.DONATION },
  { comp: SupportPage, path: ROUTE_LINKS.SUPPORT },
  { comp: StatusPage, path: ROUTE_LINKS.ERROR },
  { comp: StatusPage, default: true, v: 404 },
]
