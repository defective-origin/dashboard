/* eslint-disable no-restricted-imports */
import { params } from '../../../../.storybook/tool'
import type { Meta, StoryObj } from '@storybook/react'
import SelectField from './SelectField.component'

const meta: Meta<typeof SelectField> = {
  title: 'Components/FORM/SelectField',
  component: SelectField,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof SelectField>

export const Demo: Story = {
  parameters: params('SelectField'),
  args: {
    messages: [{ content: 'message', color: 'info' }],
    errors: ['error'],
    label: 'Label',
    value: 'value0',
    items: [
      { value: 'value0', children: 'FIRST' },
      { value: 'value1', children: 'SECOND' },
      { value: 'value2', children: 'THIRD' },
    ],
  },
}
