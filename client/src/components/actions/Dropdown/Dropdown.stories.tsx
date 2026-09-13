import { Meta, StoryObj, field, params } from 'storybook'
import Dropdown from './Dropdown.component'


const meta: Meta<typeof Dropdown> = {
  component: Dropdown,
  title: 'Components/Actions/Dropdown',
  tags: ['autodocs'],
  argTypes: {
    className: field.string(),
    tooltip: field.reactNode(),
    children: field.reactNode(),
    content: field.reactNode(),
  },
}

export default meta

type Story = StoryObj<typeof Dropdown>

export const Demo: Story = {
  parameters: params('Dropdown'),
  args: {
    className: 'Demo',
    tooltip: 'tooltip',
    content: 'button name',
    children: 'dropdown content',
  },
}
