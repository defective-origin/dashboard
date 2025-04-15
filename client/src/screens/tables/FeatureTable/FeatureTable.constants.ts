import { Feature } from 'api'
import { TableColumn } from 'components/views/Table'
import column from '../columns'

export const FEATURE_COLUMNS: TableColumn<Feature>[] = [
  column.clipboard({
    field: 'id',
    fixed: true,
  }),
  // TODO: name + description + image -> + link to widget page
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
    name: 'income',
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
