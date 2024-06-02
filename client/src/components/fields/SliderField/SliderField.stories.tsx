/* eslint-disable no-restricted-imports */
import { params } from '../../../../.storybook/tool'
import type { Meta, StoryObj } from '@storybook/react'
import SliderField from './SliderField.component'

const meta: Meta<typeof SliderField> = {
  title: 'Components/FORM/SliderField',
  component: SliderField,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof SliderField>

export const Demo: Story = {
  parameters: params('SliderField'),
  args: {
    messages: [{ content: 'message', color: 'info' }],
    errors: ['error'],
    label: 'Label',
    value: 123456.789,
  },
}
