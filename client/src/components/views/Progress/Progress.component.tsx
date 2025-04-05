import React from 'react'
import MuiCircularProgress from '@mui/material/CircularProgress'
import MuiLinearProgress from '@mui/material/LinearProgress'

// ---| core |---
import { cn, react } from 'tools'

// ---| self |---
import css from './Progress.module.scss'

export const PROGRESS_MAP = {
  circular: MuiCircularProgress,
  linear: MuiLinearProgress,
}

export type ProgressVariant = keyof typeof PROGRESS_MAP
// todo: add color
export type ProgressProps = {
  className?: string
  show?: boolean
  v?: ProgressVariant
  value?: number
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <Progress />
 */
export function Progress(props: ProgressProps): JSX.Element | null {
  const { show, v = 'circular', value, className, ...otherProps } = props
  const _className = cn(css.Progress, className)
  const Tag = PROGRESS_MAP[v]

  if (!show) {
    return null
  }

  return <Tag className={_className} value={value} {...otherProps} />
}

Progress.displayName = 'Progress'

export default react.attachOverrides(Progress, {
  Circular: { v: 'circular' },
  Linear: { v: 'linear' },
}, {
  memoize: true,
})
