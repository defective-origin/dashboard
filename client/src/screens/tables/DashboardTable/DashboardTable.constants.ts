import { Board } from 'api'
import column from 'screens/tables/columns'

export const DASHBOARD_COLUMNS = column.list<Board>(
  column.markups({
    field: 'markups',
  }),
)
