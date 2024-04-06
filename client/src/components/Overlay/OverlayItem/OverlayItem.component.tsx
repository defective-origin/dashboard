import React, { forwardRef } from 'react'

// ---| core |---
import { cn } from 'tools'

// ---| pages |---
// ---| screens |---
// ---| components |---

// ---| self |---
import css from './OverlayItem.module.scss'

export type OverlaySideVariant = 'left' | 'right' | 'top' | 'bottom'
export type OverlaySideCernerVariant = 'left-center' | 'right-center' | 'top-center' | 'bottom-center'
export type OverlayCernerVariant = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
export type OverlayCenterVariant = 'center' | 'full'
export type OverlayVariant = OverlaySideVariant | OverlaySideCernerVariant | OverlayCernerVariant | OverlayCenterVariant

export type OverlayItemProps = React.HTMLAttributes<HTMLDivElement> & {
  v?: OverlayVariant
  width?: number | string
  height?: number | string
  indent?: number | string
}

/**
 * Overlay placed item.
 *
 * How to use
 * @example
 * <OverlayItem v="center" indent={10} />
 */
export const OverlayItem = forwardRef<HTMLDivElement, OverlayItemProps>((props, ref): JSX.Element => {
  const {
    v = 'center',
    width,
    height,
    indent,
    style,
    className,
    ...otherProps
  } = props
  const _className = cn(css.OverlayItem, css[v], className)
  const styles = {
    ...style,
    margin: indent,
    width: v === 'full' ? undefined : width,
    height: v === 'full' ? undefined : height,
  }

  return <div ref={ref} className={_className} style={styles} {...otherProps} />
})

OverlayItem.displayName = 'OverlayItem'

export default OverlayItem
