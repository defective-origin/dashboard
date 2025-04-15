/* eslint-disable no-restricted-imports */
import { field, params } from '../../../../.storybook/tools'
import type { Meta, StoryObj } from '@storybook/react'
import { COLORS, SIZES } from 'theme'
import MarkupsView, { MarkupsViewProps } from './MarkupsView.component'

const VARIANTS: MarkupsViewProps['v'][] = ['success', 'info', 'warning', 'error']

const meta: Meta<typeof MarkupsView> = {
  component: MarkupsView,
  title: 'Components/MarkupsView',
  tags: ['autodocs'],
  argTypes: {
    name: field.string(),
    className: field.string(),
    children: field.reactNode(),
  },
}

export default meta

type Story = StoryObj<typeof MarkupsView>

export const Demo: Story = {
  parameters: params('MarkupsView'),
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
