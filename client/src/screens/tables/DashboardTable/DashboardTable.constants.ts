import { Board } from 'api'
import { TableColumn } from 'components/views/Table'
import column from 'screens/tables/columns'

export const DASHBOARD_COLUMNS: TableColumn<Board>[] = [
  column.markups({
    field: 'markups',
  }),
]
