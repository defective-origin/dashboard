import React from 'react'
import { ToastContainer, ToastContentProps as MuiToastContentProps } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// ---| core |---
// ---| pages |---
// ---| screens |---
// ---| components |---
import { AlertColor } from 'components/Alert'
import Text from 'components/Text'
import Block, { BlockDirection } from 'components/Block'
import Actions from 'components/Actions'

// ---| common |---
// ---| self |---
import css from './Toast.module.scss'

export type ToastName = 'messages' | 'guards' | 'alerts'

export const initToastKey = (name: ToastName) => `portal-${name}`

export type ToastMessage = {
  content?: React.ReactNode
  color?: AlertColor
  direction?: BlockDirection
  onClose?: () => void
  onSuccess?: () => void
}

export type ToastProps = MuiToastContentProps<ToastMessage>

/**
 * Component description.
 *
 * How to use
 * @example
 * <Toast />
 */
export function Toast(props: ToastProps): JSX.Element {
  const { closeToast, data = {} as ToastMessage, ...otherProps } = props

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
      <Text.H4 color='primary' multiline content={data.content} />

      <Actions gap='xs' justify='end'>
        {data.onSuccess && <Actions.Button size='xs' color='success' start='check_circle' content='Save' end='check_circle' v='outlined' onClick={handleSuccess} />}
        {data.onClose && <Actions.Button size='xs' color='error' start='close' content='Cancel' end='close' v='outlined' onClick={handleClose} />}
      </Actions>
    </Block>
  )
}

export type ToastContainerProps = {
  name: ToastName
  className?: string
  position: MuiToastContentProps['toastProps']['position']
}

Toast.Container = function Toast(props: ToastContainerProps): JSX.Element {
  const { name } = props

  return (
    <ToastContainer
      hideProgressBar
      enableMultiContainer
      containerId={initToastKey(name)}
      {...props}
    />
  )
}

Toast.displayName = 'Toast'

export default Toast
