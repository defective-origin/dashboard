/* eslint-disable no-restricted-imports */
import { field, params } from '../../../../.storybook/tool'
import type { Meta, StoryObj } from '@storybook/react'
import Devices, { DevicesProps } from './Devices.component'

const meta: Meta<typeof Devices> = {
  component: Devices,
  title: 'Screens/Views/Devices',
  tags: ['autodocs'],
  argTypes: {
    items: field.object('DeviceItems'),
    className: field.string(),
    children: field.reactNode(),
  },
}

export default meta

type Story = StoryObj<typeof Devices>

export const Demo: Story = {
  parameters: params('Devices'),
  args: {
    items: {
      tv: { active: false, columns: 10, rows: 10 },
      computer: { active: true, columns: 10, rows: 10 },
      tablet: { active: false, columns: 10, rows: 10 },
      mobile: { active: true, columns: 10, rows: 10 },
      watch: { active: false, columns: 10, rows: 10 },
    },
  },
}
