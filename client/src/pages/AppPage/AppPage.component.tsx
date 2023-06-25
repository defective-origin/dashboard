import React from 'react'

// ---| pages |---
// ---| screens |---
import AppMenuScreen from '../../screens/AppMenuScreen'
// ---| components |---
import Page from '../../components/Page'
// ---| root |---

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
    <Page title='App' className={_className} stretch='xy' {...otherProps}>
      <Page.LeftAside>
        <AppMenuScreen />
      </Page.LeftAside>

      <Page.Content />
    </Page>
  )
}

export default AppPage
