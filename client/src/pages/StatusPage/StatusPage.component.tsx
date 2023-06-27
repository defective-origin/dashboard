import React from 'react'
import { RouteComponentProps } from '@reach/router'

// ---| pages |---
// ---| screens |---
// ---| components |---
import Banner from 'components/Banner'
import { Page } from 'components/Page'

// ---| common |---
import { cn } from 'common/tools'

// ---| self |---
import css from './StatusPage.module.scss'
import { STATUS_MAP, StatusType } from './StatusPage.constant'

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
  const _className = cn(css.StatusPage, className)
  const status = STATUS_MAP[type]

  return (
    <Page className={_className} position='relative' {...otherProps}>
      <Banner className={css.Banner} position='absolute' placement='center-center' {...status}>
        {children}
      </Banner>
    </Page>
  )
}

StatusPage.displayName = 'StatusPage'

export default StatusPage
