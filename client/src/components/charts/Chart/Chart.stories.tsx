/* eslint-disable no-restricted-imports */
import { field, params } from '../../../../.storybook/tools'
import type { Meta, StoryObj } from '@storybook/react'
import Chart, { ChartProps } from './Chart.component'
import { ComposedChart } from 'recharts'


const meta: Meta<typeof Chart> = {
  component: Chart,
  title: 'Components/Charts/Chart',
  tags: ['autodocs'],
  argTypes: {
    className: field.string(),
    children: field.reactNode(),
  },
}

export default meta

type Story = StoryObj<typeof Chart>

export const Demo: Story = {
  parameters: params('Chart'),
  args: {
    legend: true,
    tooltip: true,
    loading: false,
    width: 300,
    height: 300,
    items: [],
    formats: {
      legend: 'capitalize',
      tooltip: 'number',
    },
    context: ComposedChart,
  },
}
