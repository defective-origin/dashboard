import React from 'react'
import MuiModal from '@mui/material/Modal'

// ---| core |---
import { cn } from 'tools'

// ---| components |---
import Text from 'components/views/Text'
import Card from 'components/layouts/Card'
import Scroll from 'components/layouts/Scroll'
import Button from 'components/actions/Button'
import Icon, { IconVariant } from 'components/views/Icon'

// ---| self |---
import css from './Modal.module.scss'
import { initModalKey, ModalName } from './Modal.hooks'


const CONTAINER_ID = initModalKey('container')

export type ModalPosition = 'center' | 'right'
export type ModalProps = {
  name?: ModalName
  open?: boolean
  icon?: IconVariant
  title?: React.ReactNode
  position?: ModalPosition
  actions?: React.ReactNode
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
 * @example
 * <Modal name='modal-name' position='right'>some content</Modal>
 * 
 * <Modal.Container />
 *
 * const modal = useModal({ name: 'modal-name', someField: 'override' })
 */
export function Modal(props: ModalProps) {
  const { name, icon, open, position = 'center', title, actions, onClose, children, className, ...otherProps } = props

  // TODO: open modal by url (/url/:id?modal=name&arg1=123) useParams searchParams

  return (
    <MuiModal
      container={() => document.getElementById(CONTAINER_ID) ?? document.body}
      open={!!open}
      onClose={onClose}
      {...otherProps}
    >
      <Card className={cn(css.Modal, css[position], className)} data-role='dialog'>
        <Card.Header p='sm'>
          <Text v='h4'>
            {icon && <Icon v={icon} />}
            {title}
          </Text>
          <Button start='close' size='sm' onClick={onClose} />
        </Card.Header>

        <Card.Content p='sm'>
          <Scroll v='y' thin />

          {children}
        </Card.Content>

        {actions && <Card.Actions p='sm' size='xxs' action='outlined' g='xs' justifies='end'>{actions}</Card.Actions>}
      </Card>
    </MuiModal>
  )
}

Modal.displayName = 'Modal'


export type ModalContainerProps = {
  className?: string
}

Modal.Container = (props: ModalContainerProps) => {
  return <div id={CONTAINER_ID} {...props} />
}

export default Modal
