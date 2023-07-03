import React from 'react'
import MuiCircularProgress, { CircularProgressProps as MuiCircularProgressProps } from '@mui/material/CircularProgress'
import MuiLinearProgress, { LinearProgressProps as MuiLinearProgressProps } from '@mui/material/LinearProgress'

// ---| common |---
import { cn, UI } from 'common/tools'

// ---| self |---
import css from './Progress.module.scss'

export const PROGRESS_MAP = {
  circular: MuiCircularProgress,
  linear: MuiLinearProgress,
}

export type ProgressType = keyof typeof PROGRESS_MAP
// todo: fix props types
export type ProgressProps = {
  className?: string
  show?: boolean
  type?: ProgressType
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <Progress />
 */
export function Progress(props: ProgressProps): JSX.Element | null {
  const { show, type = 'circular', className, ...otherProps } = props
  const _className = cn(css.Progress, className)
  const Tag = PROGRESS_MAP[type]

  if (!show) {
    return null
  }

  return <Tag className={_className} {...otherProps} />
}

Progress.displayName = 'Progress'

export default UI.attachOverrides(Progress, {
  Circular: { type: 'circular' },
  Linear: { type: 'linear' },
}, {
  memoize: true,
})
