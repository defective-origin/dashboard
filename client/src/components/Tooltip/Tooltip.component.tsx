import React from 'react'
import MuiTooltip, { TooltipProps as MuiTooltipProps } from '@mui/material/Tooltip'

// ---| core |---
import { cn } from 'tools'

// ---| pages |---
// ---| screens |---
// ---| components |---

// ---| self |---
import css from './Tooltip.module.scss'

export type TooltipProps = Pick<MuiTooltipProps, 'placement'> & {
  className?: string
  children?: React.ReactNode
  content?: React.ReactNode
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <Tooltip />
 */
export function Tooltip(props: TooltipProps): JSX.Element {
  const { content, children, className, ...otherProps } = props
  const _className = cn(css.Tooltip, className)

  return (
    <MuiTooltip className={_className} title={content} arrow {...otherProps}>
      <div>
        {children}
      </div>
    </MuiTooltip>
  )
}

Tooltip.displayName = 'Tooltip'

export default Tooltip
