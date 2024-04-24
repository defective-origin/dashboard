// eslint-disable-next-line no-restricted-imports
import { field, params } from '../../../.storybook/tool'
import type { Meta, StoryObj } from '@storybook/react'
import Content from './Content.component'

const meta: Meta<typeof Content> = {
  component: Content,
  title: 'Components/LAYOUT/MAGNETS/Content',
  tags: ['autodocs'],
  argTypes: {
    className: field.string(),
    children: field.reactNode(),
  },
}

export default meta

type Story = StoryObj<typeof Content>

export const Demo: Story = {
  parameters: params('Content'),
  args: {
    className: '',
    children: 'Demo',
  },
}
