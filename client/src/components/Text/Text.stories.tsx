// eslint-disable-next-line no-restricted-imports
import { field, params } from '../../../.storybook/tool'
import type { Meta, StoryObj } from '@storybook/react'
import Text, { TextProps } from './Text.component'
import Block from 'components/Block'
import { COLORS, SIZES } from 'theme'
import Specs from 'components/Specs'

const ALIGNMENTS: TextProps['align'][] = ['right', 'center', 'left']
const VARIANTS: TextProps['v'][] = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'subtitle1', 'subtitle2', 'body1', 'body2', 'button', 'caption', 'overline']
const TEXT_FORMATS: TextProps['format'][] = ['title', 'capitalize', 'lowercase', 'uppercase']
const NUMBER_FORMATS: TextProps['format'][] = ['weight', 'size', 'currency', 'amount', 'number', 'percent', 'decimal-percent']
const DATE_FORMATS: TextProps['format'][] = ['day', 'day-name', 'month', 'month-name', 'year', 'date', 'day/month/year', 'day-of-month-year']
const FORMATS: TextProps['format'][] = [...TEXT_FORMATS, ...NUMBER_FORMATS, ...DATE_FORMATS]
const CONTENT = Array(4).fill('Lorem ipsum dolor sit amet, consectetur adipiscing elit.').join(' ')

const meta: Meta<typeof Text> = {
  title: 'Components/Views/Text',
  component: Text,
  tags: ['autodocs'],
  argTypes: {
    className: field.string(),
    content: field.reactNode(),
    children: field.reactNode(true),
    size: field.variants(SIZES, 'TextSize', 'md'),
    v: field.variants(VARIANTS, 'TextVariant', 'body1'),
    color: field.variants(COLORS, 'TextColor', 'primary'),
    align: field.variants(ALIGNMENTS, 'TextAlign', 'left'),
    format: field.variants(FORMATS, 'FormatVariant', 'default'),
    placeholder: field.reactNode(),
    ellipsis: field.object('boolean | number'),
    loading: field.boolean(),
  },
}

export default meta

type Story = StoryObj<typeof Text>

const initVariants = <P extends keyof TextProps>(prop: P, items: TextProps[P][]) => (
  <Block minWidth={200}>
    {items.map((item, idx) => <Text key={idx} content={item as string} {...{ [prop]: item }}/>)}
  </Block>
)

export const Demo: Story = {
  parameters: params('Text [Requirements](?path=/docs/requirements-typography--docs)'),
  args: {
    content: CONTENT,
    v: 'body1',
    size: 'md',
    align: 'left',
    color: 'primary',
    ellipsis: false,
    loading: false,
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
  parameters: params('Color', COLORS),
  render: () => initVariants('color', COLORS),
}

export const Alignments: Story = {
  parameters: params('Alignment', ALIGNMENTS),
  render: () => initVariants('align', ALIGNMENTS),
}

export const Formats: Story = {
  parameters: params('To format values according to business [format standards](?path=/docs/requirements-formats--docs), set the `format` prop value. Also custom `placeholder` text can be provided.'),
  render: () => (
    <Block v='cards' g='xl'>
      {[
        ['Text', 'sOmE cOnTeNt', TEXT_FORMATS],
        ['Number', 123_456_789.987_654, NUMBER_FORMATS],
        ['Date', Date.now(), DATE_FORMATS],
      ].map(([name, value, variants], idx) => (
        <Block key={idx}>
          <Text.H5 size='md' content={name} />
          <Specs>
            {(variants as never[]).map((item) =>
              <Specs.Item
                key={item}
                name={item ?? 'with placeholder'}
                content={item && value}
                format={item}
                justifies='end'
                placeholder
              />,
            )}
          </Specs>
        </Block>
      ))}
    </Block>
  ),
}

export const Ellipsis: Story = {
  parameters: params('If `ellipsis` is `true` the text is truncated with ellipsis. Line count can be set via number value of `ellipsis` prop.'),
  args: {
    content: CONTENT,
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
