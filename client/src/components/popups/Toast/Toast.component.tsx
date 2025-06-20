import React from 'react'
import { ToastContainer as RTToastContainer, ToastContentProps as RTToastContentProps } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// ---| core |---
// ---| pages |---
// ---| screens |---
// ---| components |---
import { AlertColor } from 'components/views/Alert'
import Text from 'components/views/Text'
import Block, { BlockVariant } from 'components/layouts/Block'
import Button from 'components/actions/Button'

// ---| self |---
import css from './Toast.module.scss'

export type ToastName = 'messages' | 'guards' | 'alerts'

export const initToastKey = (name: ToastName) => `toast:${name}`

export type ToastOptions = {
  content?: React.ReactNode
  color?: AlertColor
  v?: BlockVariant
  onClose?: () => void
  onSuccess?: () => void
}

export type ToastProps = RTToastContentProps<ToastOptions>

/**
 * Component description.
 *
 * How to use
 * @example
 * <Toast />
 */
export function Toast(props: ToastProps) {
  const { closeToast, data = {} as ToastOptions } = props

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

Toast.Container = function ToastContainer(props: ToastContainerProps) {
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

export default Toast
