import React from 'react'

// ---| core |---
import { cn } from 'tools'

// ---| pages |---
// ---| screens |---
// ---| components |---
import Block, { BlockProps } from 'components/layouts/Block'

// ---| self |---
import Review, { ReviewProps } from 'screens/views/Reviews/Review'
import css from './Reviews.module.scss'

export type ReviewItem = ReviewProps

export type ReviewsProps = BlockProps & {
  items?: ReviewItem[]
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <Reviews />
 */
export function Reviews(props: ReviewsProps): JSX.Element {
  const { items = [], children, className, ...otherProps } = props
  const _className = cn(css.Reviews, className)

  // TODO: show first 5 items. After them add show all buttons. On this button click open drawer
  return (
    <Block className={_className} g='md' {...otherProps}>
      {items.slice(0, 5).map(review => <Review key={review.id} {...review} />)}

      {children}
    </Block>
  )
}

Reviews.displayName = 'Reviews'

export default Reviews
