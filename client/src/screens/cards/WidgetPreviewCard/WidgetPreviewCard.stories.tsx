/* eslint-disable no-restricted-imports */
import { field, params } from '../../../../.storybook/tool'
import type { Meta, StoryObj } from '@storybook/react'
import WidgetPreviewCard from './WidgetPreviewCard.component'

const meta: Meta<typeof WidgetPreviewCard> = {
  component: WidgetPreviewCard,
  title: 'Screens/Cards/WidgetPreviewCard',
  tags: ['autodocs'],
  argTypes: {
    className: field.string(),
    children: field.reactNode(),
    options: field.object('Widget'),
  },
}

export default meta

type Story = StoryObj<typeof WidgetPreviewCard>

export const Demo: Story = {
  parameters: params('WidgetPreviewCard'),
  args: {
    options: {
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
  },
}
