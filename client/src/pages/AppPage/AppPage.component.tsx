import React from 'react'

// ---| core |---
import { useSystemLauncher, Router } from 'Launcher'

// ---| pages |---
import StatusPage from 'pages/StatusPage'
import HotKeysPage from 'pages/HotKeysPage'

// ---| screens |---

// ---| components |---
import Page, { PageProps } from 'components/Page'

// ---| common |---
import { cn } from 'common/tools'

// ---| self |---
import css from './AppPage.module.scss'
import AppMenuScreen from './AppMenuScreen'

export type AppPageProps = PageProps & {
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
  const system = useSystemLauncher()

  return (
    <Page
      className={_className}
      name={system.t('SYSTEM.TAB_NAME', { title: system.t('PAGES.STATUS') })}
      type='left-aside'
      {...otherProps}
    >
      <Page.LeftAside>
        <AppMenuScreen />
      </Page.LeftAside>

      <Page.Content>
        <Router>
          <StatusPage path='/hotkeys' type='welcome' />
          {/* <DashboardPage path='/dashboard/:id' />
          <WidgetPage path='/widget/:id' />
          <AccountPage path='/account' />
          <GuidePage path='/guide' />
          <DonationPage path='/donation' /> */}
          <HotKeysPage path='/' />
          {/* <SupportPage path='/support' /> */}
          <StatusPage path='/error/:type' />
          <StatusPage default type={404} />
        </Router>
      </Page.Content>
    </Page>
  )
}

export default AppPage
