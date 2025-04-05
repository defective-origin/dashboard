/* eslint-disable no-restricted-imports */
import { field, params } from '../../../../.storybook/tool'
import type { Meta, StoryObj } from '@storybook/react'
import { COLORS, SIZES } from 'theme'
import Tabs, { TabsProps } from './Tabs.component'

const VARIANTS: TabsProps['v'][] = ['success', 'info', 'warning', 'error']

const meta: Meta<typeof Tabs> = {
  component: Tabs,
  title: 'Components/Tabs',
  tags: ['autodocs'],
  argTypes: {
    name: field.string(),
    className: field.string(),
    children: field.reactNode(),
  },
}

export default meta

type Story = StoryObj<typeof Tabs>

export const Demo: Story = {
  parameters: params('Tabs'),
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
