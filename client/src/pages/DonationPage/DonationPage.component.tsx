import React from 'react'

// ---| core |---
import { cn } from 'tools'

// ---| pages |---
import Page, { PageProps } from 'pages/Page'

// ---| screens |---
import DonationTable from 'screens/tables/DonationTable'
import ExpensesTable from 'screens/tables/ExpensesTable'

// ---| components |---
// ---| self |---
import css from './DonationPage.module.scss'

export type DonationPageProps = PageProps

/**
 * Component description.
 *
 * How to use
 * @example
 * <DonationPage />
 */
export function DonationPage(props: DonationPageProps): JSX.Element {
  const { children, className, ...otherProps } = props
  const _className = cn(css.DonationPage, className)

  return (
    <Page
      className={_className}
      name='PAGES.DONATION'
      menu={[{ start: 'add', tooltip: 'new request' }]}
      {...otherProps}
    >
      <Page.Content p='sm'>
        <ExpensesTable type='PLANS' area='1 / 1 / 2 / 2' />
        <ExpensesTable type='NEEDS' area='1 / 2 / 2 / 3' />
        <ExpensesTable type='OTHERS' area='1 / 3 / 2 / 4' />

        <DonationTable area='2 / 1 / 4 / 4' />

        {children}
      </Page.Content>
    </Page>
  )
}

DonationPage.displayName = 'DonationPage'

export default DonationPage
