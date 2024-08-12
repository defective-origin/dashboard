import React, { useRef } from 'react'

// ---| core |---
import { useElement, useEvent, useFunc, useMode, useResizeObserver } from 'hooks'
import { Direction } from 'theme'
import { cn } from 'tools'

// ---| self |---
import './Scroll.module.scss'
import useScrollBar, { ScrollBarOptions, ScrollShift, px } from './UseScrollBar'

export type Offset = boolean | ScrollShift | {
  x: ScrollShift
  y: ScrollShift
}

const offset = (value: Offset, defaultValue = 0) => {
  if (typeof value === 'number') {
    return { x: value, y: value }
  } else if (typeof value === 'object') {
    return value
  }

  return { x: defaultValue, y: defaultValue }
}

export type ScrollVariant = Direction

export type ScrollProps = Omit<ScrollBarOptions, 'v' | 'enabled' | 'back'> & {
  /** Shift scroll from top */
  top?: number;
  zIndex?: number;
  v?: ScrollVariant
  /** Actions offset. */
  actions?: Offset
  /** Show back buttons when scrolled on coordinate. */
  back?: Offset
  /** Extra overlay content. */
  children?: React.ReactNode
  trackClassName?: string
  cernerClassName?: string,
  actionsClassName?: string
}

/**
 * Scroll which allow to scroll parent block and also by back buttons.
 * Adds position relative to parent component if parent component has position static.
 *
 * How to use
 * @example
 * <div style={{ width: 5000, height: 5000 }}>
 *   <Scroll v={scroll} actions visible />
 * </div>
 */
export function Scroll(props: ScrollProps): JSX.Element | null {
  const {
    v = 'y',
    back,
    top = 0,
    zIndex,
    actions,
    children,
    className,
    trackClassName,
    cernerClassName,
    actionsClassName,
    container = () => overlayRef.current?.parentElement,
    ...otherOptions
  } = props
  const overlayRef = useRef<HTMLDivElement>(null)
  const containerRef = useElement(container)
  const backOffset = offset(back, 50)
  const actionOffset = offset(actions, 50)
  const hasBarX = ['x', 'xy'].includes(v)
  const hasBarY = ['y', 'xy'].includes(v)
  const barX = useScrollBar({ enabled: hasBarX, v: 'x', back: backOffset?.x, className: trackClassName, container, ...otherOptions })
  const barY = useScrollBar({ enabled: hasBarY, v: 'y', back: backOffset?.y, className: trackClassName, container, ...otherOptions })


  const display = useFunc((isMouseInside?: boolean) => {
    barY?.display(isMouseInside)
    barX?.display(isMouseInside)
  })

  const refresh = useFunc(() => {
    const parent = containerRef.current
    if (!parent) {
      return
    }

    // move overlay block
    if (overlayRef.current) {
      overlayRef.current.style.left = px(parent.scrollLeft)
      overlayRef.current.style.top = px(parent.scrollTop + top)
      overlayRef.current.style.height = px(parent.offsetHeight - top)
      overlayRef.current.style.width = px(parent.offsetWidth)
    }

    // resize scrollbars
    barY?.refresh(parent.offsetHeight, parent.scrollHeight, parent.scrollTop)
    barX?.refresh(parent.offsetWidth, parent.scrollWidth, parent.scrollLeft)
  })

  // set class names with styles on parent element
  useMode(container, 'scroll', `scroll--${v}`)

  // resize scroll on container resize and scroll
  useResizeObserver(refresh, { ref: container })
  useEvent('scroll', refresh, { ref: container })

  // show/hide scrollbars on container hover
  useEvent('mouseover', () => display(true), { ref: container })
  useEvent('mouseout', () => display(false), { ref: container })

  // attach overlay anchor ref for getting parent if container selector is not provided
  return (
    <div className={cn('scroll-overlay', className)} ref={overlayRef} style={{ zIndex }}>
      <div className='scroll-content'>
        {children}

        {actions && (
          <div
            className={cn('scroll-actions', actionsClassName)}
            style={{ left: actionOffset.x, bottom: actionOffset.y }}
          >
            {barY?.button}
            {barX?.button}
          </div>
        )}
      </div>

      {barY?.element}
      {barX?.element}

      <div
        className={cn('scroll-cerner', cernerClassName)}
        style={{
          marginRight: hasBarY ? otherOptions.indent : undefined,
          marginBottom: hasBarX ? otherOptions.indent : undefined,
        }}
      />

      {barY?.shadows}
      {barX?.shadows}
    </div>
  )
}

Scroll.displayName = 'Scroll'

export default Scroll
