import React from 'react'

// ---| core |---
import { cn } from 'tools'
import { Id, useReviews } from 'api'

// ---| pages |---
// ---| screens |---
import Review from 'screens/views/Review'

// ---| components |---
import Block, { BlockProps } from 'components/Block'

// ---| self |---
import css from './Reviews.module.scss'

export type ReviewsProps = BlockProps & {
  id?: Id
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <Reviews />
 */
export function Reviews(props: ReviewsProps): JSX.Element {
  const { id, children, className, ...otherProps } = props
  const _className = cn(css.Reviews, className)
  const reviews = useReviews(id)

  // TODO: show first 5 items. After them add show all buttons. On this button click open drawer
  return (
    <Block className={_className} g='md' {...otherProps}>
      {reviews.slice(0, 5).map((review) => <Review options={review} />)}

      {children}
    </Block>
  )
}

Reviews.displayName = 'Reviews'

export default Reviews
