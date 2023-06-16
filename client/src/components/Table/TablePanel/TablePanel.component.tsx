import React from 'react'

// ---| components |---
import Modal, { ModalHeaderProps, ModalProps } from 'components/Modal'

// ---| common |---
import { cn } from 'common/tools'

// ---| self |---
import css from './TablePanel.module.scss'

export type TablePanelProps = ModalProps & {
  title?: React.ReactNode
  titleOptions?: ModalHeaderProps
  content?: React.ReactNode
  saveBtnText?: React.ReactNode
  onSave?: () => void
  cancelBtnText?: React.ReactNode
  onClose?: () => void
  resetBtnText?: React.ReactNode
  onReset?: () => void
}

export default function TablePanel(props: TablePanelProps): JSX.Element | null {
  const {
    saveBtnText = 'Save',
    cancelBtnText = 'Cancel',
    resetBtnText = 'Reset',
    onReset,
    content,
    title,
    titleOptions,
    onClose,
    onSave,
    className,
    children,
    ...otherProps
  } = props

  return (
    <Modal className={cn(css.TablePanel, className)} placement="right" {...otherProps}>
      <Modal.Header text={title} onClose={onClose} {...titleOptions} />

      <Modal.Content>
        {content}
        {children}
      </Modal.Content>

      {(onSave || onReset) && (
        <Modal.Footer padding="xs" cgap="xs">
          {onSave && <Modal.Button text={saveBtnText} onClick={onSave} />}
          {onReset && <Modal.Button text={resetBtnText} onClick={onReset} />}
          <Modal.Button text={cancelBtnText} onClick={onClose} />
        </Modal.Footer>
      )}
    </Modal>
  )
}
