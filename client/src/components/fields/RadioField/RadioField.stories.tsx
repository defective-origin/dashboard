/* eslint-disable no-restricted-imports */
import { params } from '../../../../.storybook/tool'
import type { Meta, StoryObj } from '@storybook/react'
import RadioField from './RadioField.component'

const meta: Meta<typeof RadioField> = {
  title: 'Components/Forms/RadioField',
  component: RadioField,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof RadioField>

export const Demo: Story = {
  parameters: params('RadioField'),
  args: {
    label: 'Label',
    init: true,
    help: 'help text',
  },
}
