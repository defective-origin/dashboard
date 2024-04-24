// eslint-disable-next-line no-restricted-imports
import { field, params } from '../../../.storybook/tool'
import type { Meta, StoryObj } from '@storybook/react'
import Item, { ItemProps } from './Item.component'
import Block from 'components/Block'

const spaces: ItemProps['g'][] = [undefined, 'xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl']

const render = (props: ItemProps) => {
  return (
    <Block>
      {/* prevent margins from collapsing */}
      {props.m && <div style={{ height: '0.5px' }} />}

      <Block minWidth={200} minHeight={200} border='1px solid var(--sb-border-color)'>
        <Item {...props} />
      </Block>

      {/* prevent margins from collapsing */}
      {props.m && <div style={{ height: '0.5px' }} />}
    </Block>
  )
}

const meta: Meta<typeof Item> = {
  component: Item,
  title: 'Components/LAYOUT/Item',
  tags: ['autodocs'],
  argTypes: {
    className: field.string(),
    children: field.reactNode(),
    stretch: field.boolean(),
    grow: field.number('FlexGrow'),
    style: field.css(),
    g: field.variants(spaces, 'BlockSpace'),
    p: field.variants(spaces, 'BlockSpace'),
    m: field.variants(spaces, 'BlockSpace'),
  },
}

export default meta

type Story = StoryObj<typeof Item>

export const Demo: Story = {
  parameters: params('Item'),
  render,
  args: {
    className: '',
    children: 'Demo',
    g: 'xxs',
    m: 'xxs',
    p: 'xxs',
    stretch: false,
    background: 'var(--sb-item-color)',
  },
}

export const Spaces: Story = {
  parameters: params('Margin | Padding | Gap', spaces),
  render,
  args: {
    v: 'columns',
    g: 'xxs',
    m: 'xxs',
    p: 'xxs',
    background: 'var(--sb-item-color)',
  },
}
