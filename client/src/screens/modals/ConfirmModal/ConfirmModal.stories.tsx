/* eslint-disable no-restricted-imports */
import { field, params } from '../../../../.storybook/tools'
import type { Meta, StoryObj } from '@storybook/react'
import { COLORS, SIZES } from 'theme'
import ConfirmModal, { ConfirmModalProps } from './ConfirmModal.component'

const VARIANTS: ConfirmModalProps['position'][] = ['success', 'info', 'warning', 'error']

const meta: Meta<typeof ConfirmModal> = {
  component: ConfirmModal,
  title: 'Components/ConfirmModal',
  tags: ['autodocs'],
  argTypes: {
    name: field.string(),
    className: field.string(),
    children: field.reactNode(),
  },
}

export default meta

type Story = StoryObj<typeof ConfirmModal>

export const Demo: Story = {
  parameters: params('ConfirmModal'),
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
