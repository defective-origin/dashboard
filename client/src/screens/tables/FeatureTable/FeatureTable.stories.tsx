/* eslint-disable no-restricted-imports */
import { field, params } from '../../../../.storybook/tools'
import type { Meta, StoryObj } from '@storybook/react'
import FeatureTable from './FeatureTable.component'

const meta: Meta<typeof FeatureTable> = {
  component: FeatureTable,
  title: 'Screens/Tables/FeatureTable',
  tags: ['autodocs'],
  argTypes: {
    className: field.string(),
    children: field.reactNode(),
  },
}

export default meta

type Story = StoryObj<typeof FeatureTable>

export const Demo: Story = {
  parameters: params('FeatureTable'),
  args: {
    width: 760,
    height: 500,
  },
}
