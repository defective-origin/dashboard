// eslint-disable-next-line no-restricted-imports
import { SB_CSS, field, params } from '../../../.storybook/tool'
import type { Meta, StoryObj } from '@storybook/react'
import Tooltip, { TooltipProps } from './Tooltip.component'
import Layout from 'components/Layout'
import Item from 'components/Item'

const VARIANTS: TooltipProps['v'][] = [
  'left-start', 'top-end', 'top', 'top-start', 'right-start',
  'left', undefined, undefined, undefined, 'right',
  'left-end', 'bottom-end', 'bottom', 'bottom-start', 'right-end',
]

const meta: Meta<typeof Tooltip> = {
  title: 'Components/POPUP/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  argTypes: {
    className: field.string(),
    children: field.reactNode(true),
    content: field.reactNode(),
    v: field.variants(VARIANTS, 'TooltipVariant'),
    open: field.boolean(),
  },
}

export default meta

type Story = StoryObj<typeof Tooltip>

const initVariants = <P extends keyof TooltipProps>(prop: P, items: TooltipProps[P][]) => (
  <Layout g='xl' p='xl' justify='space-between' columns={5}>
    {items.map((item, idx) => item
      ? (
        <Tooltip key={idx} content={`${item} content`} open {...{ [prop]: item }}>
          <Item width={50} height={50} background={SB_CSS.item} />
        </Tooltip>
      )
      : <div key={idx} />,
    )}
  </Layout>

)

export const Demo: Story = {
  parameters: params('Tooltip'),
  args: {
    content: 'Default',
    open: true,
    v: 'bottom',
  },
  render: (args) => (
    <Tooltip open content='Default' {...args}>
      <Item width={50} height={50} background={SB_CSS.item} />
    </Tooltip>
  ),
}

export const Variants: Story = {
  parameters: params('View', VARIANTS),
  render: () => initVariants('v', VARIANTS),
}

