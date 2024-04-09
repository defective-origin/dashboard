// eslint-disable-next-line no-restricted-imports
import { field, params } from '../../../.storybook/tool'
import type { Meta, StoryObj } from '@storybook/react'
import Block, { BlockProps } from './Block.component'
import { BlockSpace, BlockDirection } from './Block.hook'

const direction: BlockDirection[] = ['x', 'y', 'xy']
const spaces: BlockSpace[] = ['xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl']
const aligns: BlockProps['align'][] = ['flex-start', 'center', 'flex-end', 'baseline', 'stretch' ]
const justifies: BlockProps['justify'][] = ['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly']

const meta: Meta<typeof Block> = {
  title: 'Components/Block',
  component: Block,
  tags: ['autodocs'],
  argTypes: {
    className: field.string(),
    children: field.reactNode(),
    content: field.reactNode(true),
    gap: field.variants(spaces, 'BlockSpace'),
    padding: field.variants(spaces, 'BlockSpace'),
    margin: field.variants(spaces, 'BlockSpace'),
    direction: field.variants(direction, 'BlockDirection'),
    justify: field.variants(justifies, 'JustifyContent'),
    align: field.variants(aligns, 'AlignItems'),
    stretch: field.boolean(),
    grow: field.number('FlexGrow'),
    style: field.css(),
  },
}

export default meta

type Story = StoryObj<typeof Block>

const demoVariant = (props: BlockProps) => {
  const direction = props?.direction ?? 'y'

  return (
    <div style={{ background: '#f9cc9d' }}>
      {props.margin && <div style={{ height: '0.5px' }} />}

      <Block style={{ background: '#c3d08b', minWidth: 200, minHeight: 200 }} {...props}>
        {Array.from(Array(10).keys()).map(() =>
          <div
            style={{
              background: 'gray',
              minWidth: direction === 'xy' ? 100 : 20,
              minHeight: direction === 'xy' ? 100 : 20,
              flex: 1,
            }}
          />,
        )}
      </Block>

      {props.margin && <div style={{ height: '0.5px' }} />}
    </div>
  )
}

export const Demo: Story = {
  parameters: params('Block'),
  render: demoVariant,
  args: {
    direction: 'xy',
    gap: 'xxs',
    margin: 'xxs',
    padding: 'xxs',
    stretch: false,
  },
}

export const Direction: Story = {
  parameters: params('Direction', direction),
  render: demoVariant,
  args: {
    direction: 'xy',
    gap: 'xs',
  },
}

export const Gap: Story = {
  parameters: params('Gap', spaces),
  render: demoVariant,
  args: {
    direction: 'xy',
    gap: 'sm',
  },
}

export const Padding: Story = {
  parameters: params('Padding', spaces),
  render: demoVariant,
  args: {
    direction: 'xy',
    gap: 'sm',
    padding: 'sm',
  },
}

export const Margin: Story = {
  parameters: params('Margin', spaces),
  render: demoVariant,
  args: {
    direction: 'xy',
    gap: 'sm',
    margin: 'sm',
    padding: 'sm',
  },
}

export const Justify: Story = {
  parameters: params('Justify', justifies),
  render: demoVariant,
  args: {
    direction: 'x',
    gap: 'xs',
    justify: 'space-between',
  },
}

export const Align: Story = {
  parameters: params('Align', aligns),
  render: demoVariant,
  args: {
    direction: 'x',
    gap: 'xs',
    align: 'center',
  },
}
