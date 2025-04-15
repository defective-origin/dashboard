/* eslint-disable no-restricted-imports */
import { field, params } from '../../../../.storybook/tools'
import type { Meta, StoryObj } from '@storybook/react'
import { COLORS, SIZES } from 'theme'
import MarkupBoardAction, { MarkupBoardActionProps } from './MarkupBoardAction.component'

const VARIANTS: MarkupBoardActionProps['v'][] = ['success', 'info', 'warning', 'error']

const meta: Meta<typeof MarkupBoardAction> = {
  component: MarkupBoardAction,
  title: 'Components/MarkupBoardAction',
  tags: ['autodocs'],
  argTypes: {
    name: field.string(),
    className: field.string(),
    children: field.reactNode(),
  },
}

export default meta

type Story = StoryObj<typeof MarkupBoardAction>

export const Demo: Story = {
  parameters: params('MarkupBoardAction'),
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
