/* eslint-disable no-restricted-imports */
import { field, params } from '../../../.storybook/tool'
import type { Meta, StoryObj } from '@storybook/react'
import Divider, { DividerProps } from './Divider.component'
import Block from 'components/Block'

const VARIANTS: DividerProps['v'][] = ['x', 'y']

const meta: Meta<typeof Divider> = {
  title: 'Components/Layouts/Divider',
  component: Divider,
  tags: ['autodocs'],
  argTypes: {
    className: field.string(),
    content: field.reactNode(),
    children: field.reactNode(),
    v: field.variants(VARIANTS, 'DividerVariant'),
  },
}

export default meta

type Story = StoryObj<typeof Divider>

const render = (props: DividerProps) => (
  <Block
    width={300}
    height={300}
    justifies={props.v === 'x' ? 'center' : undefined}
    aligns={props.v === 'y' ? 'center' : undefined}
  >
    <Divider {...props} />
  </Block>
)

export const Demo: Story = {
  parameters: params('Divider'),
  render,
  args: {
    content: 'Text',
    v: 'y',
  },
}

export const Variants: Story = {
  parameters: params('View', VARIANTS),
  render: () => (
    <Block>
      {VARIANTS.map((v) => render({ v, content: 'Text', format: 'uppercase' }))}
    </Block>
  ),
}
