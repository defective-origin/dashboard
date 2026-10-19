import { Meta, StoryObj, field, params } from 'storybook'
import Button from 'components/actions/Button'
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
    disableHover: true,
    menu: false,
    children: (
      <>
        Content
        <Button content='Save' start='save' color='success' />
        <Button content='Close' start='close' color='primary' />
      </>
    ),
    actions: o => [
      <Button content='Save' start='save' color='success' />,
      <Button content='Close' start='close' color='primary' onClick={o.off} />,
    ],
    className: 'Demo',
  },
}
