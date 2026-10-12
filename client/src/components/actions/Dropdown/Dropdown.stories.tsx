import { Meta, StoryObj, field, params } from 'storybook'
import Dropdown from './Dropdown.component'


const meta: Meta<typeof Dropdown> = {
  component: Dropdown,
  title: 'Components/Actions/Dropdown',
  tags: ['autodocs'],
  argTypes: {
    title: field.reactNode(),
    content: field.reactNode(),
    tooltip: field.reactNode(),
    trigger: field.func(),
    className: field.string(),
    children: field.reactNode(),
  },
}

export default meta

type Story = StoryObj<typeof Dropdown>

export const Demo: Story = {
  parameters: params('Dropdown'),
  args: {
    arrow: true,
    tooltip: 'tooltip',
    title: 'Title',
    content: 'button name',
    children: 'dropdown content',
    className: 'Demo',
  },
}
