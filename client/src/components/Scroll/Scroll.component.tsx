import React from 'react'

// ---| components |---
// ---| common |---
// ---| self |---
import { UseScrollOptions, useScroll } from './Scroll.hook'

export type ScrollProps<TElement extends HTMLElement> = UseScrollOptions<TElement> & {
  className?: string
  children?: React.ReactNode
}

/**
 * Scroll which allow to scroll by buttons.
 */
export default function Scroll<T extends HTMLDivElement>(props: ScrollProps<T>): JSX.Element {
  const {
    size = 'md',
    direction = 'xy',
    buttons,
    manager,
    children,
    className,
    ...otherProps
  } = props
  const scroll = useScroll<T>({ manager, buttons, size, direction })

  return (
    <div ref={scroll.ref} className={className} {...otherProps}>
      {children}
      {scroll.elements}
    </div>
  )
}
