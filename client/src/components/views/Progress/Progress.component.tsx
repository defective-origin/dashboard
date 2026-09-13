import React from 'react'
import MuiCircularProgress from '@mui/material/CircularProgress'
import MuiLinearProgress from '@mui/material/LinearProgress'

// ---| core |---
import { cn } from 'tools'

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
  visible?: boolean
  v?: ProgressVariant
  value?: number
}

/**
 * Component description.
 * @example
 * <Progress />
 */
export function Progress(props: ProgressProps) {
  const { visible, v = 'circular', value, className, ...otherProps } = props
  const Tag = PROGRESS_MAP[v]

  if (!visible) {
    return null
  }

  return <Tag className={cn(css.Progress, className)} value={value} {...otherProps} />
}

Progress.displayName = 'Progress'

export default Progress
