import React from 'react'

// ---| core |---
import { cn } from 'tools'
import { t } from 'locale'
import { SupportRequest, useSupportRequests } from 'api'

// ---| screens |---
// ---| components |---
import Button from 'components/actions/Button'
import Table, { TableProps } from 'components/views/Table'

// ---| self |---
import css from './SupportTable.module.scss'
import { SUPPORT_COLUMNS } from './SupportTable.constants'

export type SupportTableProps = TableProps<SupportRequest>

/**
 * Component description.
 * @example
 * <SupportTable />
 */
export function SupportTable(props: SupportTableProps) {
  const { children, className, ...otherProps } = props
  const requests = useSupportRequests()

  return (
    <Table
      title={t('LABEL.REQUESTS')}
      className={cn(css.SupportTable, className)}
      columns={SUPPORT_COLUMNS}
      items={requests.data}
      loading={requests.isLoading}
      menu={[
        <Button start='refresh' tooltip='Refresh' onClick={() => requests.refetch()} />,
        <Button start='add' tooltip='Add Request' />,
      ]}
      pagination
      {...otherProps}
    >
      {children}
    </Table>
  )
}

SupportTable.displayName = 'SupportTable'

export default SupportTable
