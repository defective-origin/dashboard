/* eslint-disable no-restricted-imports */
import { params } from '../../../../.storybook/tool'
import type { Meta, StoryObj } from '@storybook/react'
import TextField from './TextField.component'

const meta: Meta<typeof TextField> = {
  title: 'Components/FORM/TextField',
  component: TextField,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof TextField>

export const Demo: Story = {
  parameters: params('TextField'),
  args: {
    messages: [{ content: 'message', color: 'info' }],
    errors: ['error'],
    label: 'Label',
    value: 'Some value',
    multiline: true,
  },
}
