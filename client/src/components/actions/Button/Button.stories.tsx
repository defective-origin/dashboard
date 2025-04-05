// eslint-disable-next-line no-restricted-imports
import { field, params } from '../../../../.storybook/tool'
import type { Meta, StoryObj } from '@storybook/react'
import Button, { ButtonProps } from './Button.component'
import Block from 'components/layouts/Block'
import { COLORS, SIZES } from 'theme'
import { ICONS } from 'components/views/Icon'

const BUTTON_ICONS = [undefined, ...ICONS]
const BUTTON_COLORS = COLORS.slice(0, 6)
const VARIANTS: ButtonProps['v'][] = ['text', 'outlined', 'contained']

const meta: Meta<typeof Button> = {
  title: 'Components/Actions/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    content: field.reactNode(),
    tooltip: field.reactNode(),
    start: field.variants(BUTTON_ICONS, 'IconVariant'),
    end: field.variants(BUTTON_ICONS, 'IconVariant'),
    size: field.variants(SIZES, 'ButtonSize', 'md'),
    v: field.variants(VARIANTS, 'ButtonVariant', 'body1'),
    color: field.variants(BUTTON_COLORS, 'ButtonColor', 'primary'),
    active: field.boolean(),
    loading: field.boolean(),
    className: field.string(),
    children: field.reactNode(true),
  },
}

export default meta

type Story = StoryObj<typeof Button>

const initVariants = <P extends keyof ButtonProps>(prop: P, items: ButtonProps[P][]) => (
  <Block minWidth={200} g='xs' v='x' aligns='center'>
    {items.map((item, idx) => <Button key={idx} start='settings' content={item as string} end='close' v='outlined' size='xs' {...{ [prop]: item }}/>)}
  </Block>
)

export const Demo: Story = {
  parameters: params('Button'),
  args: {
    content: 'CONTENT',
    tooltip: 'TOOLTIP',
    v: 'outlined',
    size: 'md',
    color: 'primary',
    loading: false,
    start: 'settings',
    end: 'close',
    active: false,
  },
}

export const Variants: Story = {
  parameters: params('View', VARIANTS),
  render: () => initVariants('v', VARIANTS),
}

export const Sizes: Story = {
  parameters: params('Size', SIZES),
  render: () => initVariants('size', SIZES),
}

export const Colors: Story = {
  parameters: params('Color', BUTTON_COLORS),
  render: () => initVariants('color', BUTTON_COLORS),
}

export const Loading: Story = {
  parameters: params('If `loading` is `true` the Skeleton component is shown.'),
  args: {
    content: 'content to hide',
    loading: true,
  },
}
