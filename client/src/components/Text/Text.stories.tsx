// eslint-disable-next-line no-restricted-imports
import { field, params } from '../../../.storybook/tool'
import type { Meta, StoryObj } from '@storybook/react'
import Text, { TextVariant, TextSize, TextColor, TextAlign, TextProps } from './Text.component'
import Block from 'components/Block'

const variants: TextVariant[] = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'subtitle1', 'subtitle2', 'body1', 'body2', 'button', 'caption', 'overline']
const sizes: TextSize[] = ['xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl']
const colors: TextColor[] = ['primary', 'secondary', 'success', 'info', 'warning', 'error', 'disable']
const alignments: TextAlign[] = ['right', 'center', 'left']
const multiline = 'multiline '.repeat(100)

const meta: Meta<typeof Text> = {
  title: 'Components/Text',
  component: Text,
  tags: ['autodocs'],
  argTypes: {
    className: field.string(),
    content: field.reactNode(),
    children: field.reactNode(true),
    size: field.variants(sizes, 'TextSize', 'md'),
    v: field.variants(variants, 'TextVariant', 'body1'),
    color: field.variants(colors, 'TextColor', 'primary'),
    align: field.variants(alignments, 'TextAlign', 'left'),
    multiline: field.boolean(),
    ellipsis: field.boolean(),
    loading: field.boolean(),
  },
}

export default meta

type Story = StoryObj<typeof Text>

// TODO: [kseniya_boldak] Move to storybook tools
const initVariants = <P extends keyof TextProps>(prop: P, items: TextProps[P][]) => (
  <Block style={{ minWidth: 200 }}>
    {items.map((item) => <Text content={item} {...{ [prop]: item }}/>)}
  </Block>
)

export const Demo: Story = {
  parameters: params('Text'),
  args: {
    content: 'Text',
    v: 'body1',
    size: 'md',
    align: 'left',
    color: 'primary',
    multiline: false,
    ellipsis: false,
    loading: false,
  },
}

export const Variants: Story = {
  parameters: params('View', variants),
  render: () => initVariants('v', variants),
}

export const Sizes: Story = {
  parameters: params('Size', sizes),
  render: () => initVariants('size', sizes),
}

export const Colors: Story = {
  parameters: params('Color', colors),
  render: () => initVariants('color', colors),

}

export const Alignments: Story = {
  parameters: params('Alignment', alignments),
  render: () => initVariants('align', alignments),
}

export const Multiline: Story = {
  parameters: params('By default one line text is shown. If multiline is needed - set `multiline` flag as `true`.'),
  args: {
    content: multiline,
    multiline: true,
  },
}

export const Ellipsis: Story = {
  parameters: params('If `ellipsis` is `true` the text is truncated with ellipsis.'),
  args: {
    content: multiline,
    ellipsis: true,
    multiline: true,
  },
}

export const Loading: Story = {
  parameters: params('If `loading` is `true` the Skeleton component is shown.'),
  args: {
    content: 'content to hide',
    loading: true,
  },
}
