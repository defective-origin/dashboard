import { Meta, StoryObj, field, params } from 'storybook'
import MarkupBoard from './MarkupBoard.component'

const meta: Meta<typeof MarkupBoard> = {
  component: MarkupBoard,
  title: 'Components/MarkupBoard',
  tags: ['autodocs'],
  argTypes: {
    className: field.string(),
    children: field.reactNode(),
  },
}

export default meta

type Story = StoryObj<typeof MarkupBoard>

export const Demo: Story = {
  parameters: params('MarkupBoard'),
  args: {
    name: 'Demo',
  },
}
