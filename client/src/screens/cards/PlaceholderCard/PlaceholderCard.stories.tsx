// eslint-disable-next-line no-restricted-imports
import { field, params } from '../../../../.storybook/tool'
import type { Meta, StoryObj } from '@storybook/react'
import PlaceholderCard from './PlaceholderCard.component'

const meta: Meta<typeof PlaceholderCard> = {
  title: 'Screens/CARDS/PlaceholderCard',
  component: PlaceholderCard,
  tags: ['autodocs'],
  argTypes: {
    name: field.string(),
    className: field.string(),
    children: field.reactNode(true),
  },
}

export default meta

type Story = StoryObj<typeof PlaceholderCard>

export const Demo: Story = {
  parameters: params('PlaceholderCard'),
  args: {
    name: 'COMPONENT',
  },
}
