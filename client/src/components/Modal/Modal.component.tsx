import React, { useEffect, useState } from 'react'
import MuiModal from '@mui/material/Modal'

// ---| core |---
import { cn } from 'tools'
import { useFunc } from 'hooks'

// ---| pages |---
// ---| screens |---
// ---| components |---
import Card from 'components/Card'
import Scroll from 'components/Scroll'
import Button, { ButtonProps } from 'components/Button'

// ---| self |---
import css from './Modal.module.scss'


// TODO: move to useEvent
// https://stackoverflow.com/questions/43001679/how-do-you-create-custom-event-in-typescript
declare global {
  // adds event listened definition to Document
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Document {
    addEventListener(type: `modal-${ModalName}`, listener: (this: Document, ev: CustomEvent<ModalOptions>) => void): void;
    dispatchEvent(ev: CustomEvent<ModalOptions>): void;
  }
}

export type ModalVariant = 'center' | 'right'
export type ModalName = 'global' | 'board-settings' | 'widget-settings'

export type ModalOptions = { // TODO: use ModalProps instead?
  /** position */
  v?: ModalVariant
  /** insert to named container and open this modal by name */
  name: ModalName
  title?: React.ReactNode
  children?: React.ReactNode
  onClose?: () => void
}

export const initModalKey = (name: ModalName): `modal-${ModalName}` => `modal-${name}`

export type ModalProps = ModalOptions & {
  actions?: ButtonProps[] // TODO: types to actions?
  className?: string
}

/**
 * Allows to show modal, drawer and other.
 *
 * How to use
 * @example
 * <Modal />
 */
export function Modal(props: ModalProps): JSX.Element {
  const [options, setOptions] = useState<ModalOptions>()
  const { v = 'center', name, title, actions, onClose, children, className, ...otherProps } = { ...props, ...options }
  const _className = cn(css.Modal, className)

  const close = useFunc(() => {
    options?.onClose?.()
    onClose?.()
    setOptions(undefined)
  })

  useEffect(() => {
    document.addEventListener(initModalKey(name), (e) => {
      if (e.detail.name === name) {
        setOptions(e.detail)
      }
    })
  }, [name])

  return (
    <MuiModal
      className={_className}
      container={() =>
        document.getElementById(initModalKey(name))
        ?? document.getElementById(initModalKey('global'))
        ?? document.body
      }
      open={!!options}
      onClose={close}
      {...otherProps}
    >
      <Card className={cn(css.Content, css[v])}>
        {title && <Card.Header title={title} action={<Button start='close' onClick={close} />} />}

        <Card.Content>
          <Scroll v='y' size='xxs' />

          {children}
        </Card.Content>

        {!!actions?.length && (
          <Card.Actions>
            {actions.map((action) => <Button {...action} />)}
          </Card.Actions>
        )}
      </Card>
    </MuiModal>
  )
}

Modal.displayName = 'Modal'


export type ModalContainerProps = {
  name: ModalName
  className?: string
}

export function ModalContainer(props: ModalContainerProps): JSX.Element {
  const { name, ...otherProps } = props

  return <div id={initModalKey(name)} {...otherProps} />
}

ModalContainer.displayName = 'ModalContainer'

Modal.Container = ModalContainer

export default Modal
