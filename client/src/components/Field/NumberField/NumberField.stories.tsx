/* eslint-disable no-restricted-imports */
import { params } from '../../../../.storybook/tool'
import type { Meta, StoryObj } from '@storybook/react'
import NumberField from './NumberField.component'

const meta: Meta<typeof NumberField> = {
  title: 'Components/FORM/NumberField',
  component: NumberField,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof NumberField>

export const Demo: Story = {
  parameters: params('NumberField'),
  args: {
    messages: [{ content: 'message', color: 'info' }],
    errors: ['error'],
    label: 'Label',
    value: 123456.789,
  },
}
