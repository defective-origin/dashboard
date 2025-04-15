/* eslint-disable no-restricted-imports */
import { field, params } from '../../../../.storybook/tools'
import type { Meta, StoryObj } from '@storybook/react'
import Reviews, { ReviewsProps } from './Reviews.component'

const meta: Meta<typeof Reviews> = {
  component: Reviews,
  title: 'Screens/Views/Reviews',
  tags: ['autodocs'],
  argTypes: {
    name: field.string(),
    className: field.string(),
    children: field.reactNode(),
  },
}

export default meta

type Story = StoryObj<typeof Reviews>

export const Demo: Story = {
  parameters: params('Reviews'),
  args: {
    name: 'Demo',
  },
}
