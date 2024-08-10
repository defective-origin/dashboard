/* eslint-disable no-restricted-imports */
import { params } from '../../../../.storybook/tool'
import type { Meta, StoryObj } from '@storybook/react'
import SwitchField from './SwitchField.component'

const meta: Meta<typeof SwitchField> = {
  title: 'Components/Forms/SwitchField',
  component: SwitchField,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof SwitchField>

export const Demo: Story = {
  parameters: params('SwitchField'),
  args: {
    label: 'Label',
    init: true,
    help: 'help text',
  },
}
