import React from 'react'
import { ToastContainer as RTToastContainer, ToastContentProps as RTToastContentProps } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// ---| core |---
// ---| pages |---
// ---| screens |---
// ---| components |---
import Text from 'components/views/Text'
import Actions from 'components/layouts/Actions'
import { AlertColor } from 'components/views/Alert'
import Block, { BlockVariant } from 'components/layouts/Block'

// ---| self |---
import css from './Toast.module.scss'

export type ToastName = 'messages' | 'guards' | 'alerts'

export const initToastKey = (name: ToastName) => `toast:${name}`

export type ToastOptions = {
  content?: React.ReactNode
  actions?: React.ReactNode
  color?: AlertColor
  v?: BlockVariant
  onClose?: () => void
}

export type ToastProps = RTToastContentProps<ToastOptions>

/**
 * Component description.
 * @example
 * <Toast />
 */
export function Toast(props: ToastProps) {
  const { data = {} as ToastOptions } = props

  // TODO: override background color variables
  return (
    <Block className={css.Toast} justifies='space-between' v={data.v ?? 'x'} g='xs'>
      <Text v='h4' color='primary' content={data.content} />

      <Actions size='xxs' v='x' g='xs' justifies='end'>
        {data.actions}
      </Actions>
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

Toast.Container = (props: ToastContainerProps) => {
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
