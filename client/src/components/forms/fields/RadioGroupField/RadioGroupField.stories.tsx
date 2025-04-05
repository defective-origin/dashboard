/* eslint-disable no-restricted-imports */
import { field, params } from '../../../../../.storybook/tool'
import type { Meta, StoryObj } from '@storybook/react'
import { COLORS, SIZES } from 'theme'
import RadioGroupField, { RadioGroupFieldProps } from './RadioGroupField.component'

const meta: Meta<typeof RadioGroupField> = {
  component: RadioGroupField,
  title: 'Components/Forms/RadioGroupField',
  tags: ['autodocs'],
  argTypes: {
    items: field.list('RadioFieldProps'),
    columns: field.number(),
  },
}

export default meta

type Story = StoryObj<typeof RadioGroupField>

export const Demo: Story = {
  parameters: params('RadioGroupField'),
  args: {
    label: 'Radio Group',
    columns: 2,
    init: 'b',
    items: [
      { label: 'a', value: 'a' },
      { label: 'b', value: 'b' },
      { label: 'c', value: 'c' },
      { label: 'd', value: 'd' },
    ],
  },
}
