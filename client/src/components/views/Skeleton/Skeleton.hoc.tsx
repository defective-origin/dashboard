import React from 'react'

// ---| core |---
// ---| pages |---
// ---| screens |---
// ---| components |---

// ---| self |---
import Skeleton, { SkeletonProps } from './Skeleton.component'

export type WithSkeletonProps = SkeletonProps & {
  /** Show skeleton */
  loading?: boolean
  /** Pass component as child into Skeleton */
  wrap?: boolean
}

/**
 * @example
 * export default withSkeleton(Icon, () => ({ v: 'circular', wrap: true }))
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export const withSkeleton = <P extends {}>(
  WrappedComponent: React.ComponentType<P>,
  mapper?: (props: P) => SkeletonProps,
) => {
  const hoc = (props: P & Omit<WithSkeletonProps, 'v'>) => {
    const { loading, wrap, className, ...other } = props
    const item = <WrappedComponent className={className} {...other as P} />

    if (loading) {
      return <Skeleton className={className} children={wrap ? item : undefined} {...mapper?.(other as P)} />
    }

    return item
  }
  hoc.displayName = `withSkeleton(${WrappedComponent.displayName || WrappedComponent.name})`

  return hoc
}
