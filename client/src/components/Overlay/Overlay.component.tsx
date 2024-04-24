import React, { useRef } from 'react'

// ---| core |---
import { cn } from 'tools'
import { ElementOptions, useMode } from 'hooks'

// ---| pages |---
// ---| screens |---
// ---| components |---

// ---| self |---
import css from './Overlay.module.scss'

export type OverlaySideVariant = 'left' | 'right' | 'top' | 'bottom'
export type OverlaySideCernerVariant = 'left-center' | 'right-center' | 'top-center' | 'bottom-center'
export type OverlayCernerVariant = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
export type OverlayCenterVariant = 'center' | 'full'
export type OverlayVariant = OverlaySideVariant | OverlaySideCernerVariant | OverlayCernerVariant | OverlayCenterVariant

export type OverlayProps = React.HTMLAttributes<HTMLDivElement> & {
  v?: OverlayVariant
  width?: React.CSSProperties['width']
  height?: React.CSSProperties['height']
  indent?: React.CSSProperties['margin']
  window?: boolean
  backdrop?: boolean
  contentClassName?: string
  /** Set class name on overlay container when overlay mounted. */
  containerClassName?: string
  /** Container selector. If not passed then takes first parent node. */
  container?: ElementOptions<HTMLElement>
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
 *      <Overlay ref={breakpoint.ref} v={breakpoint.name} indent={10} {...otherProps}>
 *        {children}
 *      </Overlay>
 *    )
 * }
 */
export function Overlay(props: OverlayProps): JSX.Element {
  const {
    v = 'center',
    width,
    height,
    indent,
    backdrop,
    window,
    container = () => overlayRef.current?.parentElement,
    className,
    contentClassName,
    containerClassName,
    children,
    ...otherProps
  } = props
  const overlayRef = useRef<HTMLDivElement>(null)
  const _className = cn(css.Overlay, {
    [css.Backdrop]: backdrop,
    [css.Window]: window,
  }, className)

  const _contentClassName = cn(css.OverlayContent, css[v], contentClassName)
  const styles = {
    margin: indent,
    width: v === 'full' ? undefined : width,
    height: v === 'full' ? undefined : height,
  }

  useMode(container, containerClassName, (element) => {
    const position = element && getComputedStyle(element).getPropertyValue('position')
    if (position && position === 'static' && !window) {
      return css.OverlayContainer
    }
  })

  return (
    <div className={_className} ref={overlayRef}>
      <div className={_contentClassName} style={styles} {...otherProps}>
        {children}
      </div>
    </div>
  )
}

Overlay.displayName = 'Overlay'

export default Overlay
