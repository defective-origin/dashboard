import { Meta, StoryObj, field, params, theme } from 'storybook'
import Block from 'components/layouts/Block'
import Icon, { IconProps } from './Icon.component'
import { ICONS } from './Icon.constants'

const meta: Meta<typeof Icon> = {
  title: 'Components/Views/Icon',
  component: Icon,
  tags: ['autodocs'],
  argTypes: {
    className: field.string(),
    size: field.size('IconSize', 'md'),
    color: field.variants(theme.COLORS, 'IconColor', 'primary'),
    v: field.variants(ICONS, 'IconVariant'),
    fill: field.boolean(),
    loading: field.boolean(),
  },
}

export default meta

type Story = StoryObj<typeof Icon>

const initVariants = <P extends keyof IconProps>(prop: P, items: IconProps[P][]) => (
  <Block v='xy' g='sm'>
    {items.map((item, idx) => <Icon key={idx} v='settings' size='xl' {...{ [prop]: item }} />)}
  </Block>
)

export const Demo: Story = {
  parameters: params('The Demo variant of the Icon component. [All Icon list](?path=/docs/requirements-iconography--docs)'),
  args: {
    v: 'settings',
    size: 'md',
    color: 'primary',
    fill: false,
    loading: false,
  },
}

export const Highlight: Story = {
  parameters: params('By default Icon is `outlined`. To make it `filled` pass `fill` prop as `true`.'),
  render: () => initVariants('fill', [false, true]),
}

export const Sizes: Story = {
  parameters: params('Size', theme.SIZES, 'md'),
  render: () => initVariants('size', theme.SIZES),
}

export const Colors: Story = {
  parameters: params('Color', theme.COLORS, 'primary'),
  render: () => initVariants('color', theme.COLORS),
}

export const Loading: Story = {
  parameters: params('If `loading` is `true` the Skeleton component is shown.'),
  args: {
    v: 'light_mode',
    loading: true,
  },
}
