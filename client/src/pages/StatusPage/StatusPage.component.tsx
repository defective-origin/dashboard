import React from 'react'

// ---| core |---
import { useLauncher } from 'Launcher'
import { RouteProps } from 'router'

// ---| pages |---
// ---| screens |---

// ---| components |---
import Banner from 'components/Banner'
import Page, { PageProps } from 'components/Page'

// ---| common |---
import { cn } from 'common/tools'

// ---| self |---
import css from './StatusPage.module.scss'
import { STATUS_MAP, StatusType } from './StatusPage.conf'

export type StatusPageProps = RouteProps & Omit<PageProps, 'type'> & {
  className?: string
  children?: React.ReactNode
  v?: StatusType
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <StatusPage />
 */
export function StatusPage(props: StatusPageProps): JSX.Element {
  const { navigate, v = 'default', children, className, ...otherProps } = props
  const _className = cn(css.StatusPage, className)
  const app = useLauncher()
  const status = STATUS_MAP[v]

  return (
    <Page
      className={_className}
      name={app.t('SYSTEM.TAB_NAME', { title: app.t('PAGES.STATUS') })}
      {...otherProps}
    >
      <Banner
        className={css.Banner}
        imageType={status.image}
        title={app.t(status.title)}
        subtitle={app.t(status.subtitle)}
        text={app.t(status.text)}
      >
        {children}
      </Banner>
    </Page>
  )
}

StatusPage.displayName = 'StatusPage'

export default StatusPage
