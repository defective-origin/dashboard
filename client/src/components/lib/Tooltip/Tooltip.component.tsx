import React from 'react'
import MuiTooltip, { TooltipProps as MuiTooltipProps } from '@mui/material/Tooltip'

// ---| core |---
// ---| pages |---
// ---| screens |---
// ---| components |---

// ---| common |---
import { cn } from 'common/tools'

// ---| self |---
import css from './Tooltip.module.scss'

export type TooltipProps = MuiTooltipProps & {
  className?: string
  children?: React.ReactNode
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <Tooltip />
 */
export function Tooltip(props: TooltipProps): JSX.Element {
  const { children, className, ...otherProps } = props
  const _className = cn(css.Tooltip, className)

  return (
    <MuiTooltip className={_className} arrow {...otherProps}>
      <div>
        {children}
      </div>
    </MuiTooltip>
  )
}

Tooltip.displayName = 'Tooltip'

export default Tooltip
