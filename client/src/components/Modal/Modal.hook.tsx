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
 * const options = useModal(conf)
 */

export const useModal = (defaultOptions?: ModalOptions): ModalReturnOptions => {
  // TODO: add payload?
  // TODO: return promise with action type
  return useFunc((options: ModalOptions) => {
    const detail = { ...defaultOptions, ...options }
    const modalName = initModalKey(detail.name)
    const event = new CustomEvent<ModalOptions>(modalName, { detail })

    document.dispatchEvent(event)
  })
}

export default useModal
