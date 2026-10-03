import React from 'react'

// ---| core |---
import { cn } from 'tools'

// ---| pages |---
import Page, { PageProps } from 'pages/Page'
// ---| screens |---
import SupportTable from 'screens/tables/SupportTable'
// ---| components |---
import Button from 'components/actions/Button'

// ---| self |---
import css from './SupportPage.module.scss'


export type SupportPageProps = PageProps

/**
 * Component description.
 * @example
 * <SupportPage />
 */
export function SupportPage(props: SupportPageProps) {
  const { children, className, ...otherProps } = props

  // TODO: add stepper to see progress

  return (
    <Page
      className={cn(css.SupportPage, className)}
      name='LABEL.SUPPORT'
      extra={<Button start='add' tooltip='new request' />}
      {...otherProps}
    >
      <Page.Content v='grid' p='sm'>
        <SupportTable />

        {children}
      </Page.Content>
    </Page>
  )
}

SupportPage.displayName = 'SupportPage'

export default SupportPage
