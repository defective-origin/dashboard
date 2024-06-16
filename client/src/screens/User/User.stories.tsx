/* eslint-disable no-restricted-imports */
import { field, params } from '../../../.storybook/tool'
import type { Meta, StoryObj } from '@storybook/react'
import User, { UserProps } from './User.component'

const meta: Meta<typeof User> = {
  component: User,
  title: 'Screens/Views/User',
  tags: ['autodocs'],
  argTypes: {
    id: field.number(),
    className: field.string(),
    children: field.reactNode(),
  },
}

export default meta

type Story = StoryObj<typeof User>

export const Demo: Story = {
  parameters: params('User'),
  args: {
    id: 1,
  },
}
