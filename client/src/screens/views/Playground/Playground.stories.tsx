/* eslint-disable no-restricted-imports */
import { field, params } from '../../../../.storybook/tools'
import type { Meta, StoryObj } from '@storybook/react'
import { COLORS, SIZES } from 'theme'
import Playground, { PlaygroundProps } from './Playground.component'

const VARIANTS: PlaygroundProps['v'][] = ['success', 'info', 'warning', 'error']

const meta: Meta<typeof Playground> = {
  component: Playground,
  title: 'Components/Playground',
  tags: ['autodocs'],
  argTypes: {
    name: field.string(),
    className: field.string(),
    children: field.reactNode(),
  },
}

export default meta

type Story = StoryObj<typeof Playground>

export const Demo: Story = {
  parameters: params('Playground'),
  args: {
    name: 'Demo',
  },
}

export const Variants: Story = {
  parameters: params('View', VARIANTS),
  args: {
    name: 'Demo',
    v: 'success',
  },
}
