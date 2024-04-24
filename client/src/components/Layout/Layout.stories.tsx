// eslint-disable-next-line no-restricted-imports
import { field, params } from '../../../.storybook/tool'
import type { Meta, StoryObj } from '@storybook/react'
import Layout, { LayoutProps } from './Layout.component'
import Item from 'components/Item'

const cardVariants: LayoutProps['v'][] = ['column', 'row', 'board']
const layoutVariants: LayoutProps['v'][] = ['columns', 'rows', 'top', 'right', 'bottom', 'left']
const variants: LayoutProps['v'][] = [undefined, ...cardVariants, ...layoutVariants]
const spaces: LayoutProps['g'][] = [undefined, 'xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl']
const aligns: LayoutProps['aligns'][] = [undefined, 'start', 'center', 'end', 'baseline', 'stretch' ]
const justifies: LayoutProps['justifies'][] = [undefined, 'start', 'end', 'center', 'space-between', 'space-around', 'space-evenly']

const meta: Meta<typeof Layout> = {
  title: 'Components/LAYOUT/Layout',
  component: Layout,
  tags: ['autodocs'],
  argTypes: {
    className: field.string(),
    children: field.reactNode(),
    g: field.variants(spaces, 'LayoutSpace'),
    p: field.variants(spaces, 'LayoutSpace'),
    m: field.variants(spaces, 'LayoutSpace'),
    v: field.variants(variants, 'LayoutDirection'),
    justifies: field.variants(justifies, 'JustifyItems'),
    aligns: field.variants(aligns, 'AlignItems'),
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
  <Layout background='var(--sb-margin-color)'>
    {/* prevent margins from collapsing */}
    {props.m && <div style={{ height: '0.5px' }} />}

    <Layout minWidth={200} minHeight={200} background='var(--sb-space-color)' {...props}>
      {['left', 'right', 'top', 'bottom', 'center'].map((v) =>
        <Item
          background='var(--sb-item-color)'
          area={props.v && layoutVariants.includes(props.v) ? v : undefined}
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
  parameters: params('Layout'),
  render,
  args: {
    v: 'columns',
    g: 'xxs',
    m: 'xxs',
    p: 'xxs',
  },
}

export const Variants: Story = {
  parameters: params('Variant', variants),
  render,
  args: {
    v: 'columns',
    g: 'xxs',
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
  },
}

export const Justifies: Story = {
  parameters: params('Justify', justifies),
  render,
  args: {
    v: 'columns',
    g: 'xxs',
    justifies: 'center',
  },
}

export const Aligns: Story = {
  parameters: params('Align', aligns),
  render,
  args: {
    v: 'columns',
    g: 'xxs',
    aligns: 'center',
  },
}
