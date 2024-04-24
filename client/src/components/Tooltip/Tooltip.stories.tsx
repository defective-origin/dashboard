// eslint-disable-next-line no-restricted-imports
import { field, params } from '../../../.storybook/tool'
import type { Meta, StoryObj } from '@storybook/react'
import Tooltip, { TooltipProps } from './Tooltip.component'
import Layout from 'components/Layout'

const variants: TooltipProps['v'][] = [
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
    v: field.variants(variants, 'TooltipVariant'),
    open: field.boolean(),
  },
}

export default meta

type Story = StoryObj<typeof Tooltip>

const initVariants = <P extends keyof TooltipProps>(prop: P, items: TooltipProps[P][]) => (
  <Layout g='xl' p='xl' justify='space-between' columns={5}>
    {items.map((item) => item
      ? (
        <Tooltip content={`${item} content`} open {...{ [prop]: item }}>
          <div style={{width: 50, height: 50, background: 'var(--sb-item-color)' }}/>
        </Tooltip>
      )
      : <div />,
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
      <div style={{width: 50, height: 50, background: 'var(--sb-item-color)' }}/>
    </Tooltip>
  ),
}

export const Variants: Story = {
  parameters: params('View', variants),
  render: () => initVariants('v', variants),
}

