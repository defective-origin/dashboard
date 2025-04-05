// eslint-disable-next-line no-restricted-imports
import { SB_CSS, field, params } from '../../../../.storybook/tool'
import type { Meta, StoryObj } from '@storybook/react'
import Block from 'components/layouts/Block'
import Scroll, { ScrollProps } from './Scroll.component'
import { DIRECTION, SIZES } from 'theme'

const meta: Meta<typeof Scroll> = {
  title: 'Components/Layouts/Scroll',
  component: Scroll,
  tags: ['autodocs'],
  argTypes: {
    className: field.string(),
    thumbClassName: field.string(),
    backClassName: field.string(),
    trackClassName: field.string(),
    cernerClassName: field.string(),
    actionsClassName: field.string(),
    children: field.reactNode(),
    visible: field.boolean(),
    indent: field.number('Margin', 2),
    v: field.variants(DIRECTION, 'ScrollVariant', 'y'),
    size: field.variants(SIZES, 'ScrollBarSize', 'md'),
    container: field.element(),
    actions: field.object('Offset'),
    back: field.object('Offset'),
  },
}

export default meta

type Story = StoryObj<typeof Scroll>

const render = (props: ScrollProps) => (
  <Block v='x' width={300} height={300} border={SB_CSS.border}>
    <Scroll children='Scroll overlay content' {...props}/>
    <Block minWidth={1000} minHeight={1000} />
  </Block>
)

export const Demo: Story = {
  parameters: params('Scroll'),
  render,
  args: {
    v: 'xy',
    size: 'md',
    children: 'Scroll overlay content',
    back: false,
    visible: false,
    actions: true,
    indent: 4,
  },
}

export const Variants: Story = {
  parameters: params('View', DIRECTION),
  render,
  args: {
    v: 'xy',
    children: 'Scroll overlay content',
  },
}

export const Sizes: Story = {
  parameters: params('View', SIZES),
  render,
  args: {
    v: 'xy',
    children: 'Scroll overlay content',
  },
}

