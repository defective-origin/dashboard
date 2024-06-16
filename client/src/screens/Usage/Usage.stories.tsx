/* eslint-disable no-restricted-imports */
import { field, params } from '../../../.storybook/tool'
import type { Meta, StoryObj } from '@storybook/react'
import Usage, { UsageProps } from './Usage.component'

const meta: Meta<typeof Usage> = {
  component: Usage,
  title: 'Screens/Views/Usage',
  tags: ['autodocs'],
  argTypes: {
    className: field.string(),
    children: field.reactNode(),
  },
}

export default meta

type Story = StoryObj<typeof Usage>

export const Demo: Story = {
  parameters: params('Usage'),
  args: {
    id: 1234567890,
    v: 'dashboard',
  },
}
