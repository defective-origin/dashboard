/* eslint-disable no-restricted-imports */
import { field, params } from '../../../../.storybook/tool'
import type { Meta, StoryObj } from '@storybook/react'
import WidgetTable, { WidgetTableProps } from './WidgetTable.component'

const meta: Meta<typeof WidgetTable> = {
  component: WidgetTable,
  title: 'Screens/TABLES/WidgetTable',
  tags: ['autodocs'],
  argTypes: {
    className: field.string(),
    children: field.reactNode(),
  },
}

export default meta

type Story = StoryObj<typeof WidgetTable>

export const Demo: Story = {
  parameters: params('WidgetTable'),
  args: {
    width: 760,
    height: 500,
  },
}
