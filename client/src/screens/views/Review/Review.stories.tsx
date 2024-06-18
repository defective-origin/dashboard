/* eslint-disable no-restricted-imports */
import { field, params } from '../../../../.storybook/tool'
import type { Meta, StoryObj } from '@storybook/react'
import Review, { ReviewProps } from './Review.component'

const meta: Meta<typeof Review> = {
  component: Review,
  title: 'Screens/Views/Review',
  tags: ['autodocs'],
  argTypes: {
    className: field.string(),
    children: field.reactNode(),
  },
}

export default meta

type Story = StoryObj<typeof Review>

export const Demo: Story = {
  parameters: params('Review'),
  args: {
    options: {
      id: 1,
      author: 1,
      value: 'Comment '.repeat(50),
      likes: 740,
      dislike: 0,
      date: new Date().toISOString(),
    },
  },
}
