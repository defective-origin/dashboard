import { Meta, StoryObj, field, params } from 'storybook'
import Clipboard from './Clipboard.component'

const meta: Meta<typeof Clipboard> = {
  component: Clipboard,
  title: 'Components/Actions/Clipboard',
  tags: ['autodocs'],
  argTypes: {
    className: field.string(),
    children: field.reactNode(),
  },
}

export default meta

type Story = StoryObj<typeof Clipboard>

export const Demo: Story = {
  parameters: params('Clipboard'),
  args: {
    content: 123456789,
  },
}
