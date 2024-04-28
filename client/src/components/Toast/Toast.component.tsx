import React from 'react'
import { ToastContainer as RTToastContainer, ToastContentProps as RTToastContentProps } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// ---| core |---
// ---| pages |---
// ---| screens |---
// ---| components |---
import { AlertColor } from 'components/Alert'
import Text from 'components/Text'
import Block, { BlockVariant } from 'components/Block'
import Actions from 'components/Actions'

// ---| self |---
import css from './Toast.module.scss'

export type ToastName = 'messages' | 'guards' | 'alerts'

export const initToastKey = (name: ToastName) => `portal-${name}`

export type ToastMessage = {
  content?: React.ReactNode
  color?: AlertColor
  v?: BlockVariant
  onClose?: () => void
  onSuccess?: () => void
}

export type ToastProps = RTToastContentProps<ToastMessage>

/**
 * Component description.
 *
 * How to use
 * @example
 * <Toast />
 */
export function Toast(props: ToastProps): JSX.Element {
  const { closeToast, data = {} as ToastMessage } = props

  const handleClose = () => {
    closeToast?.()
    data.onClose?.()
  }

  const handleSuccess = () => {
    closeToast?.()
    data.onSuccess?.()
  }

  return (
    <Block className={css.Toast} justifies='space-between' v={data.v ?? 'x'} g='xs'>
      <Text.H4 color='primary' content={data.content} />

      <Actions g='xs' justifies='end'>
        {data.onSuccess && (
          <Actions.Button
            size='xs'
            color='success'
            start='check_circle'
            content='Save'
            end='check_circle'
            v='outlined'
            onClick={handleSuccess}
          />
        )}

        {data.onClose && (
          <Actions.Button
            size='xs'
            color='error'
            start='close'
            content='Cancel'
            end='close'
            v='outlined'
            onClick={handleClose}
          />
        )}
      </Actions>
    </Block>
  )
}

Toast.displayName = 'Toast'

export type ToastContainerProps = {
  name: ToastName
  className?: string
  position: RTToastContentProps['toastProps']['position']
}

export function ToastContainer(props: ToastContainerProps): JSX.Element {
  const { name } = props

  return (
    <RTToastContainer
      containerId={initToastKey(name)}
      hideProgressBar
      {...props}
    />
  )
}

ToastContainer.displayName = 'ToastContainer'

Toast.Container = ToastContainer

export default Toast
