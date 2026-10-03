import { Meta, StoryObj, field, params, theme } from 'storybook'
import Tag from 'components/views/Tag'
import Item from 'components/layouts/Item'
import Block, { BlockProps } from './Block.component'

const FLEX_VARIANTS: BlockProps['v'][] = [...theme.DIRECTION, 'cards', 'flex']
const FLEX_ALIGNS: BlockProps['aligns'][] = ['flex-start', 'center', 'flex-end', 'baseline', 'stretch' ]
const FLEX_JUSTIFIES: BlockProps['justifies'][] = ['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly']

const CARD_VARIANTS: BlockProps['v'][] = ['column', 'row', 'board']
const LAYOUT_VARIANTS: BlockProps['v'][] = ['columns', 'rows', 'top', 'right', 'bottom', 'left']
const LINE_VARIANTS: BlockProps['v'][] = ['lcr', 'lc', 'cr', 'tcb', 'tc', 'cb', 'grid']
const GRID_VARIANTS: BlockProps['v'][] = [...CARD_VARIANTS, ...LAYOUT_VARIANTS, ...LINE_VARIANTS]
const GRID_ALIGNS: BlockProps['aligns'][] = ['start', 'center', 'end', 'baseline', 'stretch' ]
const GRID_JUSTIFIES: BlockProps['justifies'][] = ['start', 'end', 'center', 'space-between', 'space-around', 'space-evenly']


const meta: Meta<typeof Block> = {
  title: 'Components/Layouts/Block',
  component: Block,
  tags: ['autodocs'],
  argTypes: {
    g: field.size('BlockSpace'),
    p: field.size('BlockSpace'),
    m: field.size('BlockSpace'),
    v: field.variants([...FLEX_VARIANTS, ...GRID_VARIANTS], 'BlockVariant', 'y'),
    justifies: field.variants([...FLEX_JUSTIFIES, ...GRID_JUSTIFIES], 'JustifyContent/JustifyItems'),
    aligns: field.variants([...FLEX_ALIGNS, ...GRID_ALIGNS], 'AlignItems'),
    grow: field.number('FlexGrow'),
    columns: field.number(),
    rows: field.number(),
    template: field.string(),
    cells: field.string(),
    flow: field.string('GridAutoFlow'),
    places: field.string('PlaceItems'),
    areas: field.string('GridTemplateAreas'),
    className: field.string(),
    children: field.reactNode(),
  },
}

export default meta

type Story = StoryObj<typeof Block>

const render = (props: BlockProps) => {
  const v = props?.v ?? 'y'

  return (
    <Block bg='warning-5'>
      {/* prevent margins from collapsing */}
      {props.m && <div style={{ height: '0.5px' }} />}

      <Block minWidth={200} minHeight={200} bg='success-5' {...props}>
        {FLEX_VARIANTS.includes(v) && Array.from(Array(10).keys()).map(idx =>
          <Item
            key={idx}
            minWidth={['xy', 'cards'].includes(v) ? 100 : 20}
            minHeight={20}
            bg='secondary-5'
          />,
        )}

        {([...CARD_VARIANTS, ...LAYOUT_VARIANTS].includes(v)) && ['left', 'right', 'top', 'bottom', 'center'].map(v =>
          <Item
            key={v}
            bg='secondary-5'
            area={props.v && LAYOUT_VARIANTS.includes(props.v) ? v : undefined}
            minHeight={20}
            minWidth={20}
          />,
        )}

        {(LINE_VARIANTS.includes(v)) && Array.from(Array(v.length).keys()).map(v =>
          <Item
            key={v}
            bg='secondary-5'
            minHeight={20}
            minWidth={20}
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

export const Flex: Story = {
  parameters: params('Flex', FLEX_VARIANTS),
  render: () => (
    <Block g='xs' v='board' columns={4}>
      {FLEX_VARIANTS.filter(Boolean).map(v => (
        <Block key={v} bg='success-5' v={v} g='xxs' p='xxs' pos='relative'>
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

          {Array.from(Array(10).keys()).map(idx =>
            <Item
              key={idx}
              minWidth={['xy', 'cards'].includes(v ?? '') ? 50 : 20}
              minHeight={20}
              bg='secondary-5'
            />,
          )}
        </Block>
      ))}
    </Block>
  ),
}


export const Grid: Story = {
  parameters: params('Grid', GRID_VARIANTS),
  render: () => (
    <Block g='xs' v='board' columns={3} pos='relative'>
      {GRID_VARIANTS.filter(Boolean).map(v => (
        <Block key={v} bg='success-5' v={v} g='xxs' p='xxs' columns={v === 'board' ? 2 : undefined} pos='relative'>
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

          {([...CARD_VARIANTS, ...LAYOUT_VARIANTS].includes(v)) && ['left', 'right', 'top', 'bottom', 'center'].map(i =>
            <Item
              key={i}
              bg='secondary-5'
              area={LAYOUT_VARIANTS.includes(v) ? i : undefined}
              minHeight={v && ['x', 'y'].includes(v) ? 20 : 50}
              minWidth={v && ['x', 'y'].includes(v) ? 20 : 50}
            />,
          )}

          {(LINE_VARIANTS.includes(v)) && Array.from(Array(v?.length).keys()).map(v =>
            <Item
              key={v}
              bg='secondary-5'
              minHeight={20}
              minWidth={20}
            />,
          )}
        </Block>
      ))}
    </Block>
  ),
}

export const Spaces: Story = {
  parameters: params('Margin[m] | Padding[p] | Gap[g]', theme.SIZES),
  render,
  args: {
    v: 'cards',
    g: 'xxs',
    m: 'xxs',
    p: 'xxs',
  },
}

export const Justifies: Story = {
  parameters: params('Justify', [...new Set([...FLEX_JUSTIFIES, ...GRID_JUSTIFIES])]),
  render,
  args: {
    v: 'xy',
    g: 'xxs',
    justifies: 'center',
  },
}

export const Aligns: Story = {
  parameters: params('Align', [...new Set([...FLEX_ALIGNS, ...GRID_ALIGNS])]),
  render,
  args: {
    v: 'xy',
    g: 'xxs',
    aligns: 'center',
  },
}
