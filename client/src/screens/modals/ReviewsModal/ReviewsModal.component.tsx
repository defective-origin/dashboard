import React from 'react'

// ---| core |---
import { cn } from 'tools'
import { t } from 'locale'

// ---| pages |---
// ---| screens |---
import Reviews, { ReviewItem } from 'screens/views/Reviews'

// ---| components |---
import Modal, { ModalProps, useModalPayload } from 'components/popups/Modal'

// ---| self |---
import css from './ReviewsModal.module.scss'

export type ReviewsModalProps = ModalProps

const MODAL_NAME = 'feature-review'

/**
 * Component description.
 *
 * How to use
 * @example
 * <ReviewsModal />
 */
export function ReviewsModal(props: ReviewsModalProps): JSX.Element {
  const { name = MODAL_NAME, children, className, ...otherProps } = props
  const _className = cn(css.ReviewsModal, className)
  const items = useModalPayload<ReviewItem[]>(name)

  return (
    <Modal title={t('ACTION.REVIEWS')} className={_className} v='right' name={name} {...otherProps}>
      <Reviews items={items} />
      {children}
    </Modal>
  )
}

ReviewsModal.modalName = MODAL_NAME
ReviewsModal.displayName = 'ReviewsModal'

export default ReviewsModal
