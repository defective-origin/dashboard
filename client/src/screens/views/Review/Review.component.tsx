import React from 'react'

// ---| core |---
import { cn } from 'tools'
import { Review as ReviewType } from 'api'

// ---| pages |---
// ---| screens |---
import User from 'screens/views/User'

// ---| components |---
import Text from 'components/Text'
import Button from 'components/Button'
import Block, { BlockProps } from 'components/Block'

// ---| self |---
import css from './Review.module.scss'

export type ReviewProps = BlockProps & {
  options?: ReviewType
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <Review />
 */
export function Review(props: ReviewProps): JSX.Element {
  const { options, children, className, ...otherProps } = props
  const _className = cn(css.Review, className)

  return (
    <Block className={_className} g='xs' {...otherProps}>
      <Block className={_className} v='x' justifies='space-between' {...otherProps}>
        <User id={options?.author} />
        <Text v='body2' content={options?.date} format='day-of-month-year' size='xxs' />
      </Block>

      <Text v='body2' content={options?.value} size='xs' />

      <Block className={_className} v='x' {...otherProps}>
        <Button start='thumb_up' content={options?.likes} />
        <Button start='thumb_down' content={options?.dislike} />
      </Block>

      {children}
    </Block>
  )
}

Review.displayName = 'Review'

export default Review
