import { initModalKey, ModalDetails } from './Modal.hook'

export const modal = (detail: ModalDetails & Record<string, any>) => {
  const event = new CustomEvent<ModalDetails>(initModalKey(detail.name), { detail })

  document.body.dispatchEvent(event)
}
