// eslint-disable-next-line no-restricted-imports
import { field, params } from '../../../.storybook/tool'
import type { Meta, StoryObj } from '@storybook/react'
import Item from 'components/Item'
import Block from 'components/Block'
import Overlay, { OverlayProps } from './Overlay.component'

const sideVariant: OverlayProps['v'][] = ['left', 'right', 'top', 'bottom']
const sideCernerVariant: OverlayProps['v'][] = ['left-center', 'right-center', 'top-center', 'bottom-center']
const cernerVariant: OverlayProps['v'][] = ['top-left', 'top-right', 'bottom-left', 'bottom-right']
const centerVariant: OverlayProps['v'][] = ['center', 'full']
const variants: OverlayProps['v'][] = [undefined, ...sideVariant, ...sideCernerVariant, ...cernerVariant, ...centerVariant]

const meta: Meta<typeof Overlay> = {
  title: 'Components/LAYOUT/Overlay',
  // throws ref error if we pass as 'component: Overlay'
  component: (props) => <Overlay {...props} />,
  tags: ['autodocs'],
  argTypes: {
    className: field.string(),
    contentClassName: field.string(),
    containerClassName: field.string(),
    children: field.reactNode(),
    v: field.variants(variants, 'OverlayVariant'),
    window: field.boolean(),
    backdrop: field.boolean(),
    width: field.number('Width'),
    height: field.number('Height'),
    indent: field.number('Margin'),
    container: field.element(),
  },
}

export default meta

type Story = StoryObj<typeof Overlay>

const render = (props: OverlayProps) => (
  <Block width={400} height={400} border='1px solid var(--sb-border-color)'>
    <Overlay {...props}>
      <Item stretch background='var(--sb-item-color)' minWidth={50} minHeight={50} />
    </Overlay>
  </Block>
)

export const Demo: Story = {
  parameters: params('Overlay'),
  render,
  args: {
    v: 'center',
    window: false,
    backdrop: false,
  },
}

export const Variants: Story = {
  parameters: params('Variant', variants),
  render,
  args: {
    v: 'center',
  },
}

export const Position: Story = {
  parameters: params('Position'),
  render,
  args: {
    v: 'center',
    window: true,
  },
}

export const Backdrop: Story = {
  parameters: params('Backdrop'),
  render,
  args: {
    v: 'center',
    backdrop: true,
  },
}

export const Size: Story = {
  parameters: params('Size'),
  render,
  args: {
    v: 'center',
    width: 300,
    height: 300,
  },
}

export const Indent: Story = {
  parameters: params('Indent'),
  render,
  args: {
    v: 'center',
    indent: 10,
  },
}
