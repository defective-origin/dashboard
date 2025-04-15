/* eslint-disable no-restricted-imports */
import { field, params } from '../../../../.storybook/tools'
import type { Meta, StoryObj } from '@storybook/react'
import { COLORS, SIZES } from 'theme'
import ReviewsModal, { ReviewsModalProps } from './ReviewsModal.component'

const VARIANTS: ReviewsModalProps['position'][] = ['success', 'info', 'warning', 'error']

const meta: Meta<typeof ReviewsModal> = {
  component: ReviewsModal,
  title: 'Components/ReviewsModal',
  tags: ['autodocs'],
  argTypes: {
    name: field.string(),
    className: field.string(),
    children: field.reactNode(),
  },
}

export default meta

type Story = StoryObj<typeof ReviewsModal>

export const Demo: Story = {
  parameters: params('ReviewsModal'),
  args: {
    name: 'Demo',
  },
}

export const Variants: Story = {
  parameters: params('View', VARIANTS),
  args: {
    name: 'Demo',
    v: 'success',
  },
}
