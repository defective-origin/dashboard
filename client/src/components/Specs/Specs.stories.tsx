/* eslint-disable no-restricted-imports */
import { field, params } from '../../../.storybook/tool'
import type { Meta, StoryObj } from '@storybook/react'
import Specs from './Specs.component'
import { COLORS, SIZES } from 'theme'

const JUSTIFIES = ['start', 'end']

const meta: Meta<typeof Specs> = {
  component: Specs,
  title: 'Components/DATA DISPLAY/Specs',
  tags: ['autodocs'],
  argTypes: {
    className: field.string(),
    children: field.reactNode(),
    items: field.list('Spec'),
    vertical: field.boolean(),
    justifies: field.variants(JUSTIFIES, 'JustifyContent', 'start'),
    size: field.variants(SIZES, 'SpecSize', 'sm'),
  },
}

export default meta

type Story = StoryObj<typeof Specs>

export const Demo: Story = {
  parameters: params('Specs'),
  args: {
    vertical: false,
    justifies: 'start',
    size: 'xs',
    items: [
      { name: 'Without placeholder', format: 'uppercase' },
      { name: 'Default placeholder', format: 'uppercase', placeholder: true },
      { name: 'Custom placeholder', format: 'uppercase', placeholder: 'N/A' },
      { name: 'Name', content: 'eArTh', format: 'uppercase' },
      { name: 'Weight', content: 123456, format: 'weight' },
    ],
  },
}

export const Sizes: Story = {
  parameters: params('Size', SIZES),
  args: {
    items: SIZES.map((size) => ({ name: 'Name', content: 'eArTh', format: 'uppercase', size })),
  },
}

export const Colors: Story = {
  parameters: params('Color', COLORS),
  args: {
    size: 'xs',
    items: COLORS.map((color) => ({ name: 'Name', content: 'eArTh', format: 'uppercase', color })),
  },
}

export const Direction: Story = {
  parameters: params('Direction'),
  args: {
    size: 'xs',
    items: [false, true].map((vertical) => ({ vertical, name: vertical ? 'vertical' : 'horizontal', content: 'eArTh', format: 'uppercase' })),
  },
}

export const Justifies: Story = {
  parameters: params('Justifies', JUSTIFIES),
  args: {
    width: 300,
    size: 'xs',
    items: JUSTIFIES.map((justifies) => ({ justifies, name: justifies, content: 'eArTh', format: 'uppercase' })),
  },
}
