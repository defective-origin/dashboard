import React from 'react'

// ---| core |---
import { cn, jss } from 'tools'
import { Color, Size, toColor, toSize } from 'theme'

// ---| self |---
import css from './Progress.module.scss'

const ICON_SIZE = 40
const ICON_THICKNESS = 3.6

export type ProgressProps = {
  size?: Size
  color?: Color
  className?: string
}

/**
 * Component description.
 * @example
 * <Progress />
 */
export function Progress(props: ProgressProps) {
  const { size, color, className, ...otherProps } = props

  return (
    <div
      className={cn(css.Progress, jss({ height: toSize('icon', size) }), className)}
      role='progressbar'
      {...otherProps}
    >
      <svg className={css.svg} viewBox={`0 0 ${ICON_SIZE} ${ICON_SIZE}`}>
        <circle
          className={css.circle}
          cx={ICON_SIZE / 2}
          cy={ICON_SIZE / 2}
          r={(ICON_SIZE - ICON_THICKNESS) / 2}
          fill='none'
          stroke={color ? toColor(color) : 'currentColor'}
          strokeWidth={ICON_THICKNESS}
          strokeLinecap='round'
        />
      </svg>
    </div>
  )
}

Progress.displayName = 'Progress'

export default Progress
