/* eslint-disable no-restricted-imports */
import { SB_CSS, field, params } from '../../../.storybook/tool'
import type { Meta, StoryObj } from '@storybook/react'
import Menu, { MenuItem, MenuProps, MenuTriggerOptions } from './Menu.component'
import Block from 'components/Block'
import Item from 'components/Item'

const VARIANTS: MenuProps['horizontal'][] = [false, true]
const ITEMS: MenuItem[] = [
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
]

const trigger = (o: MenuTriggerOptions) => <Item width={50} height={50} background={o.open ? 'orange' : SB_CSS.item} />

const meta: Meta<typeof Menu> = {
  component: Menu,
  title: 'Components/ACTIONS/Menu',
  tags: ['autodocs'],
  argTypes: {
    trigger: field.func(),
    items: field.object('MenuItem[]'),
    horizontal: field.boolean(),
    className: field.string(),
    children: field.reactNode(),
  },
}

export default meta

type Story = StoryObj<typeof Menu>

const initVariants = <P extends keyof MenuProps>(prop: P, items: MenuProps[P][]) => (
  <Block v='x' justify='space-between' width={500} justifies='space-between'>
    {items.map((item, idx) => (
      <Menu
        key={idx}
        trigger={trigger}
        items={ITEMS}
        open
        {...{ [prop]: item }}
      />
    ))}
  </Block>
)

export const Demo: Story = {
  parameters: params('Menu'),
  args: {
    trigger,
    items: ITEMS,
    horizontal: true,
  },
}

export const Variants: Story = {
  parameters: params('Menu can be vertical and horizontal'),
  render: () => initVariants('horizontal', VARIANTS),
}
