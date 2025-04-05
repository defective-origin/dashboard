/* eslint-disable no-restricted-imports */
import { field, params } from '../../../../.storybook/tool'
import type { Meta, StoryObj } from '@storybook/react'
import WidgetViewModal, { WidgetViewModalProps } from './WidgetViewModal.component'

const meta: Meta<typeof WidgetViewModal> = {
  component: WidgetViewModal,
  title: 'Screens/Forms/WidgetViewModal',
  tags: ['autodocs'],
  argTypes: {
    name: field.string(),
    className: field.string(),
    children: field.reactNode(),
  },
}

export default meta

type Story = StoryObj<typeof WidgetViewModal>

export const Demo: Story = {
  parameters: params('WidgetViewModal'),
  args: {
    open: true,
    payload: {
      id: '0000000-0000000-0000000',
      name: 'WIDGET NAME',
      price: 12.36,
      rate: 3.7,
      content: 'WIDGET DESCRIPTION',
      public: true,
      tags: ['tag 1', 'tag 2'],
      options: {},
      reviews: [],
      releases: [],
    },
  },
}
