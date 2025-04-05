import { useMemo } from 'react'
import { toast, Id, ToastOptions as MuiToastOptions } from 'react-toastify'

// ---| core |---
import { useFunc } from 'hooks'

// ---| pages |---
// ---| screens |---
// ---| components |---
import Icon, { IconVariant } from 'components/views/Icon'
import { AlertColor } from 'components/views/Alert'

// ---| self |---
import { Toast, ToastOptions, initToastKey } from './Toast.component'

const ALERT_ICON_MAP: Record<AlertColor, IconVariant> = {
  success: 'check_circle',
  info: 'info',
  warning: 'warning',
  error: 'error',
}


export type ToastReturnOptions = {
  message: (options: ToastOptions) => Id
  alert: (options: ToastOptions) => Id
  guard: (options: ToastOptions) => Id
}

/**
 * Hook descriptions
 *
 * @example
 * const options = useToast(conf)
 */

export const useToast = (): ToastReturnOptions => {
  const showToast = useFunc((data: ToastOptions, options: MuiToastOptions<ToastOptions>) =>
    toast(Toast, {
      ...options,
      data: { ...options.data, ...data },
      type: data?.color ?? 'info',
      icon: () => <Icon v={ALERT_ICON_MAP[data?.color ?? 'info']} />,
    }),
  )

  const message = useFunc((options: ToastOptions) =>
    showToast(options, {
      containerId: initToastKey('messages'),
      data: { v: 'y' },
    }),
  )

  const alert = useFunc((options: ToastOptions) =>
    showToast(options, {
      theme: 'colored',
      containerId: initToastKey('alerts'),
      autoClose: false,
    }),
  )

  const guard = useFunc((options: ToastOptions) =>
    showToast(options, {
      toastId: 'guard',
      theme: 'light',
      containerId: initToastKey('guards'),
      autoClose: false,
      closeButton: false,
      closeOnClick: false,
      draggable: false,
    }),
  )

  return useMemo(() => ({ message, alert, guard }), [message, alert, guard])
}

export default useToast
