import { Meta, StoryObj, field, params } from 'storybook'
import Reviews from './Reviews.component'

const meta: Meta<typeof Reviews> = {
  component: Reviews,
  title: 'Screens/Views/Reviews',
  tags: ['autodocs'],
  argTypes: {
    className: field.string(),
    children: field.reactNode(),
  },
}

export default meta

type Story = StoryObj<typeof Reviews>

export const Demo: Story = {
  parameters: params('Reviews'),
  args: {
    name: 'Demo',
  },
}
