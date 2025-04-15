/* eslint-disable no-restricted-imports */
import { field, params } from '../../../../.storybook/tools'
import type { Meta, StoryObj } from '@storybook/react'
import { COLORS, SIZES } from 'theme'
import MarkupBoardLine, { MarkupBoardLineProps } from './MarkupBoardLine.component'

const VARIANTS: MarkupBoardLineProps['v'][] = ['success', 'info', 'warning', 'error']

const meta: Meta<typeof MarkupBoardLine> = {
  component: MarkupBoardLine,
  title: 'Components/MarkupBoardLine',
  tags: ['autodocs'],
  argTypes: {
    name: field.string(),
    className: field.string(),
    children: field.reactNode(),
  },
}

export default meta

type Story = StoryObj<typeof MarkupBoardLine>

export const Demo: Story = {
  parameters: params('MarkupBoardLine'),
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
