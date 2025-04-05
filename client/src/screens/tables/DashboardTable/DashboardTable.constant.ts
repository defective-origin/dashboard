import { Board } from 'api'
import { TableColumn } from 'components/views/Table'
import column from '../columns'

export const DASHBOARD_COLUMNS: TableColumn<Board>[] = [
  column.devices({
    field: 'markups',
  }),
]
