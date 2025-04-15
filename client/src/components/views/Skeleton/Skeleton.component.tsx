import React from 'react'
import MuiSkeleton from '@mui/material/Skeleton'

// ---| core |---
import { cn } from 'tools'

// ---| pages |---
// ---| screens |---
// ---| components |---

// ---| self |---
import css from './Skeleton.module.scss'

export type SkeletonVariant = 'text' | 'rounded' | 'circular'

export type SkeletonProps = {
  className?: string
  children?: React.ReactNode
  v?: SkeletonVariant
}

/**
 * A placeholder preview of the content.
 *
 * How to use
 * @example
 * <Skeleton />
 */
export function Skeleton(props: SkeletonProps) {
  const { v, children, className, ...otherProps } = props
  const _className = cn(css.Skeleton, className)

  return <MuiSkeleton className={_className} variant={v} {...otherProps}>{children}</MuiSkeleton>
}

Skeleton.displayName = 'Skeleton'

export default Skeleton
