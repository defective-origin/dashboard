import React from 'react'
import MuiModal from '@mui/material/Modal'

// ---| core |---
import { cn } from 'tools'

// ---| pages |---
// ---| screens |---
// ---| components |---
import Card from 'components/Card'
import { ButtonProps } from 'components/Button'

// ---| self |---
import css from './Modal.module.scss'

export type ModalProps = {
  className?: string
  children?: React.ReactNode
  open: boolean
  title?: React.ReactNode
  content?: React.ReactNode
  actions?: ButtonProps | ButtonProps[]
  onClose?: () => void
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <Modal />
 */
export function Modal(props: ModalProps): JSX.Element {
  const { title, content, actions, onClose, children, className, ...otherProps } = props
  const _className = cn(css.Modal, className)

  return (
    <MuiModal className={_className} onClose={onClose} {...otherProps}>
      {/* fragment prevent error of click listener */}
      <>
        <Card
          title={title}
          content={content}
          actions={actions}
          onClose={onClose}
        >
          {children}
        </Card>
      </>
    </MuiModal>
  )
}

Modal.displayName = 'Modal'

export default Modal
