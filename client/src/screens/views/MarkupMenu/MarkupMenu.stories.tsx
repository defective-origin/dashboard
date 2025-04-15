/* eslint-disable no-restricted-imports */
import { field, params } from '../../../../.storybook/tools'
import type { Meta, StoryObj } from '@storybook/react'
import { COLORS, SIZES } from 'theme'
import MarkupMenu, { MarkupMenuProps } from './MarkupMenu.component'

const VARIANTS: MarkupMenuProps['v'][] = ['success', 'info', 'warning', 'error']

const meta: Meta<typeof MarkupMenu> = {
  component: MarkupMenu,
  title: 'Components/MarkupMenu',
  tags: ['autodocs'],
  argTypes: {
    name: field.string(),
    className: field.string(),
    children: field.reactNode(),
  },
}

export default meta

type Story = StoryObj<typeof MarkupMenu>

export const Demo: Story = {
  parameters: params('MarkupMenu'),
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
