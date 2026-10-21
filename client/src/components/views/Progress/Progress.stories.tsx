import { Meta, StoryObj, field, params } from 'storybook'
import { COLORS, SIZES } from 'theme'
import Block from 'components/layouts/Block'
import Progress, { ProgressProps } from './Progress.component'


const meta: Meta<typeof Progress> = {
  title: 'Components/Views/Progress',
  component: Progress,
  tags: ['autodocs'],
  argTypes: {
    size: field.variants(SIZES, 'Size'),
    color: field.variants(COLORS, 'Color'),
    className: field.string(),
  },
}

export default meta

type Story = StoryObj<typeof Progress>

const initVariants = <P extends keyof ProgressProps>(prop: P, items: ProgressProps[P][]) => (
  <Block v='x' g='xxs'>
    {items.map(item => <Progress size='lg' {...{ [prop]: item }}/>)}
  </Block>
)

export const Demo: Story = {
  parameters: params('Skeleton'),
  args: {
    size: 'sm',
    color: 'secondary',
  },
}

export const Sizes: Story = {
  parameters: params('Size', SIZES),
  render: () => initVariants('size', SIZES),
}

export const Colors: Story = {
  parameters: params('Color', COLORS),
  render: () => initVariants('color', COLORS),
}
