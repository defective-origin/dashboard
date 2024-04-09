// eslint-disable-next-line no-restricted-imports
import { field, params } from '../../../.storybook/tool'
import type { Meta, StoryObj } from '@storybook/react'
import Tooltip, { TooltipVariant, TooltipProps } from './Tooltip.component'
import Layout from 'components/Layout'

const variants: (TooltipVariant | undefined)[] = [
  'left-start', 'top-end', 'top', 'top-start', 'right-start',
  'left', undefined, undefined, undefined, 'right',
  'left-end', 'bottom-end', 'bottom', 'bottom-start', 'right-end',
]

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  argTypes: {
    className: field.string(),
    children: field.reactNode(),
    content: field.reactNode(true),
    v: field.variants(variants, 'TooltipVariant'),
    open: field.boolean(),
  },
}

export default meta

type Story = StoryObj<typeof Tooltip>

// TODO: [kseniya_boldak] Move to storybook tools
const initVariants = <P extends keyof TooltipProps>(prop: P, items: TooltipProps[P][]) => (
  <Layout direction='xy' gap='xl' padding='xl' justify='space-between' columns={5}>
    {items.map((item) => item
      ? (
        <Tooltip content={`${item} content`} open {...{ [prop]: item }}>
          <div style={{width: 50, height: 50, background: 'darkseagreen' }}/>
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
      <div style={{width: 50, height: 50, background: 'darkseagreen' }}/>
    </Tooltip>
  ),
}

export const Variants: Story = {
  parameters: params('View', variants),
  render: () => initVariants('v', variants),
}

