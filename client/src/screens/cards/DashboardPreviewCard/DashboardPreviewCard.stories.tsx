/* eslint-disable no-restricted-imports */
import { field, params } from '../../../../.storybook/tool'
import type { Meta, StoryObj } from '@storybook/react'
import DashboardPreviewCard from './DashboardPreviewCard.component'

const meta: Meta<typeof DashboardPreviewCard> = {
  component: DashboardPreviewCard,
  title: 'Screens/Cards/DashboardPreviewCard',
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
      id: 0,
      name: 'Dashboard',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      author: 0,
      access: 'PRIVATE',
      image: 'https://shorturl.at/xJu8i',
      devices: {
        computer: {
          rows: 10,
          columns: 20,
          active: true,
        },
      },
    },
  },
}
