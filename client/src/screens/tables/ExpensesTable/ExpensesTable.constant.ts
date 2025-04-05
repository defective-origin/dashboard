import { TableColumn } from 'components/views/Table'
import column from '../columns'
import { Expense } from 'api'

export const EXPENSE_COLUMNS: TableColumn<Expense>[] = [
  column.text({
    field: 'name',
  }),
  column.number({
    field: 'price',
    format: 'currency',
  }),
  column.number({
    name: 'Received',
    field: 'value',
    format: 'currency',
  }),
]
