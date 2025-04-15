/* eslint-disable no-restricted-imports */
import { field, params } from '../../../../../.storybook/tools'
import type { Meta, StoryObj } from '@storybook/react'
import { COLORS, SIZES } from 'theme'
import TagsField, { TagsFieldProps } from './TagsField.component'

const VARIANTS: TagsFieldProps['v'][] = ['success', 'info', 'warning', 'error']

const meta: Meta<typeof TagsField> = {
  component: TagsField,
  title: 'Components/TagsField',
  tags: ['autodocs'],
  argTypes: {
    name: field.string(),
    className: field.string(),
    children: field.reactNode(),
  },
}

export default meta

type Story = StoryObj<typeof TagsField>

export const Demo: Story = {
  parameters: params('TagsField'),
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
