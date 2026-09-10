import { Meta, StoryObj, field, params } from 'storybook'
import Copyright from './Copyright.component'

const meta: Meta<typeof Copyright> = {
  title: 'Screens/Copyright',
  component: Copyright,
  tags: ['autodocs'],
  argTypes: {
    className: field.string(),
  },
}

export default meta

type Story = StoryObj<typeof Copyright>

export const Demo: Story = {
  parameters: params('Copyright'),
}
