/* eslint-disable no-restricted-imports */
import { field, params } from '../../../.storybook/tool'
import type { Meta, StoryObj } from '@storybook/react'
import Device, { DeviceProps, DeviceVariant } from './Device.component'

const DEVICES: DeviceVariant[] = ['tv', 'computer', 'tablet', 'mobile', 'watch']

const meta: Meta<typeof Device> = {
  component: Device,
  title: 'Screens/Views/Device',
  tags: ['autodocs'],
  argTypes: {
    v: field.variants(DEVICES, 'DeviceVariant'),
    className: field.string(),
  },
}

export default meta

type Story = StoryObj<typeof Device>

export const Demo: Story = {
  parameters: params('Device'),
  args: {
    v: 'tv',
  },
}
