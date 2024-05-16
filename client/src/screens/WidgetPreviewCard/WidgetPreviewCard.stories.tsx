/* eslint-disable no-restricted-imports */
import { field, params } from '../../../.storybook/tool'
import type { Meta, StoryObj } from '@storybook/react'
import WidgetPreviewCard from './WidgetPreviewCard.component'

const meta: Meta<typeof WidgetPreviewCard> = {
  component: WidgetPreviewCard,
  title: 'Screens/CARDS/WidgetPreviewCard',
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
    options: { id: 1, name: 'WIDGET NAME', place: { v1: { x: 0, y: 0 }, v2: { x: 3, y: 3 } } },
  },
}
