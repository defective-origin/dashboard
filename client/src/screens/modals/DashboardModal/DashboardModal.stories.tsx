/* eslint-disable no-restricted-imports */
import { field, params } from '../../../../.storybook/tool'
import type { Meta, StoryObj } from '@storybook/react'
import DashboardModal, { DashboardModalProps } from './DashboardModal.component'

const meta: Meta<typeof DashboardModal> = {
  component: DashboardModal,
  title: 'Screens/Forms/DashboardModal',
  tags: ['autodocs'],
  argTypes: {
    name: field.string(),
    className: field.string(),
    children: field.reactNode(),
  },
}

export default meta

type Story = StoryObj<typeof DashboardModal>

export const Demo: Story = {
  parameters: params('DashboardModal'),
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
