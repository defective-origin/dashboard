/* eslint-disable no-restricted-imports */
import { field, params } from '../../../../../.storybook/tools'
import type { Meta, StoryObj } from '@storybook/react'
import SearchField from './SearchField.component'

const meta: Meta<typeof SearchField> = {
  title: 'Components/Forms/SearchField',
  component: SearchField,
  tags: ['autodocs'],
  argTypes: {
    className: field.string(),
    required: field.boolean(),
    disabled: field.boolean(),
  },
}

export default meta

type Story = StoryObj<typeof SearchField>

export const Demo: Story = {
  parameters: params('SearchField'),
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
      value => value.length > 5 && 'TEXT CANNOT BE MORE THEN 5 CHARS',
    ],
  },
}
