// eslint-disable-next-line no-restricted-imports
import { field, params } from '../../../.storybook/tool'
import type { Meta, StoryObj } from '@storybook/react'
import Link, { LinkProps } from './Link.component'
import Block from 'components/Block'
import { COLORS, SIZES } from 'theme'
import { ICONS } from 'components/Icon'

const LINK_ICONS = [undefined, ...ICONS]
const LINK_COLORS = COLORS.slice(0, 6)

const meta: Meta<typeof Link> = {
  title: 'Components/ACTIONS/Link',
  component: Link,
  tags: ['autodocs'],
  argTypes: {
    content: field.reactNode(),
    tooltip: field.reactNode(),
    href: field.string(),
    start: field.variants(LINK_ICONS, 'IconVariant'),
    end: field.variants(LINK_ICONS, 'IconVariant'),
    size: field.variants(SIZES, 'LinkSize', 'md'),
    color: field.variants(LINK_COLORS, 'LinkColor', 'primary'),
    active: field.boolean(),
    withIcon: field.boolean(),
    loading: field.boolean(),
    className: field.string(),
    children: field.reactNode(true),
  },
}

export default meta

type Story = StoryObj<typeof Link>

const initVariants = <P extends keyof LinkProps>(prop: P, items: LinkProps[P][]) => (
  <Block minWidth={200} g='xs' v='x' aligns='center'>
    {items.map((item, idx) => <Link key={idx} start='settings' content={item as string} end='close' size='xs' {...{ [prop]: item }}/>)}
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
    loading: false,
    start: 'settings',
    href: 'https://google.com',
    active: false,
    withIcon: true,
  },
}

export const Sizes: Story = {
  parameters: params('Size', SIZES),
  render: () => initVariants('size', SIZES),
}

export const Colors: Story = {
  parameters: params('Color', LINK_COLORS),
  render: () => initVariants('color', LINK_COLORS),
}

export const Loading: Story = {
  parameters: params('If `loading` is `true` the Skeleton component is shown.'),
  args: {
    content: 'content to hide',
    loading: true,
  },
}

export const Redirect: Story = {
  parameters: params('If link is not belongs to current app or has blank flag then show `redirect icon`.'),
  render: () => (
    <Block minWidth={200} g='xs' aligns='center'>
      {
        [
          { variant: 'link', href: '/localhost:5173/', withIcon: true },
          { variant: 'link', content: 'http://localhost:5173/', href: 'http://localhost:5173/' },
          { variant: 'link', content: 'localhost:5173/', href: 'localhost:5173/' },
          { variant: 'link', content: '/localhost:5173/', href: '/localhost:5173/' },
          { variant: 'link', content: '/localhost:5173/', href: '/localhost:5173/', target: '_blank' },
          { variant: 'link', content: 'https://google.com', href: 'https://google.com' },
          { variant: 'link', content: 'google.com', href: 'google.com' },
          { variant: 'link', content: '/google.com', href: '/google.com' },
        ].map((props, idx) => <Link key={idx} size='xs' {...props as LinkProps}/>)
      }
    </Block>
  ),
}
