import React from 'react'

// ---| core |---
import { cn } from 'tools'

// ---| pages |---
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
 *
 * How to use
 * @example
 * <Playground />
 */
export function Playground(props: PlaygroundProps) {
  const { previewId, children, className, ...otherProps } = props
  const _className = cn(css.Playground, className)

  return (
    <Item className={_className} stretch {...otherProps}>
      <PlaceholderCard id={previewId} height={300} name='PLAYGROUND' area='top' position='sticky' top={0} />
      {children}
    </Item>
  )
}

Playground.displayName = 'Playground'

export default Playground
