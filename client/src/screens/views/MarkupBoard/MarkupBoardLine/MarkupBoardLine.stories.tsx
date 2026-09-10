import { Meta, StoryObj, field, params } from 'storybook'
import MarkupBoardLine from './MarkupBoardLine.component'

const meta: Meta<typeof MarkupBoardLine> = {
  component: MarkupBoardLine,
  title: 'Components/MarkupBoardLine',
  tags: ['autodocs'],
  argTypes: {
    className: field.string(),
    children: field.reactNode(),
  },
}

export default meta

type Story = StoryObj<typeof MarkupBoardLine>

export const Demo: Story = {
  parameters: params('MarkupBoardLine'),
  args: {
    name: 'Demo',
  },
}
