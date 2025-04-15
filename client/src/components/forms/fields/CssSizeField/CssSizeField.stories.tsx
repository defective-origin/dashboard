/* eslint-disable no-restricted-imports */
import { field, params } from '../../../../../.storybook/tools'
import type { Meta, StoryObj } from '@storybook/react'
import CssSizeField from './CssSizeField.component'

const meta: Meta<typeof CssSizeField> = {
  title: 'Components/Forms/CssSizeField',
  component: CssSizeField,
  tags: ['autodocs'],
  argTypes: {
    className: field.string(),
    required: field.boolean(),
    disabled: field.boolean(),
  },
}

export default meta

type Story = StoryObj<typeof CssSizeField>

export const Demo: Story = {
  parameters: params('CssSizeField'),
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
