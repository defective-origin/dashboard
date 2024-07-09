/* eslint-disable no-restricted-imports */
import { field, params } from '../../../../.storybook/tool'
import type { Meta, StoryObj } from '@storybook/react'
import DashboardModalForm, { DashboardModalFormProps } from './DashboardModalForm.component'

const meta: Meta<typeof DashboardModalForm> = {
  component: DashboardModalForm,
  title: 'Screens/Forms/DashboardModalForm',
  tags: ['autodocs'],
  argTypes: {
    name: field.string(),
    className: field.string(),
    children: field.reactNode(),
  },
}

export default meta

type Story = StoryObj<typeof DashboardModalForm>

export const Demo: Story = {
  parameters: params('DashboardModalForm'),
  args: {
    open: true,
    payload: {
      id: 2,
      name: 'BOARD NAME',
      description: 'dashboard description',
      author: 0,
      access: 'PRIVATE',
      preview: 'url.com',
      markups: {
        computer: { active: true, rows: 10, columns: 10 },
      },
    },
  },
}
