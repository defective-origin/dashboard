import { toast as reactToast, Id, ToastOptions as MuiToastOptions } from 'react-toastify'

// ---| core |---
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

const showToast = (data: ToastOptions, options: MuiToastOptions<ToastOptions>) => reactToast(Toast, {
  ...options,
  data: { ...options.data, ...data },
  type: data?.color ?? 'info',
  icon: () => <Icon v={ALERT_ICON_MAP[data?.color ?? 'info']} />,
})

const message = (options: ToastOptions) => showToast(options, {
  containerId: initToastKey('messages'),
  data: { v: 'y' },
})

const alert = (options: ToastOptions) => showToast(options, {
  theme: 'colored',
  containerId: initToastKey('alerts'),
  autoClose: false,
})

const guard = (options: ToastOptions) => showToast(options, {
  toastId: 'guard',
  theme: 'light',
  containerId: initToastKey('guards'),
  autoClose: false,
  closeButton: false,
  closeOnClick: false,
  draggable: false,
})

/**
 * Hook descriptions
 *
 * @example
 * const options = useToast(conf)
 */

export const toast = { message, alert, guard }
