/* eslint-disable no-restricted-imports */
import { field, params } from '../../../../.storybook/tools'
import type { Meta, StoryObj } from '@storybook/react'
import ButtonGroup, { ButtonGroupProps } from './ButtonGroup.component'

const meta: Meta<typeof ButtonGroup> = {
  component: ButtonGroup,
  title: 'Components/actions/ButtonGroup',
  tags: ['autodocs'],
  argTypes: {
    items: field.list('ButtonProps'),
    className: field.string(),
    children: field.reactNode(),
  },
}

export default meta

type Story = StoryObj<typeof ButtonGroup>

export const Demo: Story = {
  parameters: params('ButtonGroup'),
  args: {
    items: [
      { content: 'button 1' },
      { content: 'button 2' },
    ],
  },
}
