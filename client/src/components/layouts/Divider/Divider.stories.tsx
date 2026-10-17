import { Meta, StoryObj, field, params } from 'storybook'
import Block from 'components/layouts/Block'
import Divider, { DividerProps } from './Divider.component'

const VARIANTS: DividerProps['v'][] = ['x', 'x-start', 'x-center', 'x-end', 'y', 'y-start', 'y-center', 'y-end']

const meta: Meta<typeof Divider> = {
  title: 'Components/Layouts/Divider',
  component: Divider,
  tags: ['autodocs'],
  argTypes: {
    v: field.variants(VARIANTS, 'DividerVariant'),
    content: field.reactNode(),
    className: field.string(),
  },
}

export default meta

type Story = StoryObj<typeof Divider>

const render = (props: DividerProps) => (
  <Block
    width={300}
    height={300}
    v={props.v?.startsWith('x') ? 'y' : 'x'}
    g='md'
  >
    <Divider {...props} />
  </Block>
)

export const Demo: Story = {
  parameters: params('Divider'),
  render,
  args: {
    content: 'content',
    v: 'x-center',
  },
}

export const Variants: Story = {
  parameters: params('View', VARIANTS),
  render: () => (
    <Block>
      <Block width={300} g='sm' v='column'>
        <Divider v='x' />
        <Divider v='x-start' content='start' />
        <Divider v='x-center' content='center' />
        <Divider v='x-end' content='end' />
      </Block>
      <Block height={300} g='sm' v='row'>
        <Divider v='y' />
        <Divider v='y-start' content='start' />
        <Divider v='y-center' content='center' />
        <Divider v='y-end' content='end' />
      </Block>
    </Block>
  ),
}
