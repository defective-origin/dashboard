import { Feature } from 'api'
import { TableColumn } from 'components/views/Table'
import column from '../columns'

export const FEATURE_COLUMNS: TableColumn<Feature>[] = [
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
  column.number({
    field: 'rate',
    format: 'amount',
  }),
  column.boolean({
    field: 'public',
  }),
  column.user({
    name: 'User',
    field: 'createdBy',
  }),
  // column.number({
  //   name: 'usage',
  //   mapper: record => ({ id: record.id, v: 'dashboard' }),
  // }),
]
