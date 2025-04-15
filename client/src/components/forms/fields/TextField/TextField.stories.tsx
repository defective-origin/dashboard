/* eslint-disable no-restricted-imports */
import { field, params } from '../../../../../.storybook/tools'
import type { Meta, StoryObj } from '@storybook/react'
import TextField from './TextField.component'

const meta: Meta<typeof TextField> = {
  title: 'Components/Forms/TextField',
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
    init: 'Some value',
    help: 'help text',
    multiline: false,
    required: false,
    disabled: false,
    checkOnBlur: true,
    checkOnChange: true,
    rules: [
      (value) => value.length > 5 && 'TEXT CANNOT BE MORE THEN 5 CHARS',
    ],
  },
}
