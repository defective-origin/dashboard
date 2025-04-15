/* eslint-disable no-restricted-imports */
import { field, params } from '../../../../.storybook/tools'
import type { Meta, StoryObj } from '@storybook/react'
import SupportTable, { SupportTableProps } from './SupportTable.component'

const meta: Meta<typeof SupportTable> = {
  component: SupportTable,
  title: 'Screens/Tables/SupportTable',
  tags: ['autodocs'],
  argTypes: {
    className: field.string(),
    children: field.reactNode(),
  },
}

export default meta

type Story = StoryObj<typeof SupportTable>

export const Demo: Story = {
  parameters: params('SupportTable'),
  args: {
    width: 760,
    height: 500,
  },
}
