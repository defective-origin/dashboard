import React from 'react'

// ---| core |---
import { useLocaleProvider, RouteProps } from 'Launcher'

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
  const locale = useLocaleProvider()
  const status = STATUS_MAP[type]

  return (
    <Page name={type.toString()} className={_className} {...otherProps}>
      <Banner
        className={css.Banner}
        imageType={status.image}
        title={locale.t(status.title)}
        subtitle={locale.t(status.subtitle)}
        text={locale.t(status.text)}
      >
        {children}
      </Banner>
    </Page>
  )
}

StatusPage.displayName = 'StatusPage'

export default StatusPage
