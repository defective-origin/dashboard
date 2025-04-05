import React, { useState } from 'react'
import MuiModal from '@mui/material/Modal'

// ---| core |---
import { cn } from 'tools'
import { useEvent, useFunc } from 'hooks'

// ---| pages |---
// ---| screens |---
// ---| components |---
import Icon, { IconVariant } from 'components/views/Icon'
import Card from 'components/layouts/Card'
import Scroll from 'components/layouts/Scroll'
import Button, { ButtonProps } from 'components/actions/Button'

// ---| self |---
import css from './Modal.module.scss'
import { initModalKey, ModalName, ModalOptions } from './Modal.hook'

export type ModalProps<T = unknown> = ModalOptions<T> & {
  open?: boolean
  icon?: IconVariant
  title?: React.ReactNode
  actions?: ButtonProps[] // TODO: types to actions?
  className?: string
  children?: React.ReactNode
}

/**
 * Allows to show modal, drawer and other.
 *
 * Modal can be opened via
 * - Component with `open` prop
 * - Event hook `useModal` - can be called everywhere in app
 * - By url `url/:id?modal=name&arg1=123` - can be called everywhere in app
 *
 * How to use
 * @example
 * <Modal name='modal-name' v='right' payload='payload'>some content</Modal>
 *
 * const modal = useModal({ name: 'modal-name', v: 'center' payload: 'payload override' })
 */
export function Modal<T = unknown>(props: ModalProps<T>): JSX.Element {
  const [details, setDetails] = useState<ModalOptions<T>>()
  const { payload, icon, open, v = details?.v ?? 'center', name, title, actions, onClose, children, className, ...otherProps } = props
  const _className = cn(css.Modal, className)

  const close = useFunc(() => {
    details?.onClose?.()
    onClose?.()
    setDetails(undefined)
  })

  useEvent(initModalKey(name), (e: CustomEvent<ModalOptions<T>>) => {
    if (e.detail.name === name) {
      setDetails(e.detail)
    }
  }, { disable: !name })

  // TODO: open modal by url (/url/:id?modal=name&arg1=123) useParams searchParams

  return (
    <MuiModal
      className={_className}
      container={() =>
        document.getElementById(initModalKey(name))
        ?? document.getElementById(initModalKey('global'))
        ?? document.body
      }
      open={!!open || !!details}
      onClose={close}
      {...otherProps}
    >
      <Card className={cn(css.Content, css[v])}>
        {(title || icon) && (
          <Card.Header
            action={<Button start='close' onClick={close} />}
            title={
              <span style={{ display: 'flex', alignItems: 'center' }}>
                {icon && <Icon v={icon} />}
                {title}
              </span>
            }
          />
        )}

        <Card.Content style={{ height: '-webkit-fill-available' }}>
          <Scroll v='y' size='xxs' />

          {children}
        </Card.Content>

        {!!actions?.length && (
          <Card.Actions style={{ padding: 16 }}>
            {actions.map((action, idx) => <Button key={idx} size='xxs' v='outlined' {...action} />)}
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
