// eslint-disable-next-line no-restricted-imports
import { field, params } from '../../../.storybook/tool'
import type { Meta, StoryObj } from '@storybook/react'
import Alert, { AlertProps } from './Alert.component'
import Block from 'components/Block'

const COLORS: AlertProps['color'][] = ['success', 'info', 'warning', 'error']

const meta: Meta<typeof Alert> = {
  title: 'Components/Views/Alert',
  component: Alert,
  tags: ['autodocs'],
  argTypes: {
    className: field.string(),
    children: field.reactNode(),
    content: field.reactNode(true),
    title: field.reactNode(),
    color: field.variants(COLORS, 'AlertColor', 'success'),
  },
}

export default meta

type Story = StoryObj<typeof Alert>

const initVariants = <P extends keyof AlertProps>(prop: P, items: AlertProps[P][]) => (
  <Block g='xs' minWidth={250}>
    {items.map((item) => <Alert content={item} {...{ [prop]: item }}/>)}
  </Block>
)

export const Demo: Story = {
  parameters: params('Alert'),
  args: {
    color: 'success',
    title: 'Title: Lorem ipsum',
    content: 'Content: Lorem ipsum dolor sit amet consectetur, adipisicing elit. Totam, quam?',
  },
}

export const Colors: Story = {
  parameters: params('Color', COLORS),
  render: () => initVariants('color', COLORS),
}

