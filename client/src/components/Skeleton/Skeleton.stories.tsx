// eslint-disable-next-line no-restricted-imports
import { field, params } from '../../../.storybook/tool'
import type { Meta, StoryObj } from '@storybook/react'
import Skeleton, { SkeletonProps, SkeletonVariant } from './Skeleton.component'
import Block from 'components/Block'

const variants: SkeletonVariant[] = ['text', 'rounded', 'circular']

const meta: Meta<typeof Skeleton> = {
  title: 'Components/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  argTypes: {
    className: field.string(),
    children: field.reactNode(),
    content: field.reactNode(true),
    v: field.variants(variants, 'SkeletonVariant', 'text'),
  },
}

export default meta

type Story = StoryObj<typeof Skeleton>

// TODO: [kseniya_boldak] Move to storybook tools
const initVariants = <P extends keyof SkeletonProps>(prop: P, items: SkeletonProps[P][]) => (
  <Block direction='x' gap='xxs'>
    {items.map((item) => <Skeleton content={item} {...{ [prop]: item }}/>)}
  </Block>
)

export const Demo: Story = {
  parameters: params('Skeleton'),
  args: {
    v: 'text',
    content: 'content to hide',
  },
}

export const Variants: Story = {
  parameters: params('View', variants),
  render: () => initVariants('v', variants),
}

