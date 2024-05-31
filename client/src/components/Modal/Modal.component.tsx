import React, { useState } from 'react'
import MuiModal from '@mui/material/Modal'

// ---| core |---
import { cn } from 'tools'
import { useEvent, useFunc } from 'hooks'

// ---| pages |---
// ---| screens |---
// ---| components |---
import Card from 'components/Card'
import Scroll from 'components/Scroll'
import Button, { ButtonProps } from 'components/Button'

// ---| self |---
import css from './Modal.module.scss'

export type ModalVariant = 'center' | 'right'
export type ModalName = 'global' | 'board-settings' | 'widget-settings'

export type ModalOptions<T = unknown> = {
  /** position */
  v?: ModalVariant
  /** insert to named container and open this modal by name */
  name?: ModalName
  title?: React.ReactNode
  children?: React.ReactNode
  payload?: T
  onClose?: () => void
}

export const initModalKey = (name: ModalName = 'global') => `modal-${name}` as const

export type ModalProps<T = unknown> = ModalOptions<T> & {
  open?: boolean
  actions?: ButtonProps[] // TODO: types to actions?
  className?: string
  onOpen?: (payload?: T) => void
}

/**
 * Allows to show modal, drawer and other.
 *
 * How to use
 * @example
 * <Modal name='modal-name' v='right' payload='payload'>some content</Modal>
 *
 * const modal = useModal({ name: 'modal-name', v: 'center' payload: 'payload override' })
 */
export function Modal<T = unknown>(props: ModalProps<T>): JSX.Element {
  const [options, setOptions] = useState<ModalOptions<T>>()
  const { payload, open, v = 'center', name, title, actions, onClose, onOpen, children, className, ...otherProps } = { ...props, ...options }
  const _className = cn(css.Modal, className)

  const close = useFunc(() => {
    options?.onClose?.()
    onClose?.()
    setOptions(undefined)
  })

  useEvent(initModalKey(name), (e: CustomEvent<ModalOptions<T>>) => {
    if (e.detail.name === name) {
      setOptions(e.detail)
      onOpen?.(payload ?? e.detail.payload)
    }
  })

  return (
    <MuiModal
      className={_className}
      container={() =>
        document.getElementById(initModalKey(name))
        ?? document.getElementById(initModalKey('global'))
        ?? document.body
      }
      open={open ?? !!options}
      onClose={close}
      {...otherProps}
    >
      <Card className={cn(css.Content, css[v])}>
        {title && <Card.Header title={title} action={<Button start='close' onClick={close} />} />}

        <Card.Content style={{ height: '-webkit-fill-available' }}>
          <Scroll v='y' size='xxs' />

          {children}
        </Card.Content>

        {!!actions?.length && (
          <Card.Actions style={{ padding: 16 }}>
            {actions.map((action, idx) => <Button key={idx} size='xxs' v='outline' {...action} />)}
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
