import React from 'react'

// ---| common |---

// ---| components |---
import Block, { BlockProps } from 'components/Block'

// ---| self |---
import { UseScrollOptions, useScroll } from './Scroll.hook'

export type ScrollProps<TElement extends HTMLElement> = BlockProps & UseScrollOptions<TElement>

/**
 * Scroll which allow to scroll by buttons.
 */
export default function Scroll<T extends HTMLDivElement>(props: ScrollProps<T>): JSX.Element {
  const {
    size = 'md',
    direction = 'y',
    buttons,
    manager,
    children,
    className,
    ...otherProps
  } = props
  const scroll = useScroll<T>({ manager, buttons, size, direction })

  return (
    <Block ref={scroll.ref} className={className} {...otherProps}>
      {children}
      {scroll.elements}
    </Block>
  )
}
