import { Meta, StoryObj, field, params } from 'storybook'
import TabContent from './TabContent.component'

const meta: Meta<typeof TabContent> = {
  component: TabContent,
  title: 'Components/TabContent',
  tags: ['autodocs'],
  argTypes: {
    className: field.string(),
    children: field.reactNode(),
  },
}

export default meta

type Story = StoryObj<typeof TabContent>

export const Demo: Story = {
  parameters: params('TabContent'),
  args: {
    name: 'Demo',
  },
}
