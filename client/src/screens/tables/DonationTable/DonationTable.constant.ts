import { Donation } from 'api'
import { TableColumn } from 'components/Table'
import column from '../columns'

export const DONATION_COLUMNS: TableColumn<Donation>[] = [
  column.clipboard({
    field: 'id',
    fixed: true,
  }),
  column.user({
    field: 'user',
    fixed: true,
  }),
  column.date({
    name: 'Date',
    field: 'createdAt',
  }),
  column.number({
    field: 'value',
    format: 'currency',
  }),
  column.text({
    field: 'content',
    bold: true,
    ellipsis: true,
  }),
]
