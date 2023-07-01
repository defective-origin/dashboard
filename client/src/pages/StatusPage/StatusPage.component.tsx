import React from 'react'
import { RouteComponentProps } from '@reach/router'

// ---| core |---
import { useLocaleProvider } from 'Launcher'

// ---| pages |---
// ---| screens |---
// ---| components |---
import Banner from 'components/Banner'
import { Page } from 'components/Page'

// ---| common |---
import { cn } from 'common/tools'

// ---| self |---
import css from './StatusPage.module.scss'
import { STATUS_MAP, StatusType } from './StatusPage.conf'

export type StatusPageProps = RouteComponentProps & {
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
  const { type = 'default', children, className, ...otherProps } = props
  const locale = useLocaleProvider()
  const _className = cn(css.StatusPage, className)
  const status = STATUS_MAP[type]

  return (
    <Page name={type.toString()} className={_className} position='relative' {...otherProps}>
      <Banner
        className={css.Banner}
        position='absolute'
        placement='center-center'
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
