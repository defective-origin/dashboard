/* eslint-disable no-restricted-imports */
import { field, params } from '../../../../.storybook/tool'
import type { Meta, StoryObj } from '@storybook/react'
import RadarChart, { RadarChartProps } from './RadarChart.component'

const ITEMS = [
  {
    subject: 'Math',
    A: 120_000,
    B: 110_000,
    fullMark: 150,
  },
  {
    subject: 'Chinese',
    A: 98_000,
    B: 130_000,
    fullMark: 150,
  },
  {
    subject: 'English',
    A: 86_000,
    B: 130_000,
    fullMark: 150,
  },
  {
    subject: 'Geography',
    A: 99_000,
    B: 100_000,
    fullMark: 150,
  },
  {
    subject: 'Physics',
    A: 85_000,
    B: 90_000,
    fullMark: 150,
  },
  {
    subject: 'History',
    A: 65_000,
    B: 85_000,
    fullMark: 150,
  },
]

const meta: Meta<typeof RadarChart> = {
  component: RadarChart,
  title: 'Components/Charts/RadarChart',
  tags: ['autodocs'],
  argTypes: {
    className: field.string(),
    children: field.reactNode(),
  },
}

export default meta

type Story = StoryObj<typeof RadarChart>

export const Demo: Story = {
  parameters: params('RadarChart'),
  args: {
    radius: true,
    angle: { dataKey: 'subject', format: 'number' },
    grid: true,
    legend: true,
    tooltip: true,
    loading: false,
    width: 500,
    height: 300,
    formats: {
      radius: 'number',
      angle: 'uppercase',
      legend: 'uppercase',
      tooltip: 'number',
    },
    options: {
      A: 'radar',
      B: 'radar',
    },
    items: ITEMS,
  },
}
