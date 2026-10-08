import React, { useRef } from 'react'

// ---| core |---
import { useEvent, useFunc, useMode, useResizeObserver } from 'hooks'
import { Direction, px } from 'theme'
import { cn, react } from 'tools'

// ---| self |---
import './Scroll.module.scss'
import useScrollBar, { ScrollBarOptions, ScrollShift } from './UseScrollBar'

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
  top?: number
  zIndex?: number
  v?: ScrollVariant
  /** Actions offset. */
  actions?: Offset
  /** Show back buttons when scrolled on coordinate. */
  back?: Offset
  /** Extra overlay content. */
  children?: React.ReactNode
}

/**
 * Scroll which allow to scroll parent block and also by back buttons.
 * Adds position relative to parent component if parent component has position static.
 * @example
 * <div style={{ width: 5000, height: 5000 }}>
 *   <Scroll v={scroll} actions visible />
 * </div>
 */
export function Scroll(props: ScrollProps) {
  const {
    v = 'y',
    back,
    top = 0,
    zIndex,
    actions,
    children,
    className,
    container = () => overlayRef.current?.parentElement,
    ...otherOptions
  } = props
  const overlayRef = useRef<HTMLDivElement>(null)
  const backOffset = offset(back, 25)
  const actionOffset = offset(actions, 25)
  const barX = useScrollBar({ enabled: ['x', 'xy'].includes(v), v: 'x', back: backOffset?.x, container, ...otherOptions })
  const barY = useScrollBar({ enabled: ['y', 'xy'].includes(v), v: 'y', back: backOffset?.y, container, ...otherOptions })

  // TODO: fix size calculation
  // TODO: hide scroll on mobile!

  const display = useFunc((isMouseInside?: boolean) => {
    barY?.display(isMouseInside)
    barX?.display(isMouseInside)
  })

  const refresh = useFunc(() => {
    const parent = react.getElement(container)
    if (!parent) {
      return
    }

    // move overlay block
    if (overlayRef.current) {
      Object.assign(overlayRef.current.style, {
        left: px(parent.scrollLeft),
        top: px(parent.scrollTop + top),
        height: px(parent.offsetHeight - top),
        width: px(parent.offsetWidth),
      })
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
            className='scroll-actions'
            style={{ right: actionOffset.x, bottom: actionOffset.y }}
          >
            {barY?.button}
            {barX?.button}
          </div>
        )}
      </div>

      {barY?.element}
      {barX?.element}

      <div
        className='scroll-cerner'
        style={{
          marginRight: barY ? otherOptions.indent : undefined,
          marginBottom: barX ? otherOptions.indent : undefined,
        }}
      />

      {barY?.shadows}
      {barX?.shadows}
    </div>
  )
}

Scroll.displayName = 'Scroll'

export default Scroll
