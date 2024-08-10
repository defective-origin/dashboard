/* eslint-disable no-restricted-imports */
import { field, params } from '../../../../.storybook/tool'
import type { Meta, StoryObj } from '@storybook/react'
import { COLORS, SIZES } from 'theme'
import CheckboxListField, { CheckboxListFieldProps } from './CheckboxListField.component'

const meta: Meta<typeof CheckboxListField> = {
  component: CheckboxListField,
  title: 'Components/Forms/CheckboxListField',
  tags: ['autodocs'],
  argTypes: {
    items: field.list('CheckboxFieldProps'),
    columns: field.number(),
  },
}

export default meta

type Story = StoryObj<typeof CheckboxListField>

export const Demo: Story = {
  parameters: params('CheckboxListField'),
  args: {
    label: 'Checkbox List',
    columns: 2,
    init: ['b'],
    items: [
      { label: 'a', value: 'a' },
      { label: 'b', value: 'b' },
      { label: 'c', value: 'c' },
      { label: 'd', value: 'd' },
    ],
  },
}

