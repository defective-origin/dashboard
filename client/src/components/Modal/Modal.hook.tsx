// ---| core |---
import { useFunc } from 'hooks'

// ---| pages |---
// ---| screens |---
// ---| components |---
// ---| self |---
import { ModalOptions, initModalKey } from './Modal.component'

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
