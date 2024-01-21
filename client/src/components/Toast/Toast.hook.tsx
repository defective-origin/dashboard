import { useCallback, useMemo } from 'react'
import { toast, Id, ToastOptions as MuiToastOptions } from 'react-toastify'

// ---| core |---
// ---| pages |---
// ---| screens |---
// ---| components |---
import Icon, { IconVariant } from 'components/Icon'
import { AlertColor } from 'components/Alert'

// ---| self |---
import { Toast, ToastMessage, initToastKey } from './Toast.component'

const ALERT_ICON_MAP: Record<AlertColor, IconVariant> = {
  success: 'check_circle',
  info: 'info',
  warning: 'warning',
  error: 'error',
  primary: 'info',
  secondary: 'info',
  disable: 'info',
}


export type ToastReturnOptions = {
  message: (data: ToastMessage) => Id
  alert: (data: ToastMessage) => Id
  guard: (data: ToastMessage) => Id
}

/**
 * Hook descriptions
 *
 * @example
 * const options = useToast(conf)
 */

export const useToast = (): ToastReturnOptions => {
  const initToast = useCallback((data: ToastMessage, options: MuiToastOptions<ToastMessage>) =>
    toast(Toast, {
      ...options,
      data: { ...options.data, ...data },
      type: data?.color ?? 'info' as any,
      icon: () => <Icon v={ALERT_ICON_MAP[data?.color ?? 'info']} />,
    })
  , [])

  const message = useCallback((data: ToastMessage) =>
    initToast(data, {
      containerId: initToastKey('messages'),
      data: { direction: 'y' },
    })
  , [initToast])

  const alert = useCallback((data: ToastMessage) =>
    initToast(data, {
      theme: 'colored',
      containerId: initToastKey('alerts'),
      autoClose: false,
    })
  , [initToast])

  const guard = useCallback((data: ToastMessage) =>
    initToast(data, {
      toastId: 'guard',
      theme: 'light',
      containerId: initToastKey('guards'),
      autoClose: false,
      closeButton: false,
      closeOnClick: false,
      draggable: false,
    })
  , [initToast])

  return useMemo(() => ({ message, alert, guard }), [message, alert, guard])
}

export default useToast
