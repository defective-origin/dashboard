/* eslint-disable no-restricted-imports */
import { params } from '../../../../.storybook/tool'
import type { Meta, StoryObj } from '@storybook/react'
import SelectField from './SelectField.component'

const meta: Meta<typeof SelectField> = {
  title: 'Components/Forms/SelectField',
  component: SelectField,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof SelectField>

export const Demo: Story = {
  parameters: params('SelectField'),
  args: {
    disabled: false,
    required: false,
    label: 'Label',
    init: 'value0',
    help: 'help text',
    items: [
      { value: 'value0', children: 'FIRST' },
      { value: 'value1', children: 'SECOND' },
      { value: 'value2', children: 'THIRD' },
    ],
  },
}
