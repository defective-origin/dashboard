/* eslint-disable no-restricted-imports */
import { field, params } from '../../../../.storybook/tool'
import type { Meta, StoryObj } from '@storybook/react'
import FeatureModalForm, { FeatureModalFormProps } from './FeatureModalForm.component'

const meta: Meta<typeof FeatureModalForm> = {
  component: FeatureModalForm,
  title: 'Screens/Forms/FeatureModalForm',
  tags: ['autodocs'],
  argTypes: {
    name: field.string(),
    className: field.string(),
    children: field.reactNode(),
  },
}

export default meta

type Story = StoryObj<typeof FeatureModalForm>

export const Demo: Story = {
  parameters: params('FeatureModalForm'),
  args: {
    open: true,
    options: {
      id: '0000000-0000000-0000000',
      name: 'WIDGET NAME',
      price: 12.36,
      rate: 3.7,
      content: 'WIDGET DESCRIPTION',
      access: 'PRIVATE',
      tags: ['tag 1', 'tag 2'],
    },
  },
}
