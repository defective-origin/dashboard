/* eslint-disable no-restricted-imports */
import { field, params } from '../../../../../.storybook/tools'
import type { Meta, StoryObj } from '@storybook/react'
import { COLORS, SIZES } from 'theme'
import TabContent, { TabContentProps } from './TabContent.component'

const VARIANTS: TabContentProps['v'][] = ['success', 'info', 'warning', 'error']

const meta: Meta<typeof TabContent> = {
  component: TabContent,
  title: 'Components/TabContent',
  tags: ['autodocs'],
  argTypes: {
    name: field.string(),
    className: field.string(),
    children: field.reactNode(),
  },
}

export default meta

type Story = StoryObj<typeof TabContent>

export const Demo: Story = {
  parameters: params('TabContent'),
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
