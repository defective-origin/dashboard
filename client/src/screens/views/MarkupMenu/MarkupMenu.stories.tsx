import { Meta, StoryObj, field, params } from 'storybook'
import MarkupMenu from './MarkupMenu.component'

const meta: Meta<typeof MarkupMenu> = {
  component: MarkupMenu,
  title: 'Components/MarkupMenu',
  tags: ['autodocs'],
  argTypes: {
    className: field.string(),
    children: field.reactNode(),
  },
}

export default meta

type Story = StoryObj<typeof MarkupMenu>

export const Demo: Story = {
  parameters: params('MarkupMenu'),
  args: {
    name: 'Demo',
  },
}
