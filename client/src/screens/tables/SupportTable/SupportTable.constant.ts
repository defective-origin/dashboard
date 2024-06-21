import { Support } from 'api'
import { TableColumn } from 'components/Table'
import column from '../columns'

export const SUPPORT_COLUMNS: TableColumn<Support>[] = [
  column.clipboard({
    field: 'id',
    fixed: true,
  }),
  column.user({
    field: 'user',
    fixed: true,
  }),
  column.date({
    field: 'date',
  }),
  column.text({
    field: 'type',
    minWidth: 150,
    bold: true,
  }),
  column.text({
    field: 'status',
    minWidth: 150,
    bold: true,
  }),
  column.text({
    field: 'description',
    minWidth: 200,
    bold: true,
    ellipsis: true,
  }),
]
