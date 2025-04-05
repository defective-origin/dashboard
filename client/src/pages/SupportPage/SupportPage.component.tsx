import React from 'react'

// ---| core |---
import { cn } from 'tools'

// ---| pages |---
import Page, { PageProps } from 'pages/Page'

// ---| screens |---
import SupportTable from 'screens/tables/SupportTable'

// ---| components |---
// ---| self |---
import css from './SupportPage.module.scss'

export type SupportPageProps = PageProps

/**
 * Component description.
 *
 * How to use
 * @example
 * <SupportPage />
 */
export function SupportPage(props: SupportPageProps): JSX.Element {
  const { children, className, ...otherProps } = props
  const _className = cn(css.SupportPage, className)

  return (
    <Page
      className={_className}
      name='PAGES.SUPPORT'
      menu={[{ start: 'add', tooltip: 'new request' }]}
      {...otherProps}
    >
      <Page.Content p='sm'>
        <SupportTable />

        {children}
      </Page.Content>
    </Page>
  )
}

SupportPage.displayName = 'SupportPage'

export default SupportPage
