import { Donation } from 'api'
import { TableColumn } from 'components/views/Table'
import column from '../columns'

export const DONATION_COLUMNS: TableColumn<Donation>[] = [
  column.clipboard({
    field: 'id',
  }),
  column.user({
    name: 'User',
    field: 'createdBy',
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
