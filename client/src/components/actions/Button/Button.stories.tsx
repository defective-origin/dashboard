import { Meta, StoryObj, field, params, theme } from 'storybook'
import Block from 'components/layouts/Block'
import Button, { ButtonProps } from './Button.component'
import { ICONS } from 'components/views/Icon'
import { ButtonVariant } from './Button.hooks'

const BUTTON_ICONS = [undefined, ...ICONS]
const BUTTON_COLORS = theme.COLORS
const VARIANTS: ButtonVariant[] = ['text', 'outlined', 'filled', 'wrapper']

const meta: Meta<typeof Button> = {
  title: 'Components/Actions/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    content: field.reactNode(),
    tooltip: field.reactNode(),
    start: field.variants(BUTTON_ICONS, 'IconVariant'),
    end: field.variants(BUTTON_ICONS, 'IconVariant'),
    size: field.size('ButtonSize', 'md'),
    v: field.variants(VARIANTS, 'ButtonVariant', 'outlined'),
    color: field.variants(BUTTON_COLORS, 'ButtonColor', 'primary'),
    active: field.boolean(),
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
  parameters: params('Size', theme.SIZES),
  render: () => initVariants('size', theme.SIZES),
}

export const Colors: Story = {
  parameters: params('Color', BUTTON_COLORS),
  render: () => initVariants('color', BUTTON_COLORS),
}
