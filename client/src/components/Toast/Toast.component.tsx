import React from 'react'
import { toast, ToastContainer, ToastOptions as RTToastOptions, Id } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// ---| core |---
// ---| pages |---
// ---| screens |---
// ---| components |---
import Icon, { IconTypes } from 'components/Icon'
import { AlertStatus } from 'components/Alert'

// ---| common |---
// ---| self |---
import './Toast.module.scss'

const ALERT_ICON_MAP: Record<AlertStatus, IconTypes> = {
  success: 'check_circle',
  info: 'info',
  warning: 'warning',
  error: 'error',
}

export type ToastOptions = Omit<RTToastOptions, 'type'> & {
  content: React.ReactNode
  status?: AlertStatus
}

export const showMessage = (options?: ToastOptions): Id => {
  const { content, status, ...otherOptions } = options as ToastOptions

  return toast(content, {
    type: status,
    ...otherOptions,
  })
}

export const showAlert = (options?: ToastOptions): Id => {
  const { content, status = 'info', ...otherOptions } = options as ToastOptions

  return toast(content, {
    theme: 'colored',
    type: status,
    position: 'top-center',
    autoClose: false,
    icon: () => <Icon v={ALERT_ICON_MAP[status]} />,
    ...otherOptions,
  })
}

export default ToastContainer
