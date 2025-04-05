// eslint-disable-next-line no-restricted-imports
import { SB_CSS, field, params } from '../../../../.storybook/tool'
import type { Meta, StoryObj } from '@storybook/react'
import Block from 'components/layouts/Block'
import useToast from './Toast.hook'
import Toast, { ToastOptions } from './Toast.component'
import { DIRECTION, COLORS } from 'theme'
import Button from 'components/actions/Button'

const Notification = (props: ToastOptions) => {
  const notification = useToast()
  const checkMessage = () => notification.message(props)
  const checkGuard = () => notification.guard(props)
  const checkAlert = () => notification.alert(props)

  return (
    <Block height={400} width={600} style={{ overflow: 'hidden' }} justifies='center' aligns='center' border={SB_CSS.border}>
      <Block v='x' g='xs' p='xs'>
        <Button size='xxs' v='outlined' content='ALERT' color='info' onClick={checkAlert} />
        <Button size='xxs' v='outlined' content='GUARD' color='error' onClick={checkGuard} />
        <Button size='xxs' v='outlined' content='MESSAGE' color='warning' onClick={checkMessage} />
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
    color: field.variants(COLORS, 'AlertColor', 'primary'),
    v: field.variants(DIRECTION, 'BlockVariant', 'x'),
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
