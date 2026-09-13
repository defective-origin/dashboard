import React from 'react'

// ---| core |---
import { cn } from 'tools'

// ---| pages |---
import Page, { PageProps } from 'pages/Page'
// ---| screens |---
import DonationTable from 'screens/tables/DonationTable'
import ExpensesTable from 'screens/tables/ExpensesTable'
// ---| components |---
import Button from 'components/actions/Button'

// ---| self |---
import css from './DonationPage.module.scss'

export type DonationPageProps = PageProps

/**
 * Component description.
 * @example
 * <DonationPage />
 */
export function DonationPage(props: DonationPageProps) {
  const { children, className, ...otherProps } = props

  // TODO: show cold map by  day, week, month, year, period. show list of dons on cell hover

  return (
    <Page
      className={cn(css.DonationPage, className)}
      name='LABEL.PAYMENTS'
      extra={<Button start='add' tooltip='request' />}
      {...otherProps}
    >
      <Page.Content p='sm' g='sm'>
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
