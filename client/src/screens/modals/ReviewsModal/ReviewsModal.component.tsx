import React from 'react'

// ---| core |---
import { cn } from 'tools'
import { t } from 'locale'

// ---| pages |---
// ---| screens |---
import Reviews, { ReviewItem } from 'screens/views/Reviews'
// ---| components |---
import Modal, { ModalDetails, ModalProps, useModal } from 'components/popups/Modal'

// ---| self |---
import css from './ReviewsModal.module.scss'

export type ReviewsModalDetails = ModalDetails & {
  options: ReviewItem[]
}

export type ReviewsModalProps = ModalProps

/**
 * Component description.
 * @example
 * <ReviewsModal />
 */
export function ReviewsModal(props: ReviewsModalProps) {
  const { name = 'feature-review', children, className, ...otherProps } = props
  const modal = useModal<ReviewsModalDetails>(name)

  return (
    <Modal
      className={cn(css.ReviewsModal, className)}
      title={t('LABEL.REVIEWS')}
      name={name}
      open={modal.open}
      onClose={modal.onClose}
      {...otherProps}
    >
      <Reviews items={modal?.options} />
      {children}
    </Modal>
  )
}

ReviewsModal.displayName = 'ReviewsModal'

export default ReviewsModal
