/* eslint-disable no-restricted-imports */
import { params } from '../../../../../.storybook/tool'
import type { Meta, StoryObj } from '@storybook/react'
import CheckboxField from './CheckboxField.component'

const meta: Meta<typeof CheckboxField> = {
  title: 'Components/Forms/CheckboxField',
  component: CheckboxField,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof CheckboxField>

export const Demo: Story = {
  parameters: params('CheckboxField'),
  args: {
    label: 'Label',
    init: true,
    help: 'help text',
  },
}
