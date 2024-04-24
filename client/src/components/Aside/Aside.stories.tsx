// eslint-disable-next-line no-restricted-imports
import { field, params } from '../../../.storybook/tool'
import type { Meta, StoryObj } from '@storybook/react'
import Aside from './Aside.component'

const meta: Meta<typeof Aside> = {
  component: Aside,
  title: 'Components/LAYOUT/MAGNETS/Aside',
  tags: ['autodocs'],
  argTypes: {
    className: field.string(),
    children: field.reactNode(),
  },
}

export default meta

type Story = StoryObj<typeof Aside>

export const Demo: Story = {
  parameters: params('Aside'),
  args: {
    className: '',
    children: 'Demo',
  },
}
