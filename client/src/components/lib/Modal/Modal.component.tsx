import React from 'react'
import MuiModal, { ModalProps as MuiModalProps } from '@mui/material/Modal'

// ---| core |---
// ---| pages |---
// ---| screens |---
// ---| components |---
import Card, { CardProps } from 'components/lib/Card'

// ---| common |---
import { cn } from 'common/tools'

// ---| self |---
import css from './Modal.module.scss'

export type ModalProps = Omit<MuiModalProps, 'title' | 'content' | 'children' | 'onClose'>
                        & Pick<CardProps, 'title' | 'content' | 'actions'>
                        & {
                          className?: string
                          children?: React.ReactNode
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
