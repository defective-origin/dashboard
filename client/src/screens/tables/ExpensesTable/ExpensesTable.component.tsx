import React from 'react'

// ---| core |---
import { cn } from 'tools'
import { Expense, ExpenseType, useExpenses } from 'api'

// ---| pages |---
// ---| screens |---
// ---| components |---
import Table, { TableProps } from 'components/views/Table'

// ---| self |---
import css from './ExpensesTable.module.scss'
import { EXPENSE_COLUMNS } from './ExpensesTable.constants'

export type ExpensesTableProps = TableProps<Expense> & {
  type?: ExpenseType
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <ExpensesTable />
 */
export function ExpensesTable(props: ExpensesTableProps) {
  const { type, children, className, ...otherProps } = props
  const _className = cn(css.ExpensesTable, className)
  const response = useExpenses(type)

  // TODO: add '+' to table in order to add new record

  return (
    <Table
      className={_className}
      title={type}
      items={response.data}
      loading={response.isLoading}
      columns={EXPENSE_COLUMNS}
      {...otherProps}
    >
      {children}
    </Table>
  )
}

ExpensesTable.displayName = 'ExpensesTable'

export default ExpensesTable
