/* eslint-disable no-restricted-imports */
import { field, params } from '../../../.storybook/tool'
import type { Meta, StoryObj } from '@storybook/react'
import Account, { AccountProps } from './Account.component'

const meta: Meta<typeof Account> = {
  component: Account,
  title: 'Screens/Account',
  tags: ['autodocs'],
  argTypes: {
    className: field.string(),
    children: field.reactNode(),
  },
}

export default meta

type Story = StoryObj<typeof Account>

export const Demo: Story = {
  parameters: params('Account'),
  args: {
    open: true,
  },
}
