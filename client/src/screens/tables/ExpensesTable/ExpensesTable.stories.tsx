/* eslint-disable no-restricted-imports */
import { field, params } from '../../../../.storybook/tools'
import type { Meta, StoryObj } from '@storybook/react'
import { COLORS, SIZES } from 'theme'
import ExpensesTable, { ExpensesTableProps } from './ExpensesTable.component'

const VARIANTS: ExpensesTableProps['v'][] = ['success', 'info', 'warning', 'error']

const meta: Meta<typeof ExpensesTable> = {
  component: ExpensesTable,
  title: 'Components/ExpensesTable',
  tags: ['autodocs'],
  argTypes: {
    name: field.string(),
    className: field.string(),
    children: field.reactNode(),
  },
}

export default meta

type Story = StoryObj<typeof ExpensesTable>

export const Demo: Story = {
  parameters: params('ExpensesTable'),
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
