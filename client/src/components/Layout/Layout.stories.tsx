/* eslint-disable no-restricted-imports */
import { SB_CSS, field, params } from '../../../.storybook/tool'
import type { Meta, StoryObj } from '@storybook/react'
import { SIZES } from 'theme'
import Layout, { LayoutProps } from './Layout.component'
import Item from 'components/Item'
import Tag from 'components/Tag'

const CARD_VARIANTS: LayoutProps['v'][] = ['column', 'row', 'board']
const LAYOUT_VARIANTS: LayoutProps['v'][] = ['columns', 'rows', 'top', 'right', 'bottom', 'left']
const VARIANTS: LayoutProps['v'][] = [...CARD_VARIANTS, ...LAYOUT_VARIANTS]
const ALIGNS: LayoutProps['aligns'][] = ['start', 'center', 'end', 'baseline', 'stretch' ]
const JUSTIFIES: LayoutProps['justifies'][] = ['start', 'end', 'center', 'space-between', 'space-around', 'space-evenly']

const meta: Meta<typeof Layout> = {
  title: 'Components/LAYOUT/Layout',
  component: Layout,
  tags: ['autodocs'],
  argTypes: {
    className: field.string(),
    children: field.reactNode(),
    g: field.variants(SIZES, 'LayoutSpace'),
    p: field.variants(SIZES, 'LayoutSpace'),
    m: field.variants(SIZES, 'LayoutSpace'),
    v: field.variants(VARIANTS, 'LayoutDirection'),
    justifies: field.variants(JUSTIFIES, 'JustifyItems'),
    aligns: field.variants(ALIGNS, 'AlignItems'),
    grow: field.number('FlexGrow'),
    columns: field.number(),
    rows: field.number(),
    template: field.string(),
    cell: field.string(),
    flow: field.string('GridAutoFlow'),
    places: field.string('PlaceItems'),
    areas: field.string('GridTemplateAreas'),
  },
}

export default meta

type Story = StoryObj<typeof Layout>

const render = (props: LayoutProps) => (
  <Layout background={SB_CSS.margin}>
    {/* prevent margins from collapsing */}
    {props.m && <div style={{ height: '0.5px' }} />}

    <Layout minWidth={200} minHeight={200} background={SB_CSS.space} {...props}>
      {['left', 'right', 'top', 'bottom', 'center'].map((v) =>
        <Item
          key={v}
          background={SB_CSS.item}
          area={props.v && LAYOUT_VARIANTS.includes(props.v) ? v : undefined}
          minHeight={20}
          minWidth={20}
        />,
      )}
    </Layout>

    {/* prevent margins from collapsing */}
    {props.m && <div style={{ height: '0.5px' }} />}
  </Layout>
)

export const Demo: Story = {
  parameters: params('Layout [Requirements](?path=/docs/requirements-layout--docs)'),
  render,
  args: {
    v: 'columns',
    g: 'xxs',
    m: 'xxs',
    p: 'xxs',
  },
}

export const Variants: Story = {
  parameters: params('View', VARIANTS),
  render: () => (
    <Layout g='xs' v='board' columns={3} position='relative'>
      {VARIANTS.filter(Boolean).map((v) => (
        <Layout key={v} background={SB_CSS.space} v={v} g='xxs' p='xxs' columns={v === 'board' ? 2 : undefined} position='relative'>
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

          {['left', 'right', 'top', 'bottom', 'center'].map((i) =>
            <Item
              key={i}
              background={SB_CSS.item}
              area={LAYOUT_VARIANTS.includes(v) ? i : undefined}
              minHeight={50}
              minWidth={50}
            />,
          )}
        </Layout>
      ))}
    </Layout>
  ),
}

export const Spaces: Story = {
  parameters: params('Margin[m] | Padding[p] | Gap[g]', SIZES),
  render,
  args: {
    v: 'columns',
    g: 'xxs',
    m: 'xxs',
    p: 'xxs',
  },
}

export const Justifies: Story = {
  parameters: params('Justify', JUSTIFIES),
  render,
  args: {
    v: 'columns',
    g: 'xxs',
    justifies: 'center',
  },
}

export const Aligns: Story = {
  parameters: params('Align', ALIGNS),
  render,
  args: {
    v: 'columns',
    g: 'xxs',
    aligns: 'center',
  },
}
