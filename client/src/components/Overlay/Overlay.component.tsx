import React, { forwardRef, useEffect } from 'react'

// ---| core |---
import { cn } from 'tools'

// ---| pages |---
// ---| screens |---
// ---| components |---

// ---| self |---
import css from './Overlay.module.scss'
import OverlayItem from './OverlayItem'

export type OverlayProps = React.HTMLAttributes<HTMLDivElement> & {
  window?: boolean
  backdrop?: boolean
}

/**
 * Allows to create overlay's components like: Modal, Drawer, DIalog and so on.
 * Adds position relative to parent component if parent component has position static.
 *
 * How to use
 * @example
 * export class ModalBreakpoint implements Breakpoint {
 *   constructor(
 *     public name?: string,
 *     public size = Number.MAX_SAFE_INTEGER,
 *   ) {}
 * }
 *
 * export const Modal = (props: OverlayProps) => {
 *    const { v, children, ...otherProps } = props
 *    const breakpoints = useMemo(() => [
 *      new ModalBreakpoint('full', 768),
 *      new ModalBreakpoint(v),
 *    ], [v])
 *
 *    const breakpoint = useBreakpoint(breakpoints)
 *
 *    return (
 *      <Overlay ref={breakpoint.ref} {...otherProps}>
 *        <Overlay.Item v={breakpoint.name}>
 *          {children}
 *        </Overlay.Item>
 *      </Overlay>
 *    )
 * }
 */
export const Overlay = forwardRef<HTMLDivElement, OverlayProps>((props, ref): JSX.Element => {
  const {
    backdrop,
    window,
    className,
    ...otherProps
  } = props
  const _className = cn(css.Overlay, {
    [css.Backdrop]: backdrop,
    [css.Window]: window,
  }, className)

  useEffect(() => {
    const parent = (ref as React.MutableRefObject<HTMLDivElement | null>).current?.parentElement
    const position = parent && getComputedStyle(parent).getPropertyValue('position')
    if (position && position === 'static' && !window) {
      parent?.classList.add(css.OverlayWrapper)

      return () => parent?.classList.remove(css.OverlayWrapper)
    }
  }, [ref, window])

  return <div ref={ref} className={_className} {...otherProps} />
})

Overlay.displayName = 'Overlay'

Overlay.Item = OverlayItem

export default Overlay
