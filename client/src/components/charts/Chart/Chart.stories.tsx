import { Meta, StoryObj, field, params } from 'storybook'
import { ComposedChart } from 'recharts'
import Chart from './Chart.component'


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
