/* eslint-disable no-restricted-imports */
import { field, params } from '../../../../.storybook/tools'
import type { Meta, StoryObj } from '@storybook/react'
import { COLORS, SIZES } from 'theme'
import MarkupBoard, { MarkupBoardProps } from './MarkupBoard.component'

const VARIANTS: MarkupBoardProps['v'][] = ['success', 'info', 'warning', 'error']

const meta: Meta<typeof MarkupBoard> = {
  component: MarkupBoard,
  title: 'Components/MarkupBoard',
  tags: ['autodocs'],
  argTypes: {
    name: field.string(),
    className: field.string(),
    children: field.reactNode(),
  },
}

export default meta

type Story = StoryObj<typeof MarkupBoard>

export const Demo: Story = {
  parameters: params('MarkupBoard'),
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
