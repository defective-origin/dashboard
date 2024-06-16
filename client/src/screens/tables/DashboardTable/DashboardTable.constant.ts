import { Dashboard } from 'api'
import { TableColumn } from 'components/Table'
import column from '../columns'

export const DASHBOARD_COLUMNS: TableColumn<Dashboard>[] = [
  column.clipboard({
    field: 'id',
    fixed: true,
  }),
  // TODO: name + description + image -> + link to widget page
  // TODO: version[on hover show all versions] on click show modal with possibilities of version removing
  column.text({
    field: 'name',
    width: 200,
    ellipsis: true,
    bold: true,
    fixed: true,
    nowrap: true,
  }),
  column.number({
    field: 'price',
    format: 'currency',
  }),
  column.text({
    field: 'access',
    width: 200,
    bold: true,
  }),
  column.user({
    field: 'author',
  }),
  column.usage({
    name: 'Usage',
    mapper: (record) => ({ id: record.id, v: 'dashboard' }),
  }),
  column.devices({
    field: 'devices',
  }),
]
