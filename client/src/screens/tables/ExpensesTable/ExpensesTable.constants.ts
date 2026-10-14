import column from 'screens/tables/columns'
import { Expense } from 'api'

export const EXPENSE_COLUMNS = column.list<Expense>(
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
)
