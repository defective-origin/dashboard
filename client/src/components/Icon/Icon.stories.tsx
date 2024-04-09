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
  title: 'Components/Icon',
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

// TODO: [kseniya_boldak] Move to storybook tools
const initVariants = <P extends keyof IconProps>(prop: P, items: IconProps[P][], fill?: boolean) => (
  <Block direction='xy' gap='sm' style={{ minWidth: 200 }}>
    {items.map((item) => <Icon v='light_mode' fill={fill} size='xl' {...{ [prop]: item }} />)}
  </Block>
)

export const Demo: Story = {
  parameters: params('Text'),
  args: {
    v: 'settings',
    size: 'md',
    fill: false,
    loading: false,
    className: '',
  },
}

export const OutlinedVariants: Story = {
  parameters: params('The `outlined` variants of the Icon component.'),
  render: () => initVariants('v', variants),
}

export const FilledVariants: Story = {
  parameters: params('The `filled` variants of the Icon component.'),
  render: () => initVariants('v', variants, true),
}

export const Sizes: Story = {
  parameters: params('Size', sizes),
  render: () => initVariants('size', sizes),
}

export const Loading: Story = {
  parameters: params('If `loading` is `true` the Skeleton component is shown.'),
  args: {
    v: 'light_mode',
    loading: true,
  },
  render: (args) => <Icon {...args} />,
}
