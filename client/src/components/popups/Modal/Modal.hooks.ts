import { useMemo, useState } from 'react'

// ---| core |---
import { emitEvent, initEventName, useEvent, useFunc } from 'hooks'

// ---| pages |---
// ---| screens |---
// ---| components |---
// ---| self |---

export type ModalName = 'global' | 'feature-review' | 'confirm'

export type ModalDetails = {
  /** insert to named container and open this modal by name */
  name: ModalName // TODO: d.ts extend interface depends on name
} & Record<string, any>

export const initModalKey = (name: ModalName = 'global') => initEventName(['modal', name])


/** Returns modal details when modal is called */
export const useModal = <T extends ModalDetails>(name?: ModalName) => {
  const [options, setOptions] = useState<T>()

  const onClose = useFunc(() => setOptions(undefined))

  // listen to open modal event
  useEvent(initModalKey(name), e => {
    const { detail } = e as CustomEvent<T>
    if (detail.name === name) {
      setOptions(detail)
    }
  }, { disable: !name })

  return useMemo(() => ({ ...options as Partial<T>, open: !!options, onClose }), [onClose, options])
}

export default useModal

// TODO: change interface to modal(name, options)
export const modal = (detail: ModalDetails) => emitEvent(initModalKey(detail.name), detail)
