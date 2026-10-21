import React from 'react'

// ---| core |---
// ---| components |---

// ---| self |---
import Skeleton, { SkeletonProps } from './Skeleton.component'

export type WithSkeletonProps = SkeletonProps & {
  /** Show placeholder */
  loading?: boolean
}

/**
 * Shows placeholder when loading is on
 * @example
 * // Component will be wrapped by skeleton to save size
 * export default withSkeleton(Icon)
 * // show custom placeholder
 * export default withSkeleton(Icon, (props) => 
 *  <Block>
 *    <Skeleton v='round' width={50} height={50} />
 *    <Skeleton height={100} />
 *    <Skeleton v='text' count={3} />
 *  </Block>
 * )
 */
export const withSkeleton = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
  placeholder?: (props: P) => React.ReactNode,
) => {
  const hoc = (props: P & Omit<WithSkeletonProps, 'v'>) => {
    const { loading, ...other } = props

    if (loading && placeholder) {
      return placeholder(props)
    }

    const item = <WrappedComponent {...other as P} />

    return loading ? <Skeleton children={item} /> : item
  }
  hoc.displayName = `withSkeleton(${WrappedComponent.displayName || WrappedComponent.name})`

  return hoc
}
