import { Meta, StoryObj, field, params } from 'storybook'
import ExpensesTable from './ExpensesTable.component'

const meta: Meta<typeof ExpensesTable> = {
  component: ExpensesTable,
  title: 'Components/ExpensesTable',
  tags: ['autodocs'],
  argTypes: {
    className: field.string(),
    children: field.reactNode(),
  },
}

export default meta

type Story = StoryObj<typeof ExpensesTable>

export const Demo: Story = {
  parameters: params('ExpensesTable'),
  args: {
    name: 'Demo',
  },
}
