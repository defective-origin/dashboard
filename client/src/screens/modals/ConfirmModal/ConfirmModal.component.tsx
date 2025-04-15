import React from 'react'

// ---| core |---
import { cn } from 'tools'
import { t } from 'locale'

// ---| pages |---
// ---| screens |---
// ---| components |---
import Modal, { ModalDetails, ModalProps, useModal } from 'components/popups/Modal'
import Text from 'components/views/Text'

// ---| self |---
import css from './ConfirmModal.module.scss'

export type ConfirmModalDetails = ModalDetails & {
  content?: React.ReactNode
  onSuccess?: () => void
}

export type ConfirmModalProps = ModalProps

/**
 * Component description.
 *
 * How to use
 * @example
 * <ConfirmModal />
 */
export function ConfirmModal(props: ConfirmModalProps) {
  const { name = 'confirm', className, ...otherProps } = props
  const _className = cn(css.ConfirmModal, className)
  const modal = useModal<ConfirmModalDetails>(name)

  return (
    <Modal
      className={_className}
      name={name}
      title={t('ACTION.CONFIRM_OPERATION')}
      actions={[
        {
          content: 'Confirm',
          color: 'success',
          onClick: () => {
            modal.onSuccess?.()
            modal.onClose?.()
          },
        },
        { content: 'Cancel', color: 'error', onClick: modal.onClose },
      ]}
      open={modal.open}
      onClose={modal.onClose}
      {...otherProps}
    >
      <Text content={modal.content} />
    </Modal>
  )
}

ConfirmModal.displayName = 'ConfirmModal'

export default ConfirmModal
