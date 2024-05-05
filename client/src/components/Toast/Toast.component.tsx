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
import Button from 'components/Button'

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

      {/* Don't use Actions here because it breaks storybook toasts */}
      <Block v='x' g='xs' justifies='end'>
        {data.onSuccess && (
          <Button
            size='xs'
            color='success'
            content='Save'
            v='outlined'
            onClick={handleSuccess}
          />
        )}

        {data.onClose && (
          <Button
            size='xs'
            color='error'
            content='Cancel'
            v='outlined'
            onClick={handleClose}
          />
        )}
      </Block>
    </Block>
  )
}

Toast.displayName = 'Toast'

export type ToastContainerProps = {
  name: ToastName
  width?: number
  className?: string
  position: RTToastContentProps['toastProps']['position']
}

export function ToastContainer(props: ToastContainerProps): JSX.Element {
  const { name, width, ...otherProps } = props

  return (
    <RTToastContainer
      containerId={initToastKey(name)}
      hideProgressBar
      style={{ width }}
      {...otherProps}
    />
  )
}

ToastContainer.displayName = 'ToastContainer'

Toast.Container = ToastContainer

export default Toast
