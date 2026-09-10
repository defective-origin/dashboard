import { Meta, StoryObj, field, params } from 'storybook'
import MarkupBoardAction from './MarkupBoardAction.component'

const meta: Meta<typeof MarkupBoardAction> = {
  component: MarkupBoardAction,
  title: 'Components/MarkupBoardAction',
  tags: ['autodocs'],
  argTypes: {
    className: field.string(),
    children: field.reactNode(),
  },
}

export default meta

type Story = StoryObj<typeof MarkupBoardAction>

export const Demo: Story = {
  parameters: params('MarkupBoardAction'),
  args: {
    name: 'Demo',
  },
}
