import { Meta, StoryObj, field, params } from 'storybook'
import MarkupsView from './MarkupsView.component'

const meta: Meta<typeof MarkupsView> = {
  component: MarkupsView,
  title: 'Components/MarkupsView',
  tags: ['autodocs'],
  argTypes: {
    className: field.string(),
    children: field.reactNode(),
  },
}

export default meta

type Story = StoryObj<typeof MarkupsView>

export const Demo: Story = {
  parameters: params('MarkupsView'),
  args: {
    name: 'Demo',
  },
}
