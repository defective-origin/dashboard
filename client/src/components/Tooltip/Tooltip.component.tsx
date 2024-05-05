import React from 'react'
import MuiTooltip, { TooltipProps as MuiTooltipProps } from '@mui/material/Tooltip'

// ---| core |---
import { cn } from 'tools'

// ---| pages |---
// ---| screens |---
// ---| components |---

// ---| self |---
import css from './Tooltip.module.scss'

const POPUP_STYLE = { tooltip: { style: {margin: 0, padding: 0, background: '#FFF', border: 'var(--border)' } } }

export type TooltipVariant =
|'bottom-start' | 'bottom' | 'bottom-end'
| 'left-start' | 'left' | 'left-end'
| 'right-start' | 'right' | 'right-end'
| 'top-start' | 'top' | 'top-end'


export type TooltipProps = {
  className?: string
  children?: React.ReactNode
  content?: React.ReactNode
  v?: TooltipVariant
  open?: boolean
  popup?: boolean
  wrapper?: React.ElementType
  onOpen?: MuiTooltipProps['onOpen']
  onClose?: MuiTooltipProps['onClose']
}

/**
 * Informative text when users hover over, focus on, or tap an element.
 *
 * How to use
 * @example
 * <Tooltip />
 */
export function Tooltip(props: TooltipProps): JSX.Element {
  const { onOpen, onClose, popup, wrapper: Wrapper = 'span', content, children, className, v = 'top', open, ...otherProps } = props
  const _className = cn(css.Tooltip, className)

  // TODO: remove wrapper
  return (
    <MuiTooltip
      className={_className}
      title={content}
      arrow={!popup}
      placement={v}
      open={open}
      componentsProps={popup ? POPUP_STYLE : undefined}
      onOpen={onOpen}
      onClose={onClose}
      {...otherProps}
    >
      <Wrapper style={{width: 'fit-content'}}>
        {children}
      </Wrapper>
    </MuiTooltip>
  )
}

Tooltip.displayName = 'Tooltip'

export default Tooltip
