import { Meta, StoryObj, field, params } from 'storybook'
import User from './User.component'

const meta: Meta<typeof User> = {
  component: User,
  title: 'Screens/Views/User',
  tags: ['autodocs'],
  argTypes: {
    id: field.string(),
    className: field.string(),
    children: field.reactNode(),
  },
}

export default meta

type Story = StoryObj<typeof User>

export const Demo: Story = {
  parameters: params('User'),
  args: {
    id: '1',
  },
}
