import { toast as reactToast } from 'react-toastify'

// ---| core |---
// ---| self |---
import { initToastKey, Toast, ToastName, ToastOptions } from './Toast.component'

const createToast = (containerName: ToastName) => (data: ToastOptions) => reactToast(Toast, {
  data,
  autoClose: false,
  containerId: initToastKey(containerName),
})


/**
 * Allows call toasts
 * @example
 * toast.message({ title: 'Info', content: 'Text', actions: <Button content='Edit' /> })
 */
export const toast = {
  message: createToast('messages'),
  alert: createToast('alerts'),
  guard: createToast('guards'),
}
