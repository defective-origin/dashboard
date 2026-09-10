import { Meta, StoryObj, field, params } from 'storybook'
import WidgetTable from './WidgetTable.component'

const meta: Meta<typeof WidgetTable> = {
  component: WidgetTable,
  title: 'Screens/Tables/WidgetTable',
  tags: ['autodocs'],
  argTypes: {
    className: field.string(),
    children: field.reactNode(),
  },
}

export default meta

type Story = StoryObj<typeof WidgetTable>

export const Demo: Story = {
  parameters: params('WidgetTable'),
  args: {
    width: 760,
    height: 500,
  },
}
