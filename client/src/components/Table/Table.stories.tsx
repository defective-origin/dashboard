/* eslint-disable no-restricted-imports */
import { field, params } from '../../../.storybook/tool'
import type { Meta, StoryObj } from '@storybook/react'
import Text from 'components/Text'
import Table, { TableProps } from './Table.component'
import { TableColumn } from './Table.type'
import column from './Table.tool'
import { Color } from 'theme'

type Item = {
  name: string;
  code?: string;
  population?: number;
  size?: number;
  density?: number;
  salary?: number;
  gdp?: number;
  date?: Date;
  isBig?: boolean;
}

const COLUMNS: TableColumn<Item>[] = [
  // base config with alignment, data mapping and props providing
  {
    fixed: true,
    name: 'Name',
    cell: Text,
    minWidth: 100,
    align: 'center',
    alignCell: 'left',
    props: { v: 'caption', size: 'xxs', bold: true },
    mapper: (item) => ({ content: item.name, ellipsis: true }),
  },
  column.text({
    field: 'code',
    align: 'center',
    color: 'secondary',
    name: 'ISO\u00a0Code',
    minWidth: 100,
    bold: true,
  }),
  // name taken from field
  column.number({
    field: 'population',
    format: 'amount',
    bold: true,
  }),
  column.icon({
    field: 'isBig',
    name: 'big',
    fill: true,
    mapper: (_, __, is) => is ? { v: 'add' } : { v: 'info' },
  }),
  // fixed column
  column.number({
    fixed: true,
    field: 'size',
    name: 'Size\u00a0(km\u00b2)',
    color: 'warning',
  }),
  column.number({
    name: 'Density',
    field: 'density',
  }),
  column.number({
    name: 'Salary',
    field: 'salary',
    format: 'currency',
  }),
  // manual map data to component props
  column.number({
    fixed: true,
    name: 'GDP',
    field: 'gdp',
    format: 'currency',
    mapper: (_, __, field) => {
      let color: Color = 'primary'

      if (field < 1_000_000) {
        color = 'error'
      } else if (field < 1_000_000_000) {
        color = 'warning'
      } else if (field < 1_000_000_000_000) {
        color = 'success'
      } else {
        color = 'info'
      }

      return { content: field, color }
    },
  }),
  column.date({
    fixed: true,
    field: 'date',
    name: 'Created',
  }),
]

function createData(
  name: string,
  code?: string,
  population?: number,
  size?: number,
  salary?: number,
  gdp?: number,
  date?: Date,
) {
  const hasValue = population && size
  const density = hasValue && population / size
  const isBig = !!size && size > 1_000_000

  return { name, code, population, size, density, salary, gdp, date, isBig }
}

const ITEMS = [
  createData('India', 'IN', 1324171354, 3287263, 2500, 13241713541643, new Date(2000, 1, 1)),
  createData('China', 'CN', 1403500365, 9596961, 1500, 1403500365, new Date(2000, 3, 3)),
  createData('Italy', 'IT', 60483973, 301340, 1700, 60483973163, new Date(2000, 5, 5)),
  createData('United States', 'US', 327167434, 9833520, 2000, 3271674341, new Date(2000, 7, 7)),
  createData('Canada', 'CA', 37602103, 9984670, 2500, 376021031643, new Date(2000, 9, 9)),
  createData('Australia', 'AU', 25475400, 7692024, 3000, 254754006134, new Date(2000, 11, 11)),
  createData('Germany', 'DE', 83019200, 357578, 1700, 830192003, new Date(2000, 2, 15)),
  createData('Ireland', 'IE', 4857000, 70273, 2500, 485700054641, new Date(2000, 4, 15)),
  createData('Mexico', 'MX', 126577691, 1972550, 500, 126577691315, new Date(2000, 5, 15)),
  createData('Japan', 'JP', 126317000, 377973, 1200, 126317000125, new Date(2000, 3, 15)),
  createData('France', 'FR', 67022000, 640679, 3000, 67022000215, new Date(2000, 12, 15)),
  createData('United Kingdom', 'GB', 67545757, 242495, 1000, 67545757124, new Date(2000, 10, 10)),
  createData('Russia', 'RU', 146793744, 17098246, 2900, 146793744421, new Date(2000, 8, 8)),
  createData('Nigeria', 'NG', 200962417, 923768, 2750, 200962, new Date(2000, 6, 6)),
  createData('Brazil', 'BR', 210147125, 8515767, 1970, 210147125521, new Date(2000, 4, 4)),
  createData('Without Value', 'BR', 210147125, 8515767, 1890, 21014712, new Date(2000, 2, 2)),
]

const meta: Meta<typeof Table> = {
  component: Table,
  title: 'Components/Views/Table',
  tags: ['autodocs'],
  argTypes: {
    className: field.string(),
  },
}

export default meta

type Story = StoryObj<React.FC<TableProps<Item>>>

export const Demo: Story = {
  parameters: params('Table'),
  args: {
    columns: COLUMNS,
    items: ITEMS,
    width: 760,
    height: 500,
    pagination: true,
    loading: false,
    actions: [
      { start: 'add', content: 'Add' },
      { start: 'delete', content: 'Delete' },
    ],
    keygen: (item, index) => `${item.name}-${item.code}-${index}`,
  },
}
