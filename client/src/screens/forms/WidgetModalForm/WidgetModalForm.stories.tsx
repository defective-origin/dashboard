/* eslint-disable no-restricted-imports */
import { field, params } from '../../../../.storybook/tool'
import type { Meta, StoryObj } from '@storybook/react'
import WidgetModalForm, { WidgetModalFormProps } from './WidgetModalForm.component'

const meta: Meta<typeof WidgetModalForm> = {
  component: WidgetModalForm,
  title: 'Screens/FORMS/WidgetModalForm',
  tags: ['autodocs'],
  argTypes: {
    name: field.string(),
    className: field.string(),
    children: field.reactNode(),
  },
}

export default meta

type Story = StoryObj<typeof WidgetModalForm>

export const Demo: Story = {
  parameters: params('WidgetModalForm'),
  args: {
    open: true,
    payload: {
      id: 0,
      for: 0,
      name: 'WIDGET NAME',
      description: 'WIDGET DESCRIPTION',
      key: 'KEY.IDENTIFIER',
      endpoint: 'endpoint.com/widget',
      author: 0,
      version: '0.0.0',
      access: 'private',
      place: { v1: { x: 0, y: 0 }, v2: { x: 0, y: 0 } },
    },
  },
}
