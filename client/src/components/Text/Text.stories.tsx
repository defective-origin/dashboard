// eslint-disable-next-line no-restricted-imports
import { field, params } from '../../../.storybook/tool'
import type { Meta, StoryObj } from '@storybook/react'
import Text, { TextProps } from './Text.component'
import Block from 'components/Block'

const alignments: TextProps['align'][] = ['right', 'center', 'left']
const variants: TextProps['v'][] = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'subtitle1', 'subtitle2', 'body1', 'body2', 'button', 'caption', 'overline']
const sizes: TextProps['size'][] = ['xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']
const colors: TextProps['color'][] = ['primary', 'secondary', 'success', 'info', 'warning', 'error', 'disable']
const textFormats: TextProps['format'][] = [undefined, 'uppercase', 'lowercase', 'capitalize', 'title']
const numberFormats: TextProps['format'][] = [undefined, 'number', 'amount', 'percent', 'decimal-percent', 'currency', 'size', 'weight']
const dateFormats: TextProps['format'][] = [undefined, 'date', 'day', 'month', 'year', 'day/month/year', 'day-of-month-year', 'day-name', 'month-name']
const formats: TextProps['format'][] = [...textFormats, ...numberFormats, ...dateFormats]
const content = 'Text '.repeat(50)

const meta: Meta<typeof Text> = {
  title: 'Components/DATA DISPLAY/Text',
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
    format: field.variants(formats, 'FormatVariant', 'default'),
    placeholder: field.reactNode(),
    ellipsis: field.object('boolean | number'),
    loading: field.boolean(),
  },
}

export default meta

type Story = StoryObj<typeof Text>

const initVariants = <P extends keyof TextProps>(prop: P, items: TextProps[P][]) => (
  <Block minWidth={200}>
    {items.map((item) => <Text content={item} {...{ [prop]: item }}/>)}
  </Block>
)

export const Demo: Story = {
  parameters: params('Text'),
  args: {
    content,
    v: 'body1',
    size: 'md',
    align: 'left',
    color: 'primary',
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

export const Formats: Story = {
  parameters: params('To format values according to business (format standards)[./?path=/docs/formats--docs], set the `format` prop value.'),
  args: {
    content: 123_456_789.987_654,
    format: 'currency',
  },
}

export const Ellipsis: Story = {
  parameters: params('If `ellipsis` is `true` the text is truncated with ellipsis. Line count can be set via number value of `ellipsis` prop.'),
  args: {
    content: content,
    ellipsis: 2,
  },
}

export const Loading: Story = {
  parameters: params('If `loading` is `true` the Skeleton component is shown.'),
  args: {
    content: 'content to hide',
    loading: true,
  },
}
