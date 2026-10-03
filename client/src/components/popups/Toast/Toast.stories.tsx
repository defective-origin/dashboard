import { Meta, StoryObj, field, params } from 'storybook'
import Button from 'components/actions/Button'
import Block from 'components/layouts/Block'
import Toast, { ToastOptions } from './Toast.component'
import { toast } from './Toast.tools'

const VARIANTS: ToastOptions['v'][] = ['success', 'info', 'warning', 'error']

const Notification = (props: ToastOptions) => {
  return (
    <Block height={400} width={600} style={{ overflow: 'hidden' }} justifies='center' aligns='center' border>
      <Block v='x' g='xs' p='xs'>
        <Button size='xxs' v='outlined' content='ALERT' color='info' onClick={() => toast.alert(props)} />
        <Button size='xxs' v='outlined' content='GUARD' color='error' onClick={() => toast.guard(props)} />
        <Button size='xxs' v='outlined' content='MESSAGE' color='warning' onClick={() => toast.message(props)} />
      </Block>

      <Toast.Container name='alerts' position='top-center' width={400} />
      <Toast.Container name='messages' position='bottom-right' width={400} />
      <Toast.Container name='guards' position='bottom-center' width={400} />
    </Block>
  )
}

const meta: Meta<typeof Notification> = {
  title: 'Components/Popups/Toast',
  component: Notification,
  tags: ['autodocs'],
  argTypes: {
    v: field.variants(VARIANTS, 'AlertVariant'),
    inline: field.boolean('false'),
    title: field.reactNode(),
    content: field.reactNode(true),
    className: field.string(),
    children: field.reactNode(),
  },
}

export default meta

type Story = StoryObj<typeof Notification>

export const Demo: Story = {
  parameters: params('Toast [Requirements](?path=/docs/requirements-notifications--docs)'),
  args: {
    v: 'success',
    inline: false,
    title: 'Title: Lorem ipsum',
    content: 'Content: Lorem ipsum dolor sit amet consectetur, adipisicing elit. Totam, quam?',
    actions: <Button content='text' />,
  },
}
