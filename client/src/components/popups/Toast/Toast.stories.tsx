import { Meta, StoryObj, SB_CSS, field, params, theme } from 'storybook'
import Button from 'components/actions/Button'
import Block from 'components/layouts/Block'
import Toast, { ToastOptions } from './Toast.component'
import { toast } from './Toast.tools'

const Notification = (props: ToastOptions) => {
  return (
    <Block height={400} width={600} style={{ overflow: 'hidden' }} justifies='center' aligns='center' border={SB_CSS.border}>
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
    content: field.reactNode(),
    color: field.variants(theme.COLORS, 'AlertColor', 'primary'),
    v: field.variants(theme.DIRECTION, 'BlockVariant', 'x'),
    onClose: field.event(),
    onSuccess: field.event(),
  },
}

export default meta

type Story = StoryObj<typeof Notification>

export const Demo: Story = {
  parameters: params('Toast [Requirements](?path=/docs/requirements-notifications--docs)'),
  args: {
    v: 'x',
    content: 'Test Message',
    onClose: () => console.log('CLOSE EVENT'),
    onSuccess: () => console.log('SUCCESS EVENT'),
  },
}
