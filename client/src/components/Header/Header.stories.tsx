// eslint-disable-next-line no-restricted-imports
import { field, params } from '../../../.storybook/tool'
import type { Meta, StoryObj } from '@storybook/react'
import Header from './Header.component'

const meta: Meta<typeof Header> = {
  component: Header,
  title: 'Components/LAYOUT/MAGNETS/Header',
  tags: ['autodocs'],
  argTypes: {
    className: field.string(),
    children: field.reactNode(),
  },
}

export default meta

type Story = StoryObj<typeof Header>

export const Demo: Story = {
  parameters: params('Header'),
  args: {
    className: '',
    children: 'Demo',
  },
}
