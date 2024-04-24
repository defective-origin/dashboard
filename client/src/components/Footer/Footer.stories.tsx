// eslint-disable-next-line no-restricted-imports
import { field, params } from '../../../.storybook/tool'
import type { Meta, StoryObj } from '@storybook/react'
import Footer from './Footer.component'

const meta: Meta<typeof Footer> = {
  component: Footer,
  title: 'Components/LAYOUT/MAGNETS/Footer',
  tags: ['autodocs'],
  argTypes: {
    className: field.string(),
    children: field.reactNode(),
  },
}

export default meta

type Story = StoryObj<typeof Footer>

export const Demo: Story = {
  parameters: params('Footer'),
  args: {
    className: '',
    children: 'Demo',
  },
}
