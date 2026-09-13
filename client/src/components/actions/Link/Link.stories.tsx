import { Meta, StoryObj, field, params, theme } from 'storybook'
import Block from 'components/layouts/Block'
import { ICONS } from 'components/views/Icon'
import Link, { LinkProps } from './Link.component'

const LINK_ICONS = [undefined, ...ICONS]
const LINK_COLORS = theme.COLORS.slice(0, 6)

const meta: Meta<typeof Link> = {
  title: 'Components/Actions/Link',
  component: Link,
  tags: ['autodocs'],
  argTypes: {
    content: field.reactNode(),
    tooltip: field.reactNode(),
    href: field.string(),
    start: field.variants(LINK_ICONS, 'IconVariant'),
    end: field.variants(LINK_ICONS, 'IconVariant'),
    size: field.size('LinkSize', 'md'),
    color: field.variants(LINK_COLORS, 'LinkColor', 'primary'),
    active: field.boolean(),
    className: field.string(),
    children: field.reactNode(true),
  },
}

export default meta

type Story = StoryObj<typeof Link>

const initVariants = <P extends keyof LinkProps>(prop: P, items: LinkProps[P][]) => (
  <Block minWidth={200} g='xs' v='x' aligns='center'>
    {items.map((item, idx) => <Link key={idx} v='outlined' start='settings' content={item as string} end='close' size='xs' {...{ [prop]: item }}/>)}
  </Block>
)

export const Demo: Story = {
  parameters: params('Link'),
  args: {
    content: 'CONTENT',
    tooltip: 'TOOLTIP',
    v: 'outlined',
    size: 'md',
    color: 'primary',
    start: 'settings',
    href: 'https://google.com',
    active: false,
  },
}

export const Sizes: Story = {
  parameters: params('Size', theme.SIZES),
  render: () => initVariants('size', theme.SIZES),
}

export const Colors: Story = {
  parameters: params('Color', LINK_COLORS),
  render: () => initVariants('color', LINK_COLORS),
}
