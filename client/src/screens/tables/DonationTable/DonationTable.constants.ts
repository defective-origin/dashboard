import { Donation } from 'api'
import column from 'screens/tables/columns'

export const DONATION_COLUMNS = column.list<Donation>(
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
)
