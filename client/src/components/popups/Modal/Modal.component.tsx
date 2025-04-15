import React from 'react'
import MuiModal from '@mui/material/Modal'

// ---| core |---
import { cn } from 'tools'

// ---| pages |---
// ---| screens |---
// ---| components |---
import Icon, { IconVariant } from 'components/views/Icon'
import Card from 'components/layouts/Card'
import Scroll from 'components/layouts/Scroll'
import Button, { ButtonProps } from 'components/actions/Button'

// ---| self |---
import css from './Modal.module.scss'
import { initModalKey, ModalName } from './Modal.hooks'

export type ModalPosition = 'center' | 'right'
export type ModalProps = {
  name?: ModalName
  open?: boolean
  icon?: IconVariant
  title?: React.ReactNode
  position?: ModalPosition
  actions?: ButtonProps[] // TODO: types to actions?
  className?: string
  children?: React.ReactNode
  onClose?: () => void
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
 * <Modal name='modal-name' position='right'>some content</Modal>
 *
 * const modal = useModal({ name: 'modal-name', someField: 'override' })
 */
export function Modal(props: ModalProps) {
  const { icon, open, position = 'center', name, title, actions, onClose, children, className, ...otherProps } = props
  const _className = cn(css.Modal, className)

  // TODO: open modal by url (/url/:id?modal=name&arg1=123) useParams searchParams

  return (
    <MuiModal
      className={_className}
      container={() =>
        document.getElementById(initModalKey(name))
        ?? document.getElementById(initModalKey('global'))
        ?? document.body
      }
      open={!!open}
      onClose={onClose}
      {...otherProps}
    >
      <Card className={cn(css.Content, css[position])}>
        {(title || icon) && (
          <Card.Header
            title={
              <span style={{ display: 'flex', alignItems: 'center' }}>
                {icon && <Icon v={icon} />}
                {title}
              </span>
            }
            action={<Button start='close' onClick={onClose} />}
          />
        )}

        <Card.Content style={{ height: '-webkit-fill-available' }}>
          <Scroll v='y' size='xxs' />

          {children}
        </Card.Content>

        {!!actions?.length && (
          <Card.Actions>
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

Modal.Container = function ModalContainer(props: ModalContainerProps) {
  const { name, ...otherProps } = props

  return <div id={initModalKey(name)} {...otherProps} />
}

export default Modal
