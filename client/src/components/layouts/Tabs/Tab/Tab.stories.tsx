import { Meta, StoryObj, field, params } from 'storybook'
import Tab from './Tab.component'

const meta: Meta<typeof Tab> = {
  component: Tab,
  title: 'Components/Tab',
  tags: ['autodocs'],
  argTypes: {
    className: field.string(),
    children: field.reactNode(),
  },
}

export default meta

type Story = StoryObj<typeof Tab>

export const Demo: Story = {
  parameters: params('Tab'),
  args: {
    name: 'Demo',
  },
}
