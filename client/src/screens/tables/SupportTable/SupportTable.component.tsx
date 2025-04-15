import React from 'react'

// ---| core |---
import { cn } from 'tools'
import { t } from 'locale'
import { SupportRequest, useSupportRequests } from 'api'

// ---| pages |---
// ---| screens |---
// ---| components |---
import Table, { TableProps } from 'components/views/Table'

// ---| self |---
import css from './SupportTable.module.scss'
import { SUPPORT_COLUMNS } from './SupportTable.constants'

export type SupportTableProps = TableProps<SupportRequest>

/**
 * Component description.
 *
 * How to use
 * @example
 * <SupportTable />
 */
export function SupportTable(props: SupportTableProps) {
  const { children, className, ...otherProps } = props
  const _className = cn(css.SupportTable, className)
  const requests = useSupportRequests()

  return (
    <Table
      title={t('LABEL.REQUESTS')}
      className={_className}
      columns={SUPPORT_COLUMNS}
      items={requests.data}
      loading={requests.isLoading}
      menu={[
        { start: 'refresh', tooltip: 'Refresh', onClick: () => requests.refetch() },
        { start: 'add', tooltip: 'Add Request' },
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
