/* eslint-disable no-restricted-imports */
import { field, params } from '../../../../.storybook/tool'
import type { Meta, StoryObj } from '@storybook/react'
import { COLORS, SIZES } from 'theme'
import JsonField, { JsonFieldProps } from './JsonField.component'

const VARIANTS: JsonFieldProps['v'][] = ['success', 'info', 'warning', 'error']

const meta: Meta<typeof JsonField> = {
  component: JsonField,
  title: 'Components/JsonField',
  tags: ['autodocs'],
  argTypes: {
    name: field.string(),
    className: field.string(),
    children: field.reactNode(),
  },
}

export default meta

type Story = StoryObj<typeof JsonField>

export const Demo: Story = {
  parameters: params('JsonField'),
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
