// eslint-disable-next-line no-restricted-imports
import { SB_CSS, field, params } from '../../../../.storybook/tools'
import type { Meta, StoryObj } from '@storybook/react'
import Item, { ItemProps } from './Item.component'
import Block from 'components/layouts/Block'
import { COLORS, SIZES, toVariable } from 'theme'

const AREAS: ItemProps['area'][] = ['left', 'right', 'center', 'top', 'bottom']

const render = (props: ItemProps) => {
  const { m, p, ...otherProps } = props

  return (
    <Item background={SB_CSS.margin}>
      {/* prevent margins from collapsing */}
      <div style={{ height: '0.5px' }} />

      <Item background={SB_CSS.space} m={m} p={p}>
        <Item minWidth={100} minHeight={100} background={SB_CSS.item} {...otherProps} />
      </Item>

      {/* prevent margins from collapsing */}
      <div style={{ height: '0.5px' }} />
    </Item>
  )
}

const meta: Meta<typeof Item> = {
  component: Item,
  title: 'Components/Layouts/Item',
  tags: ['autodocs'],
  argTypes: {
    className: field.string(),
    children: field.reactNode(),
    stretch: field.boolean(),
    grow: field.number('FlexGrow'),
    style: field.css(),
    g: field.variants(SIZES, 'BlockSpace'),
    p: field.variants(SIZES, 'BlockSpace'),
    m: field.variants(SIZES, 'BlockSpace'),
  },
}

export default meta

type Story = StoryObj<typeof Item>

export const Demo: Story = {
  parameters: params('Item [Requirements](?path=/docs/requirements-layout--docs)'),
  render,
  args: {
    children: 'Demo',
    g: 'xxs',
    m: 'xxs',
    p: 'xxs',
    stretch: false,
  },
}

export const Area: Story = {
  parameters: params('**Area** is the most important property. We use **magnet places** to stick to block layout and have our app adaptive and flexible. \n\n Area', AREAS),
  render,
  args: {
    children: 'Demo',
    g: 'xxs',
    m: 'xxs',
    p: 'xxs',
    stretch: false,
  },
}

export const Spaces: Story = {
  parameters: params('Margin[m] | Padding[p] | Gap[g]', SIZES),
  render: () => (
    <Block g='xxs' v='x'>
      {SIZES.filter(Boolean).map((size, i) => (
        <Item
          key={size}
          width={toVariable('space-size', size)}
          height={toVariable('space-size', size)}
          background={toVariable('color', `${COLORS[i]}-4`)}
        />
      ))}
    </Block>
  ),
}
