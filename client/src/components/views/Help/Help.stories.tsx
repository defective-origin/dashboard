/* eslint-disable no-restricted-imports */
import { field, params } from '../../../../.storybook/tools'
import type { Meta, StoryObj } from '@storybook/react'
import Help from './Help.component'

const meta: Meta<typeof Help> = {
  component: Help,
  title: 'Components/Views/Help',
  tags: ['autodocs'],
  argTypes: {
    title: field.string(),
    open: field.boolean(),
    className: field.string(),
    children: field.reactNode(),
    content: field.reactNode(),
  },
}

export default meta

type Story = StoryObj<typeof Help>

export const Demo: Story = {
  parameters: params('Help'),
  args: {
    title: 'Demo',
    open: true,
    content: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatum optio tenetur eos non quam aperiam repudiandae ullam maxime Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatum optio tenetur eos non quam aperiam repudiandae ullam maxime sapiente minus, eum amet ut! Inventore, at iste est ullam minima dolorem',
  },
}

