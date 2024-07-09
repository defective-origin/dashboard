import { SupportRequest } from 'api'
import { TableColumn } from 'components/Table'
import column from '../columns'

export const SUPPORT_COLUMNS: TableColumn<SupportRequest>[] = [
  column.user({
    field: 'user',
  }),
  column.date({
    name: 'Date',
    field: 'createdAt',
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
  column.text({
    field: 'content',
    minWidth: 200,
    ellipsis: true,
  }),
]
