// ---| pages |---
import AccountPage from 'pages/AccountPage'
import DashboardPage from 'pages/DashboardPage'
import DonationPage from 'pages/DonationPage'
import GuidePage from 'pages/GuidePage'
import HotKeysPage from 'pages/HotKeysPage'
import StatusPage from 'pages/StatusPage'
import SupportPage from 'pages/SupportPage'
import WidgetPage from 'pages/WidgetPage'

// ---| self |---
import { RouteItem } from './router.component'

export const APP_ROUTES: RouteItem[] = [
  { comp: StatusPage, path: '/', type: 'welcome' },
  { comp: DashboardPage, path: '/dashboard/:id' },
  { comp: WidgetPage, path: '/widget/:id' },
  { comp: AccountPage, path: '/account' },
  { comp: GuidePage, path: '/guide' },
  { comp: DonationPage, path: '/donation' },
  { comp: HotKeysPage, path: '/hotkeys' },
  { comp: SupportPage, path: '/support' },
  { comp: StatusPage, path: '/error/:type' },
  { comp: StatusPage, default: true, type: 404 },
]
