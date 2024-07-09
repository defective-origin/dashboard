import React from 'react'

// ---| core |---
import { t } from 'locale'
import { cn } from 'tools'
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

  return (
    <Table
      title={t('LABEL.PAYMENTS')}
      className={_className}
      columns={DONATION_COLUMNS}
      items={dashboards.data}
      loading={dashboards.isLoading}
      pagination
      {...otherProps}
    >
      {children}
    </Table>
  )
}

DonationTable.displayName = 'DonationTable'

export default DonationTable
