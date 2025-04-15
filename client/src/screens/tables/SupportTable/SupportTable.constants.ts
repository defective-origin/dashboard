import { SupportRequest } from 'api'
import { TableColumn } from 'components/views/Table'
import column from '../columns'

export const SUPPORT_COLUMNS: TableColumn<SupportRequest>[] = [
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
]
