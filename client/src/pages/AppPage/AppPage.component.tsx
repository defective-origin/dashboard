import React, { useEffect } from 'react'

// ---| core |---
import { useSystemLauncher, Router, useUILauncher } from 'Launcher'

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
  const ui = useUILauncher()

  useEffect(() => {
    ui.show({
      // content: <div>CONTENT</div>,
      toast: { content: 'TOAST' },
      // modal: { content: 'TOAST' },
      alert: { content: 'ALERT' },
      drawer: { title: 'DRAWER' },
      leftAside: <div>LEFT ASIDE</div>,
      rightAside: <div>RIGHT ASIDE</div>,
      footer: { start: <div>FOOTER START</div>, center: <div>FOOTER CENTER</div>, end: <div>FOOTER END</div> },
      header: { start: <div>HEADER START</div>, center: <div>HEADER CENTER</div>, end: <div>HEADER END</div> },
      guard: { start: <div>GUARD START</div>, center: <div>GUARD CENTER</div>, end: <div>GUARD END</div> },
    })

    setInterval(() => ui.show({ toast: { content: 'TOAST +' } }), 500)
  }, [])


  return (
    <Page
      className={_className}
      name={system.t('SYSTEM.TAB_NAME', { title: system.t('PAGES.STATUS') })}
      type='left-aside'
      {...otherProps}
    >
      <Page.LeftAside>
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
