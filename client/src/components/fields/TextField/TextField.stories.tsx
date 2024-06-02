/* eslint-disable no-restricted-imports */
import { field, params } from '../../../../.storybook/tool'
import type { Meta, StoryObj } from '@storybook/react'
import TextField from './TextField.component'

const meta: Meta<typeof TextField> = {
  title: 'Components/FORM/TextField',
  component: TextField,
  tags: ['autodocs'],
  argTypes: {
    className: field.string(),
    required: field.boolean(),
    disabled: field.boolean(),
  },
}

export default meta

type Story = StoryObj<typeof TextField>

export const Demo: Story = {
  parameters: params('TextField'),
  args: {
    label: 'Label',
    value: 'Some value',
    multiline: false,
    required: false,
    disabled: false,
    message: 'help text',
  },
}
