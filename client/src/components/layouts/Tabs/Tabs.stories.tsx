import { Meta, StoryObj, field, params } from 'storybook'
import Tabs from './Tabs.component'

const meta: Meta<typeof Tabs> = {
  component: Tabs,
  title: 'Components/Tabs',
  tags: ['autodocs'],
  argTypes: {
    className: field.string(),
    children: field.reactNode(),
  },
}

export default meta

type Story = StoryObj<typeof Tabs>

export const Demo: Story = {
  parameters: params('Tabs'),
  args: {
    name: 'Demo',
  },
}
