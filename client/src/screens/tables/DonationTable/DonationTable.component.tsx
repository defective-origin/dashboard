import React from 'react'

// ---| core |---
import { t } from 'locale'
import { cn } from 'tools'
import { Donation, useDonations } from 'api'

// ---| screens |---
// ---| components |---
import Button from 'components/actions/Button'
import Table, { TableProps } from 'components/views/Table'

// ---| self |---
import css from './DonationTable.module.scss'
import { DONATION_COLUMNS } from './DonationTable.constants'

export type DonationTableProps = TableProps<Donation>

/**
 * Component description.
 * @example
 * <DonationTable />
 */
export function DonationTable(props: DonationTableProps) {
  const { children, className, ...otherProps } = props
  const requests = useDonations()

  return (
    <Table
      title={t('LABEL.DONATIONS')}
      className={cn(css.DonationTable, className)}
      columns={DONATION_COLUMNS}
      items={requests.data}
      loading={requests.isLoading}
      menu={[
        <Button start='refresh' tooltip='Refresh' onClick={() => requests.refetch()} />,
        <Button start='add' tooltip='new request' />,
      ]}
      pagination
      {...otherProps}
    >
      {children}
    </Table>
  )
}

DonationTable.displayName = 'DonationTable'

export default DonationTable
