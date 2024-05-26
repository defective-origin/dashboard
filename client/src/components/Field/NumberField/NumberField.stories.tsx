/* eslint-disable no-restricted-imports */
import { field, params } from '../../../../.storybook/tool'
import type { Meta, StoryObj } from '@storybook/react'
import NumberField from './NumberField.component'

const meta: Meta<typeof NumberField> = {
  title: 'Components/FORM/NumberField',
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
    value: 123456.789,
    required: false,
    disabled: false,
    message: 'help text',
  },

}
