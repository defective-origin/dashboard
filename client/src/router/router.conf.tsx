import { createBrowserRouter } from 'react-router-dom'

// ---| core |---
import App from 'App/App.component'

// ---| pages |---
import AccountPage from 'pages/AccountPage'
import DashboardsPage from 'pages/DashboardsPage'
import DashboardPage from 'pages/DashboardPage'
import DonationPage from 'pages/DonationPage'
import GuidePage from 'pages/GuidePage'
import BannerPage from 'pages/BannerPage'
import SupportPage from 'pages/SupportPage'
import WidgetPage from 'pages/WidgetPage'

// ---| self |---
import { ROUTE_LINKS } from './router.constant'


export const APP_ROUTES = createBrowserRouter([
  {
    path: ROUTE_LINKS.ROOT,
    element: <App />,
    children: [
      { path: ROUTE_LINKS.ROOT, element: <BannerPage v='empty' /> },
      { path: ROUTE_LINKS.BOARDS, element: <DashboardsPage /> },
      { path: ROUTE_LINKS.BOARD, element: <DashboardPage /> },
      { path: ROUTE_LINKS.WIDGETS, element: <WidgetPage /> },
      { path: ROUTE_LINKS.ACCOUNT, element: <AccountPage /> },
      { path: ROUTE_LINKS.GUIDE, element: <GuidePage /> },
      { path: ROUTE_LINKS.DONATION, element: <DonationPage /> },
      { path: ROUTE_LINKS.SUPPORT, element: <SupportPage /> },
      { path: ROUTE_LINKS.ERROR, element: <BannerPage /> },
      { path: '*', element: <BannerPage v={404} /> },
    ],
  },
])
