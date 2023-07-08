import React from 'react'

// ---| core |---
import { useSystemLauncher, RouteProps } from 'Launcher'

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
  type?: StatusType
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <StatusPage />
 */
export function StatusPage(props: StatusPageProps): JSX.Element {
  const { navigate, type = 'default', children, className, ...otherProps } = props
  const _className = cn(css.StatusPage, className)
  const system = useSystemLauncher()
  const status = STATUS_MAP[type]

  return (
    <Page
      className={_className}
      name={system.t('SYSTEM.TAB_NAME', { title: system.t('PAGES.STATUS') })}
      {...otherProps}
    >
      <Banner
        className={css.Banner}
        imageType={status.image}
        title={system.t(status.title)}
        subtitle={system.t(status.subtitle)}
        text={system.t(status.text)}
      >
        {children}
      </Banner>
    </Page>
  )
}

StatusPage.displayName = 'StatusPage'

export default StatusPage
