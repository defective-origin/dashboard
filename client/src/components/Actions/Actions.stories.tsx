/* eslint-disable no-restricted-imports */
import { params, field } from '../../../.storybook/tool'
import type { Meta, StoryObj } from '@storybook/react'
import Actions, { ActionItem } from './Actions.component'

const ITEMS: ActionItem[] = [
  { variant: 'button', start: 'settings', end: 'settings', tooltip: 'Television', content: 'button', v: 'outlined' },
  { variant: 'link', start: 'settings', tooltip: 'Add Widget', content: 'link' },
  {
    start: 'settings', end: 'settings', content: 'button menu', v: 'outlined', items: [
      { start: 'settings', content: 'aaa', tooltip: 'aaa' },
      { start: 'settings', content: 'bbb', tooltip: 'bbb' },
      {
        start: 'settings', content: 'ccc', items: [
          { start: 'settings', content: 'ddd', tooltip: 'ddd' },
          { start: 'settings', content: 'eee', tooltip: 'eee' },
          {
            start: 'settings', content: 'fff', items: [
              { start: 'settings', content: 'ggg', tooltip: 'ggg' },
              { start: 'settings', content: 'hhh', tooltip: 'hhh' },
              { start: 'settings', content: 'yyy', tooltip: 'yyy' },
            ],
          },
        ],
      },
    ],
  },
]

const meta: Meta<typeof Actions> = {
  component: Actions,
  title: 'Components/ACTIONS/Actions',
  tags: ['autodocs'],
  argTypes: {
    menu: field.variants(['top', 'right', 'bottom', 'left'], 'MenuVariant'),
  },
}

export default meta

type Story = StoryObj<typeof Actions>

export const Demo: Story = {
  parameters: params('Actions'),
  args: {
    items: ITEMS,
    menu: 'top',
    g: 'xxl',
  },
  render: (props) => <Actions items={ITEMS} {...props} />,
}
