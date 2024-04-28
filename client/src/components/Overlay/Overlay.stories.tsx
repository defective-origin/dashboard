// eslint-disable-next-line no-restricted-imports
import { SB_CSS, field, params } from '../../../.storybook/tool'
import type { Meta, StoryObj } from '@storybook/react'
import Item from 'components/Item'
import Block from 'components/Block'
import Overlay, { OverlayProps } from './Overlay.component'

const SIDE_VARIANTS: OverlayProps['v'][] = ['left', 'right', 'top', 'bottom']
const SIDE_CERNER_VARIANTS: OverlayProps['v'][] = ['left-center', 'right-center', 'top-center', 'bottom-center']
const CERNER_VARIANTS: OverlayProps['v'][] = ['top-left', 'top-right', 'bottom-left', 'bottom-right']
const CENTER_VARIANTS: OverlayProps['v'][] = ['center', 'full']
const VARIANTS: OverlayProps['v'][] = [...SIDE_VARIANTS, ...SIDE_CERNER_VARIANTS, ...CERNER_VARIANTS, ...CENTER_VARIANTS]

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
    v: field.variants(VARIANTS, 'OverlayVariant'),
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
  <Block width={400} height={400} border={SB_CSS.border}>
    <Overlay {...props}>
      <Item stretch background={SB_CSS.item} minWidth={50} minHeight={50} />
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
  parameters: params('View', VARIANTS),
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
