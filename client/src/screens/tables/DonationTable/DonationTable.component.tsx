import React from 'react'

// ---| core |---
import { cn } from 'tools'
import { useLocale } from 'locale'
import { Donation, useDonations } from 'api'

// ---| pages |---
// ---| screens |---
// ---| components |---
import Table, { TableProps } from 'components/Table'

// ---| self |---
import css from './DonationTable.module.scss'
import { DONATION_COLUMNS } from './DonationTable.constant'

export type DonationTableProps = TableProps<Donation>

/**
 * Component description.
 *
 * How to use
 * @example
 * <DonationTable />
 */
export function DonationTable(props: DonationTableProps): JSX.Element {
  const { children, className, ...otherProps } = props
  const _className = cn(css.DonationTable, className)
  const dashboards = useDonations()
  const locale = useLocale()

  return (
    <Table
      title={locale.t('LABEL.PAYMENTS')}
      className={_className}
      columns={DONATION_COLUMNS}
      items={dashboards}
      loading={dashboards.loading}
      pagination
      {...otherProps}
    >
      {children}
    </Table>
  )
}

DonationTable.displayName = 'DonationTable'

export default DonationTable
