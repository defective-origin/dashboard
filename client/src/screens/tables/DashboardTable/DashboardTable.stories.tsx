import { Meta, StoryObj, field, params } from 'storybook'
import DashboardTable from './DashboardTable.component'

const meta: Meta<typeof DashboardTable> = {
  component: DashboardTable,
  title: 'Screens/Tables/DashboardTable',
  tags: ['autodocs'],
  argTypes: {
    className: field.string(),
    children: field.reactNode(),
  },
}

export default meta

type Story = StoryObj<typeof DashboardTable>

export const Demo: Story = {
  parameters: params('DashboardTable'),
  args: {
    width: 760,
    height: 500,
  },
}
