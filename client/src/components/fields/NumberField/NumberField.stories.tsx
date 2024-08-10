/* eslint-disable no-restricted-imports */
import { field, params } from '../../../../.storybook/tool'
import type { Meta, StoryObj } from '@storybook/react'
import NumberField from './NumberField.component'

const meta: Meta<typeof NumberField> = {
  title: 'Components/Forms/NumberField',
  component: NumberField,
  tags: ['autodocs'],
  argTypes: {
    className: field.string(),
    required: field.boolean(),
    disabled: field.boolean(),
  },
}

export default meta

type Story = StoryObj<typeof NumberField>

export const Demo: Story = {
  parameters: params('NumberField'),
  args: {
    label: 'Label',
    init: 123456.789,
    help: 'help text',
    required: false,
    disabled: false,
    checkOnBlur: true,
    checkOnChange: true,
    rules: [
      (value) => value > 50 && 'NUMBER CANNOT BE MORE THEN 5',
    ],
  },

}
