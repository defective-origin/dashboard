/* eslint-disable no-restricted-imports */
import { SB_CSS, field, params } from '../../../.storybook/tool'
import type { Meta, StoryObj } from '@storybook/react'
import Block, { BlockProps } from './Block.component'
import Item from 'components/Item'
import Layout from 'components/Layout'
import { DIRECTION, SIZES } from 'theme'
import Tag from 'components/Tag'

const VARIANTS: BlockProps['v'][] = [...DIRECTION, 'cards']
const ALIGNS: BlockProps['aligns'][] = ['flex-start', 'center', 'flex-end', 'baseline', 'stretch' ]
const JUSTIFIES: BlockProps['justifies'][] = ['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly']

const meta: Meta<typeof Block> = {
  title: 'Components/Layouts/Block',
  component: Block,
  tags: ['autodocs'],
  argTypes: {
    className: field.string(),
    children: field.reactNode(),
    g: field.variants(SIZES, 'BlockSpace'),
    p: field.variants(SIZES, 'BlockSpace'),
    m: field.variants(SIZES, 'BlockSpace'),
    v: field.variants(VARIANTS, 'BlockVariant', 'y'),
    justifies: field.variants(JUSTIFIES, 'JustifyContent'),
    aligns: field.variants(ALIGNS, 'AlignItems'),
  },
}

export default meta

type Story = StoryObj<typeof Block>

const render = (props: BlockProps) => {
  const direction = props?.v ?? 'y'

  return (
    <Block background={SB_CSS.margin}>
      {/* prevent margins from collapsing */}
      {props.m && <div style={{ height: '0.5px' }} />}

      <Block minWidth={200} minHeight={200} background={SB_CSS.space} {...props}>
        {Array.from(Array(10).keys()).map((idx) =>
          <Item
            key={idx}
            minWidth={['xy', 'cards'].includes(direction) ? 100 : 20}
            minHeight={20}
            background={SB_CSS.item}
          />,
        )}
      </Block>

      {/* prevent margins from collapsing */}
      {props.m && <div style={{ height: '0.5px' }} />}
    </Block>
  )
}

export const Demo: Story = {
  parameters: params('Block [Requirements](?path=/docs/requirements-layout--docs)'),
  render,
  args: {
    v: 'cards',
    g: 'xxs',
    m: 'xxs',
    p: 'xxs',
  },
}

export const Variants: Story = {
  parameters: params('View', VARIANTS),
  render: () => (
    <Layout g='xs' v='board' columns={4}>
      {VARIANTS.filter(Boolean).map((v) => (
        <Block key={v} background={SB_CSS.space} v={v} g='xxs' p='xxs' position='relative'>
          <Tag
            content={v}
            format='uppercase'
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          />

          {Array.from(Array(10).keys()).map((idx) =>
            <Item
              key={idx}
              minWidth={['xy', 'cards'].includes(v ?? '') ? 50 : 20}
              minHeight={20}
              background={SB_CSS.item}
            />,
          )}
        </Block>
      ))}
    </Layout>
  ),
}

export const Spaces: Story = {
  parameters: params('Margin[m] | Padding[p] | Gap[g]', SIZES),
  render,
  args: {
    v: 'cards',
    g: 'xxs',
    m: 'xxs',
    p: 'xxs',
  },
}

export const Justifies: Story = {
  parameters: params('Justify', JUSTIFIES),
  render,
  args: {
    v: 'xy',
    g: 'xxs',
    justifies: 'center',
  },
}

export const Aligns: Story = {
  parameters: params('Align', ALIGNS),
  render,
  args: {
    v: 'xy',
    g: 'xxs',
    aligns: 'center',
  },
}
