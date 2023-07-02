import React from 'react'

// ---| core |---
import { Router } from 'Launcher'

// ---| pages |---
import StatusPage from 'pages/StatusPage'

// ---| screens |---
import AppMenuScreen from '../../screens/AppMenuScreen'

// ---| components |---
import Page from '../../components/Page'

// ---| common |---
import { cn } from 'common/tools'

// ---| self |---
import css from './AppPage.module.scss'

export type AppPageProps = {
  className?: string
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <AppPage />
 */
export function AppPage(props: AppPageProps): JSX.Element {
  const { className, ...otherProps } = props
  const _className = cn(css.AppPage, className)

  return (
    <Page name='App' className={_className} {...otherProps}>
      <Page.LeftAside>
        <AppMenuScreen />
      </Page.LeftAside>

      <Page.Content>
        <Router>
          <StatusPage path="/" type='welcome' />
          {/* <DashboardPage path="/dashboard/:id" />
          <WidgetPage path="/widget/:id" />
          <AccountPage path="/account" />
          <GuidePage path="/guide" />
          <DonationPage path="/donation" />
          <HotkeysPage path="/hotkeys" />
          <SupportPage path="/support" /> */}
          <StatusPage path="/error/:type" />
          <StatusPage default type={404} />
        </Router>
      </Page.Content>
    </Page>
  )
}

export default AppPage
