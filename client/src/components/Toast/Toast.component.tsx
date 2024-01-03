import React from 'react'
import { toast, ToastContainer, Id, ToastContentProps } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// ---| core |---
// ---| pages |---
// ---| screens |---
// ---| components |---
import Icon, { IconVariant } from 'components/Icon'
import { AlertStatus } from 'components/Alert'
import Text from 'components/Text'
import Block, { BlockDirection } from 'components/Block'
import Actions from 'components/Actions'

// ---| common |---
// ---| self |---
import css from './Toast.module.scss'

const ALERT_ICON_MAP: Record<AlertStatus, IconVariant> = {
  success: 'check_circle',
  info: 'info',
  warning: 'warning',
  error: 'error',
}

export type ToastOptions = {
  content?: React.ReactNode
  status?: AlertStatus
  direction?: BlockDirection
  onClose?: () => void
  onSuccess?: () => void
}

export type ToastProps = ToastContentProps<ToastOptions>

/**
 * Component description.
 *
 * How to use
 * @example
 * <Toast />
 */
export function Toast(props: ToastProps): JSX.Element {
  const { closeToast, data = {} as ToastOptions, ...otherProps } = props

  // TODO: unify handlers
  const handleClose = () => {
    closeToast?.()
    data.onClose?.()
  }

  const handleSuccess = () => {
    closeToast?.()
    data.onSuccess?.()
  }

  return (
    <Block className={css.Toast} justify='space-between' direction={data.direction ?? 'x'} gap='xs' {...otherProps}>
      <Text.H4 status='primary' content={data.content} />

      <Actions gap='xs' justify='end'>
        {data.onSuccess && <Actions.Button size='xs' color='success' start='check_circle' content='Save' end='check_circle' variant='outlined' onClick={handleSuccess} />}
        {data.onClose && <Actions.Button size='xs' color='error' start='close' content='Cancel' end='close' variant='outlined' onClick={handleClose} />}
      </Actions>
    </Block>
  )
}

Toast.displayName = 'Toast'


export const showMessage = (data?: ToastOptions): Id => {

  return toast(Toast, {
    type: data?.status,
    containerId: 'messages',
    data: { direction: 'y', ...data },
  })
}

export const showAlert = (data?: ToastOptions): Id => {
  const type = data?.status ?? 'info'

  return toast(Toast, {
    theme: 'colored',
    containerId: 'alerts',
    autoClose: false,
    icon: () => <Icon v={ALERT_ICON_MAP[type]} />,
    data,
    type,
  })
}

// TODO: via overrideComponents
// TODO: via v?: guard, message, alert
// TODO: объединить showGuard, showAlert showMessage
// TODO: сделать через один ToastContainer?
export const showGuard = (data?: ToastOptions): Id => {
  const type = data?.status ?? 'info'

  return toast(Toast, {
    toastId: 'guard',
    theme: 'light',
    containerId: 'guards',
    autoClose: false,
    closeButton: false,
    closeOnClick: false,
    draggable: false,
    icon: () => <Icon v={ALERT_ICON_MAP[type]} />,
    data,
  })
}

export default ToastContainer
