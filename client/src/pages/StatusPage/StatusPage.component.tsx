import React, { useEffect } from 'react'

// ---| core |---
import { useLauncher } from 'Launcher'
// ---| pages |---
// ---| screens |---
import Page, { PageProps } from 'screens/Page'

// ---| components |---
import Banner from 'components/Banner'

// ---| common |---
import { cn } from 'common/tools'

// ---| self |---
import css from './StatusPage.module.scss'
import { STATUS_MAP, StatusVariant } from './StatusPage.conf'

export type StatusPageProps = {
  className?: string
  children?: React.ReactNode
  v?: StatusVariant
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <StatusPage />
 */
export function StatusPage(props: StatusPageProps): JSX.Element {
  const { v = 'default', children, className, ...otherProps } = props
  const _className = cn(css.StatusPage, className)
  const app = useLauncher()
  const status = STATUS_MAP[v]

  // FIXME: REMOVE THIS TEST EFFECT
  // useEffect(() => {
  //   app.message(
  //     {content: 'TEST MESSAGE'},
  //   )
  //   app.alert(
  //     {content: 'Test Text', status: 'error'},
  //     {content: 'Test Text', status: 'warning'},
  //     {content: 'Test Text', status: 'info'},
  //     {content: 'Test Text', status: 'success'},
  //   )
  // }, [])

  return (
    <Page className={_className} {...otherProps}>
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
