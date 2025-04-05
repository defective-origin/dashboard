import { useState } from 'react'

// ---| core |---
import { useEvent, useFunc } from 'hooks'

// ---| pages |---
// ---| screens |---
// ---| components |---
// ---| self |---

export type ModalVariant = 'center' | 'right'
export type ModalName = 'global' | 'board-settings' | 'widget-settings' | 'widget-view-settings' | 'feature-review'

export type ModalOptions<T = unknown> = {
  /** position */
  v?: ModalVariant
  /** insert to named container and open this modal by name */
  name?: ModalName
  payload?: T
  onClose?: () => void
}

export const initModalKey = (name: ModalName = 'global') => `modal-${name}` as const

export type ModalReturnOptions = (options: ModalOptions) => void

/**
 * Hook descriptions
 *
 * @example
 * const modal = useModal({ name: 'modal-name', v: 'center' payload: 'payload override' })
 */

export const useModal = (defaultOptions?: ModalOptions): ModalReturnOptions => {
  // TODO: return promise with action type?
  return useFunc((options: ModalOptions) => {
    const detail = { ...defaultOptions, ...options }
    const modalName = initModalKey(detail.name)
    const event = new CustomEvent<ModalOptions>(modalName, { detail })

    document.body.dispatchEvent(event)
  })
}

export default useModal


/** Returns modal payload when modal is called */
export const useModalPayload = <T>(name?: ModalName) => {
  const [options, setOptions] = useState<T>()

  useEvent(initModalKey(name), (e: CustomEvent<ModalOptions<T>>) => {
    if (e.detail.name === name) {
      setOptions(e.detail.payload)
    }
  }, { disable: !name })

  return options
}
