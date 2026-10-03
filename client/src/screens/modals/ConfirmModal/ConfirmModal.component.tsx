import React from 'react'

// ---| core |---
import { cn } from 'tools'
import { t } from 'locale'

// ---| screens |---
// ---| components |---
import Text from 'components/views/Text'
import Button from 'components/actions/Button'
import Modal, { ModalDetails, ModalProps, useModal } from 'components/popups/Modal'

// ---| self |---
import css from './ConfirmModal.module.scss'

export type ConfirmModalDetails = ModalDetails & {
  content?: React.ReactNode
  onSuccess?: () => void
}

export type ConfirmModalProps = ModalProps

/**
 * Component description.
 * @example
 * <ConfirmModal />
 */
export function ConfirmModal(props: ConfirmModalProps) {
  const { name = 'confirm', className, ...otherProps } = props
  const modal = useModal<ConfirmModalDetails>(name)

  return (
    <Modal
      className={cn(css.ConfirmModal, className)}
      name={name}
      title={t('ACTION.CONFIRM_OPERATION')}
      actions={[
        <Button content='Confirm' color='success' onClick={() => {
          modal.onSuccess?.()
          modal.onClose?.()
        }} />,
        <Button content={t('ACTION.CANCEL')} start='close' color='error' onClick={modal.onClose} />,
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
