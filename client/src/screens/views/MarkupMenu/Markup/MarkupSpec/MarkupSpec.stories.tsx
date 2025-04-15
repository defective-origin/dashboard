/* eslint-disable no-restricted-imports */
import { field, params } from '../../../../../../.storybook/tools'
import type { Meta, StoryObj } from '@storybook/react'
import { COLORS, SIZES } from 'theme'
import MarkupSpec, { MarkupSpecProps } from './MarkupSpec.component'

const VARIANTS: MarkupSpecProps['v'][] = ['success', 'info', 'warning', 'error']

const meta: Meta<typeof MarkupSpec> = {
  component: MarkupSpec,
  title: 'Components/MarkupSpec',
  tags: ['autodocs'],
  argTypes: {
    name: field.string(),
    className: field.string(),
    children: field.reactNode(),
  },
}

export default meta

type Story = StoryObj<typeof MarkupSpec>

export const Demo: Story = {
  parameters: params('MarkupSpec'),
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
