// eslint-disable-next-line no-restricted-imports
import { field, params } from '../../../.storybook/tool'
import type { Meta, StoryObj } from '@storybook/react'
import Icon, { IconProps, IconSize, IconVariant } from './Icon.component'
import Block from 'components/Block'

const sizes: IconSize[] = ['xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl']
const variants: IconVariant[] = ['light_mode', 'dark_mode', 'paid', 'language', 'login', 'logout', 'developer_mode_tv',
  'tv', 'person', 'person_add', 'account_circle', 'support_agent', 'dashboard', 'insert_chart', 'keyboard', 'keyboard_arrow_up',
  'keyboard_arrow_left', 'auto_stories', 'logo_dev', 'settings', 'close', 'left_panel_open', 'left_panel_close', 'open_in_new',
  'info', 'warning', 'error', 'check_circle']

const meta: Meta<typeof Icon> = {
  title: 'Components/DATA DISPLAY/Icon',
  component: Icon,
  tags: ['autodocs'],
  argTypes: {
    className: field.string(),
    size: field.variants(sizes, 'IconSize', 'md'),
    v: field.variants(variants, 'IconVariant'),
    fill: field.boolean(),
    loading: field.boolean(),
  },
}

export default meta

type Story = StoryObj<typeof Icon>

const initVariants = <P extends keyof IconProps>(prop: P, items: IconProps[P][]) => (
  <Block v='xy' g='sm'>
    {items.map((item) => <Icon v='settings' size='xl' {...{ [prop]: item }} />)}
  </Block>
)

export const Demo: Story = {
  parameters: params('Icon'),
  args: {
    v: 'settings',
    size: 'md',
    fill: false,
    loading: false,
    className: '',
  },
}

export const Fill: Story = {
  parameters: params('By default Icon is `outlined`. To make it `filled` pass `fill` prop as `true`.'),
  render: () => initVariants('fill', [false, true]),
}

export const Sizes: Story = {
  parameters: params('Size', sizes, 'md'),
  render: () => initVariants('size', sizes),
}

export const Loading: Story = {
  parameters: params('If `loading` is `true` the Skeleton component is shown.'),
  args: {
    v: 'light_mode',
    loading: true,
  },
}
