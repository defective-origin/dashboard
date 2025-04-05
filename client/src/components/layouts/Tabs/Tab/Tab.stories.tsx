/* eslint-disable no-restricted-imports */
import { field, params } from '../../../../.storybook/tool'
import type { Meta, StoryObj } from '@storybook/react'
import { COLORS, SIZES } from 'theme'
import Tab, { TabProps } from './Tab.component'

const VARIANTS: TabProps['v'][] = ['success', 'info', 'warning', 'error']

const meta: Meta<typeof Tab> = {
  component: Tab,
  title: 'Components/Tab',
  tags: ['autodocs'],
  argTypes: {
    name: field.string(),
    className: field.string(),
    children: field.reactNode(),
  },
}

export default meta

type Story = StoryObj<typeof Tab>

export const Demo: Story = {
  parameters: params('Tab'),
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
