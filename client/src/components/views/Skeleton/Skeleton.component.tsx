import React from 'react'

// ---| core |---
import { cn, jss } from 'tools'

// ---| components |---
// ---| self |---
import css from './Skeleton.module.scss'


export type SkeletonVariant = 'text' | 'block' | 'round'
export type SkeletonProps = {
  v?: SkeletonVariant
  count?: number
  width?: React.CSSProperties['width']
  height?: React.CSSProperties['height']
  className?: string
  children?: React.ReactNode
}

/**
 * A placeholder preview of the content.
 * @example
 * <Skeleton v='block' count={5} width={100} height={50} />
 */
export function Skeleton(props: SkeletonProps) {
  const { v, count = 1, width, height, children, className, ...otherProps } = props

  return [...Array(count).keys()].map(num => (
    <span
      key={num}
      className={cn(css.Skeleton, v && css[v], jss({
        width,
        height,
      }), className)}
      {...otherProps}
    >
      {children}
    </span>
  ))
}

Skeleton.displayName = 'Skeleton'

export default Skeleton
