// eslint-disable-next-line no-restricted-imports
import { field, params } from '../../../../.storybook/tools'
import type { Meta, StoryObj } from '@storybook/react'
import Skeleton, { SkeletonProps } from './Skeleton.component'
import Block from 'components/layouts/Block'

const VARIANTS: SkeletonProps['v'][] = ['text', 'rounded', 'circular']

const meta: Meta<typeof Skeleton> = {
  title: 'Components/Views/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  argTypes: {
    className: field.string(),
    children: field.reactNode(),
    v: field.variants(VARIANTS, 'SkeletonVariant', 'text'),
  },
}

export default meta

type Story = StoryObj<typeof Skeleton>

const initVariants = <P extends keyof SkeletonProps>(prop: P, items: SkeletonProps[P][]) => (
  <Block v='x' g='xxs'>
    {items.map(item => <Skeleton children={item === 'circular' ? 'cir' : item} {...{ [prop]: item }}/>)}
  </Block>
)

export const Demo: Story = {
  parameters: params('Skeleton'),
  args: {
    v: 'text',
    children: 'content to hide',
  },
}

export const Variants: Story = {
  parameters: params('View', VARIANTS),
  render: () => initVariants('v', VARIANTS),
}

