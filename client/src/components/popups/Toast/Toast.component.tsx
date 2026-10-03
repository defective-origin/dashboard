import React from 'react'
import { ToastContainer as RTToastContainer, ToastContentProps as RTToastContentProps } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// ---| core |---
// ---| components |---
import Alert, { AlertProps } from 'components/views/Alert'

// ---| self |---
import css from './Toast.module.scss'


export type ToastName = 'messages' | 'guards' | 'alerts'
export const initToastKey = (name: ToastName) => `toast:${name}`

export type ToastOptions = AlertProps
export type ToastProps = RTToastContentProps<ToastOptions>

/**
 * Component description.
 * @example
 * <Toast />
 */
export function Toast(props: ToastProps) {
  const { data } = props

  return <Alert className={css.Toast} clear {...data} />
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
