/* eslint-disable no-restricted-imports */
import { field, params } from '../../../.storybook/tool'
import type { Meta, StoryObj } from '@storybook/react'
import Clipboard, { ClipboardProps } from './Clipboard.component'

const meta: Meta<typeof Clipboard> = {
  component: Clipboard,
  title: 'Components/ACTIONS/Clipboard',
  tags: ['autodocs'],
  argTypes: {
    className: field.string(),
    children: field.reactNode(),
  },
}

export default meta

type Story = StoryObj<typeof Clipboard>

export const Demo: Story = {
  parameters: params('Clipboard'),
  args: {
    content: 123456789,
  },
}
