import { createBrowserRouter } from 'react-router-dom'

// ---| core |---
import App from 'App'

// ---| pages |---
import GuidePage from 'pages/GuidePage'
import BannerPage from 'pages/BannerPage'
import SupportPage from 'pages/SupportPage'
import AccountPage from 'pages/AccountPage'
import DonationPage from 'pages/DonationPage'
import WidgetPage from 'pages/WidgetPage'
import WidgetsPage from 'pages/WidgetsPage'
import DashboardPage from 'pages/DashboardPage'
import DashboardsPage from 'pages/DashboardsPage'
import AccountWidgetsPage from 'pages/AccountWidgetsPage'
import AccountDashboardsPage from 'pages/AccountDashboardsPage'

// ---| self |---
import { ROUTE_LINKS } from './router.constants'


export const APP_ROUTES = createBrowserRouter([
  {
    path: ROUTE_LINKS.ROOT,
    element: <App />,
    children: [
      { path: ROUTE_LINKS.ROOT, element: <BannerPage v='empty' /> },
      { path: ROUTE_LINKS.BOARDS, element: <DashboardsPage /> },
      { path: ROUTE_LINKS.BOARD, element: <DashboardPage /> },
      { path: ROUTE_LINKS.WIDGETS, element: <WidgetsPage /> },
      { path: ROUTE_LINKS.WIDGET, element: <WidgetPage /> },
      { path: ROUTE_LINKS.APPS, element: <></> },
      { path: ROUTE_LINKS.APP, element: <></> },
      { path: ROUTE_LINKS.SERVICES, element: <></> },
      { path: ROUTE_LINKS.SERVICE, element: <></> },
      { path: ROUTE_LINKS.TRANSLATES, element: <></> },
      { path: ROUTE_LINKS.TRANSLATE, element: <></> },
      {
        path: ROUTE_LINKS.ACCOUNT,
        element: <AccountPage />,
        children: [
          { path: ROUTE_LINKS.ACCOUNT_WIDGETS, element: <AccountWidgetsPage /> },
          { path: ROUTE_LINKS.ACCOUNT_BOARDS, element: <AccountDashboardsPage /> },
        ],
      },
      { path: ROUTE_LINKS.GUIDE, element: <GuidePage /> },
      { path: ROUTE_LINKS.DONATION, element: <DonationPage /> },
      { path: ROUTE_LINKS.SUPPORT, element: <SupportPage /> },
      { path: ROUTE_LINKS.ERROR, element: <BannerPage /> },
      { path: '*', element: <BannerPage v={404} /> },
    ],
  },
])
