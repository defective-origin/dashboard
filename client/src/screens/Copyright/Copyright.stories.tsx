// eslint-disable-next-line no-restricted-imports
import { field, params } from '../../../.storybook/tool'
import type { Meta, StoryObj } from '@storybook/react'
import Copyright from './Copyright.component'

const meta: Meta<typeof Copyright> = {
  title: 'Screens/Copyright',
  component: Copyright,
  tags: ['autodocs'],
  argTypes: {
    className: field.string(),
  },
}

export default meta

type Story = StoryObj<typeof Copyright>

export const Demo: Story = {
  parameters: params('Copyright'),
}
