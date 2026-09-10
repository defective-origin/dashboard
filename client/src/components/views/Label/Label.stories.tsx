import { Meta, StoryObj, field, params } from 'storybook'
import Label from './Label.component'

const meta: Meta<typeof Label> = {
  component: Label,
  title: 'Components/Views/Label',
  tags: ['autodocs'],
  argTypes: {
    icon: field.string(),
    className: field.string(),
    children: field.reactNode(),
  },
}

export default meta

type Story = StoryObj<typeof Label>

export const Demo: Story = {
  parameters: params('Label'),
  args: {
    icon: 'payments',
    content: 123.456,
    format: 'currency',
    tooltip: 'Payment',
  },
}
