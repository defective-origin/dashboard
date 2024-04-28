// eslint-disable-next-line no-restricted-imports
import { field, params } from '../../../.storybook/tool'
import type { Meta, StoryObj } from '@storybook/react'
import Skeleton, { SkeletonProps } from './Skeleton.component'
import Block from 'components/Block'

const VARIANTS: SkeletonProps['v'][] = ['text', 'rounded', 'circular']

const meta: Meta<typeof Skeleton> = {
  title: 'Components/DATA DISPLAY/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  argTypes: {
    className: field.string(),
    children: field.reactNode(),
    content: field.reactNode(true),
    v: field.variants(VARIANTS, 'SkeletonVariant', 'text'),
  },
}

export default meta

type Story = StoryObj<typeof Skeleton>

const initVariants = <P extends keyof SkeletonProps>(prop: P, items: SkeletonProps[P][]) => (
  <Block v='x' g='xxs'>
    {items.map((item) => <Skeleton content={item === 'circular' ? 'cir' : item} {...{ [prop]: item }}/>)}
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
  parameters: params('View', VARIANTS),
  render: () => initVariants('v', VARIANTS),
}

