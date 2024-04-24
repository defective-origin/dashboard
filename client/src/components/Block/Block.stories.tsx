// eslint-disable-next-line no-restricted-imports
import { field, params } from '../../../.storybook/tool'
import type { Meta, StoryObj } from '@storybook/react'
import Block, { BlockProps } from './Block.component'
import Item from 'components/Item'

const variants: BlockProps['v'][] = [undefined, 'x', 'y', 'xy', 'cards']
const spaces: BlockProps['g'][] = [undefined, 'xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl']
const aligns: BlockProps['aligns'][] = [undefined, 'flex-start', 'center', 'flex-end', 'baseline', 'stretch' ]
const justifies: BlockProps['justifies'][] = [undefined, 'flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly']

const meta: Meta<typeof Block> = {
  title: 'Components/LAYOUT/Block',
  component: Block,
  tags: ['autodocs'],
  argTypes: {
    className: field.string(),
    children: field.reactNode(),
    g: field.variants(spaces, 'BlockSpace'),
    p: field.variants(spaces, 'BlockSpace'),
    m: field.variants(spaces, 'BlockSpace'),
    v: field.variants(variants, 'BlockVariant', 'y'),
    justifies: field.variants(justifies, 'JustifyContent'),
    aligns: field.variants(aligns, 'AlignItems'),
  },
}

export default meta

type Story = StoryObj<typeof Block>

const render = (props: BlockProps) => {
  const direction = props?.v ?? 'y'

  return (
    <Block background='var(--sb-margin-color)'>
      {/* prevent margins from collapsing */}
      {props.m && <div style={{ height: '0.5px' }} />}

      <Block minWidth={200} minHeight={200} background='var(--sb-space-color)' {...props}>
        {Array.from(Array(10).keys()).map(() =>
          <Item
            minWidth={['xy', 'cards'].includes(direction) ? 100 : 20}
            minHeight={['xy', 'cards'].includes(direction) ? 100 : 20}
            background='var(--sb-item-color)'
          />,
        )}
      </Block>

      {/* prevent margins from collapsing */}
      {props.m && <div style={{ height: '0.5px' }} />}
    </Block>
  )
}

export const Demo: Story = {
  parameters: params('Block'),
  render,
  args: {
    v: 'cards',
    g: 'xxs',
    m: 'xxs',
    p: 'xxs',
  },
}

export const Variants: Story = {
  parameters: params('Variant', variants),
  render,
  args: {
    v: 'x',
    g: 'xxs',
  },
}

export const Spaces: Story = {
  parameters: params('Margin | Padding | Gap', spaces),
  render,
  args: {
    v: 'cards',
    g: 'xxs',
    m: 'xxs',
    p: 'xxs',
  },
}

export const Justifies: Story = {
  parameters: params('Justify', justifies),
  render,
  args: {
    v: 'xy',
    g: 'xxs',
    justifies: 'center',
  },
}

export const Aligns: Story = {
  parameters: params('Align', aligns),
  render,
  args: {
    v: 'xy',
    g: 'xxs',
    aligns: 'center',
  },
}
