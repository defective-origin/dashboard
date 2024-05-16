/* eslint-disable no-restricted-imports */
import { field, params } from '../../../.storybook/tool'
import type { Meta, StoryObj } from '@storybook/react'
import DashboardPreviewCard from './DashboardPreviewCard.component'

const meta: Meta<typeof DashboardPreviewCard> = {
  component: DashboardPreviewCard,
  title: 'Screens/CARDS/DashboardPreviewCard',
  tags: ['autodocs'],
  argTypes: {
    className: field.string(),
    children: field.reactNode(),
    options: field.object('Board'),
  },
}

export default meta

type Story = StoryObj<typeof DashboardPreviewCard>

export const Demo: Story = {
  parameters: params('DashboardPreviewCard'),
  args: {
    options: {
      id: 1,
      name: 'Dashboard',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      rows: 10,
      columns: 20,
      widgets: [
        { id: 1, name: 'WIDGET NAME', place: { v1: { x: 0, y: 0 }, v2: { x: 3, y: 3 } } },
        { id: 2, name: 'WIDGET NAME', place: { v1: { x: 0, y: 4 }, v2: { x: 1, y: 5 } } },
        { id: 3, name: 'WIDGET NAME', place: { v1: { x: 1, y: 4 }, v2: { x: 2, y: 5 } } },
        { id: 4, name: 'WIDGET NAME', place: { v1: { x: 2, y: 4 }, v2: { x: 3, y: 5 } } },
      ],
    },
  },
}
