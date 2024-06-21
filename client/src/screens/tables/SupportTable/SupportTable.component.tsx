import React from 'react'

// ---| core |---
import { cn } from 'tools'
import { useLocale } from 'locale'
import { Support, useSupports } from 'api'

// ---| pages |---
// ---| screens |---
// ---| components |---
import Table, { TableProps } from 'components/Table'

// ---| self |---
import css from './SupportTable.module.scss'
import { SUPPORT_COLUMNS } from './SupportTable.constant'

export type SupportTableProps = TableProps<Support>

/**
 * Component description.
 *
 * How to use
 * @example
 * <SupportTable />
 */
export function SupportTable(props: SupportTableProps): JSX.Element {
  const { children, className, ...otherProps } = props
  const _className = cn(css.SupportTable, className)
  const dashboards = useSupports()
  const locale = useLocale()

  return (
    <Table
      title={locale.t('LABEL.REQUESTS')}
      className={_className}
      columns={SUPPORT_COLUMNS}
      items={dashboards}
      loading={dashboards.loading}
      pagination
      {...otherProps}
    >
      {children}
    </Table>
  )
}

SupportTable.displayName = 'SupportTable'

export default SupportTable
