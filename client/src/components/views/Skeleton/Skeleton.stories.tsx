import { Meta, StoryObj, field, params } from 'storybook'
import Block from 'components/layouts/Block'
import Skeleton, { SkeletonProps } from './Skeleton.component'


const VARIANTS: SkeletonProps['v'][] = [undefined, 'text', 'block', 'round']

const meta: Meta<typeof Skeleton> = {
  title: 'Components/Views/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  argTypes: {
    v: field.variants(VARIANTS, 'SkeletonVariant', 'text'),
    count: field.number(),
    width: field.number(),
    height: field.number(),
    className: field.string(),
    children: field.reactNode(),
  },
}

export default meta

type Story = StoryObj<typeof Skeleton>

const initVariants = <P extends keyof SkeletonProps>(prop: P, items: SkeletonProps[P][]) => (
  <Block v='x' g='xxs' aligns='center'>
    {items.map(item =>
      <Skeleton
        children={item === 'round' ? '' : item}
        width={item === 'round' ? 50 : 100}
        height={item === 'round' ? 50 : 20}
        {...{ [prop]: item }}/>)
    }
  </Block>
)

export const Demo: Story = {
  parameters: params('Skeleton'),
  args: {
    count: 1,
    width: 100,
    height: 20,
    children: 'content to hide',
  },
}

export const Variants: Story = {
  parameters: params('View', VARIANTS),
  render: () => initVariants('v', VARIANTS),
}

