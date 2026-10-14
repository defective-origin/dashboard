import { SupportRequest } from 'api'
import column from 'screens/tables/columns'

export const SUPPORT_COLUMNS = column.list<SupportRequest>(
  column.clipboard({
    field: 'id',
  }),
  column.user({
    name: 'User',
    field: 'createdBy',
  }),
  column.text({
    field: 'reason',
    align: 'center',
    minWidth: 150,
  }),
  column.text({
    field: 'urgency',
    align: 'center',
    minWidth: 150,
  }),
  column.text({
    field: 'status',
    align: 'center',
    minWidth: 150,
    bold: true,
  }),
  column.date({
    name: 'Creation date',
    field: 'createdAt',
  }),
  column.date({
    name: 'Last update',
    field: 'updatedAt',
  }),
  column.text({
    field: 'content',
    minWidth: 200,
    ellipsis: true,
  }),
)
