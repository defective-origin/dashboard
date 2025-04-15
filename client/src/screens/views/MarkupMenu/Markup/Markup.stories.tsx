/* eslint-disable no-restricted-imports */
import { field, params } from '../../../../../.storybook/tools'
import type { Meta, StoryObj } from '@storybook/react'
import Markup, { MarkupProps } from './Markup.component'
import { MarkupWidth } from '../MarkupBoard.hooks'

const MARKUPS: MarkupWidth[] = [0, 576, 768, 992, 1200, 1366, 1920, 2562, 3840, 7680]

const meta: Meta<typeof Markup> = {
  component: Markup,
  title: 'Screens/Views/Markup',
  tags: ['autodocs'],
  argTypes: {
    v: field.variants(MARKUPS, 'MarkupSize'),
    className: field.string(),
  },
}

export default meta

type Story = StoryObj<typeof Markup>

export const Demo: Story = {
  parameters: params('Markup'),
  args: {
    v: 992,
  },
}
