import React from 'react'
import MuiTooltip from '@mui/material/Tooltip'

// ---| core |---
import { cn } from 'tools'

// ---| pages |---
// ---| screens |---
// ---| components |---

// ---| self |---
import css from './Tooltip.module.scss'

export type TooltipVariant = 'bottom-end' | 'bottom-start' | 'bottom' | 'left-end' | 'left-start'
| 'left' | 'right-end' | 'right-start' | 'right' | 'top-end' | 'top-start'
| 'top'

export type TooltipProps = {
  className?: string
  children?: React.ReactNode
  content?: React.ReactNode
  v?: TooltipVariant
  open?: boolean
  wrapper?: React.ElementType
}

/**
 * Informative text when users hover over, focus on, or tap an element.
 *
 * How to use
 * @example
 * <Tooltip />
 */
export function Tooltip(props: TooltipProps): JSX.Element {
  const { wrapper: Wrapper = 'span', content, children, className, v, open, ...otherProps } = props
  const _className = cn(css.Tooltip, className)

  return (
    <MuiTooltip className={_className} title={content} arrow placement={v} open={open} {...otherProps}>
      <Wrapper style={{width: 'fit-content'}}>
        {children}
      </Wrapper>
    </MuiTooltip>
  )
}

Tooltip.displayName = 'Tooltip'

export default Tooltip
