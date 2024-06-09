/* eslint-disable no-restricted-imports */
import { field, params } from '../../../../.storybook/tool'
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
      id: 0,
      name: 'Dashboard',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      author: 0,
      access: 'PRIVATE',
      devices: {
        computer: {
          rows: 10,
          columns: 20,
          active: true,
          widgets: [
            {
              id: 0,
              for: 0,
              name: 'WIDGET NAME',
              description: 'WIDGET DESCRIPTION',
              key: 'KEY.IDENTIFIER',
              endpoint: 'endpoint.com/widget',
              author: 0,
              version: '0.0.0',
              access: 'PRIVATE',
              place: { v1: { x: 0, y: 0 }, v2: { x: 0, y: 0 } },
            },
          ],
        },
      },
    },
  },
}
