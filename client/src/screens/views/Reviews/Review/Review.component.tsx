import React from 'react'

// ---| core |---
import { cn } from 'tools'
import { FeatureReview } from 'api'

// ---| pages |---
// ---| screens |---
import User from 'screens/views/User'

// ---| components |---
import Text from 'components/Text'
import Block, { BlockProps } from 'components/Block'

// ---| self |---
import css from './Review.module.scss'
import Label from 'components/Label'

export type ReviewProps = BlockProps & FeatureReview

/**
 * Component description.
 *
 * How to use
 * @example
 * <Review />
 */
export function Review(props: ReviewProps): JSX.Element {
  const { rate, content, updatedAt, createdBy, children, className, ...otherProps } = props
  const _className = cn(css.Review, className)

  return (
    <Block className={_className} g='xs' {...otherProps}>
      <Block v='x' {...otherProps}>
        <User id={createdBy?.id} />
        <Block v='y' {...otherProps}>
          <Label icon='schedule' content={updatedAt} format='day-of-month-year' />
          <Label icon='star' content={rate} format='number' />
        </Block>
      </Block>

      <Text v='body2' size='xs' content={content} />

      {children}
    </Block>
  )
}

Review.displayName = 'Review'

export default Review
