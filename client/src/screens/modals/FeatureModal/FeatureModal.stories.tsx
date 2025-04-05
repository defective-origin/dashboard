/* eslint-disable no-restricted-imports */
import { field, params } from '../../../../.storybook/tool'
import type { Meta, StoryObj } from '@storybook/react'
import FeatureModal, { FeatureModalProps } from './FeatureModal.component'

const meta: Meta<typeof FeatureModal> = {
  component: FeatureModal,
  title: 'Screens/Forms/FeatureModal',
  tags: ['autodocs'],
  argTypes: {
    name: field.string(),
    className: field.string(),
    children: field.reactNode(),
  },
}

export default meta

type Story = StoryObj<typeof FeatureModal>

export const Demo: Story = {
  parameters: params('FeatureModal'),
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
    },
  },
}
