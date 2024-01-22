import React from 'react'
import MuiSkeleton from '@mui/material/Skeleton'

// ---| core |---
// ---| pages |---
// ---| screens |---
// ---| components |---

// ---| common |---
import { cn } from 'common/tools'

// ---| self |---
import css from './Skeleton.module.scss'

export type SkeletonVariant = 'text' | 'rounded' | 'circular'

export type SkeletonProps = {
  className?: string
  content?: React.ReactNode
  children?: React.ReactNode
  v?: SkeletonVariant
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <Skeleton />
 */
export function Skeleton(props: SkeletonProps): JSX.Element {
  const { v, content, children = content, className, ...otherProps } = props
  const _className = cn(css.Skeleton, className)

  return <MuiSkeleton className={_className} variant={v} {...otherProps}>{children}</MuiSkeleton>
}

Skeleton.displayName = 'Skeleton'

export default Skeleton
