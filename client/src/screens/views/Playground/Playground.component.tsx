import React from 'react'

// ---| core |---
import { cn } from 'tools'

// ---| screens |---
// ---| components |---
import Item, { ItemProps } from 'components/layouts/Item'
import PlaceholderCard from 'screens/cards/PlaceholderCard'

// ---| self |---
import css from './Playground.module.scss'

export type PlaygroundProps = ItemProps & {
  previewId?: string
}

/**
 * Component description.
 * @example
 * <Playground />
 */
export function Playground(props: PlaygroundProps) {
  const { previewId, children, className, ...otherProps } = props

  return (
    <Item className={cn(css.Playground, className)} {...otherProps}>
      <PlaceholderCard id={previewId} height={300} name='PLAYGROUND' />
      {children}
    </Item>
  )
}

Playground.displayName = 'Playground'

export default Playground
