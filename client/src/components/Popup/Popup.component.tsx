import React, { forwardRef, useEffect } from 'react'

// ---| core |---
import { cn } from 'tools'

// ---| pages |---
// ---| screens |---
// ---| components |---

// ---| self |---
import css from './Popup.module.scss'

export type PopupSideVariant = 'left' | 'right' | 'top' | 'bottom'
export type PopupCernerVariant = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
export type PopupCenterVariant = 'center' | 'full'
export type PopupVariant = PopupSideVariant | PopupCernerVariant | PopupCenterVariant

export type PopupProps = {
  v?: PopupVariant
  open?: boolean
  width?: number
  indent?: number
  window?: boolean
  backdrop?: boolean
  className?: string
  containerClassName?: string
  children?: React.ReactNode
  content?: React.ReactNode
  onClose?: () => void
}

/**
 * Allows to create popup's components like: Modal, Drawer, DIalog and so on.
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
 * export const Modal = (props: PopupProps) => {
 *    const { v, ...otherProps } = props
 *    const breakpoints = useMemo(() => [
 *      new ModalBreakpoint('full', 768),
 *      new ModalBreakpoint(v),
 *    ], [v])
 *
 *    const options = useBreakpoint(breakpoints)
 *
 *    return <Popup ref={options.ref} v={options.name} {...otherProps} />
 * }
 */
export const Popup = forwardRef<HTMLDivElement, PopupProps>((props, ref): JSX.Element | null => {
  const {
    v = 'center',
    width,
    open,
    indent,
    backdrop,
    window,
    onClose,
    content,
    children = content,
    className,
    containerClassName,
    ...otherProps
  } = props
  const _className = cn(css.Popup, {
    [css.Backdrop]: backdrop,
    [css.Window]: window,
  }, className)

  useEffect(() => {
    const parent = (ref as React.MutableRefObject<HTMLDivElement | null>).current?.parentElement
    const position = parent && getComputedStyle(parent).getPropertyValue('position')
    if (position && position === 'static' && !window) {
      parent?.classList.add(css.PopupWrapper)

      return function cleanup() {
        parent?.classList.remove(css.PopupWrapper)
      }
    }
  }, [ref, window])

  if (!open) {
    return null
  }

  const containerStyles = {
    margin: indent,
    width: v === 'full' ? undefined : width,
  }

  return (
    <div ref={ref} className={_className} onClick={onClose} {...otherProps}>
      <div className={cn(css.Container, css[v], containerClassName)} style={containerStyles}>
        {children}
      </div>
    </div>
  )
})

Popup.displayName = 'Popup'

export default Popup
