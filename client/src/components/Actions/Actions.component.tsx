import React from 'react'
// TODO: (tikhon_puntus) remove all react imports

// ---| core |---
import { cn } from 'tools'

// ---| pages |---
// ---| screens |---
// ---| components |---
import Link from 'components/Link'
import Button from 'components/Button'
import Repeat, { ComponentWithItems, RepeatItem } from 'components/Repeat'
import Block, { BlockProps } from 'components/Block'

// ---| self |---
import css from './Actions.module.scss'

export const ACTION_MAP = {
  button: Button,
  link: Link,
}

export type ActionItem = RepeatItem<typeof ACTION_MAP>

export type ActionsProps = ComponentWithItems<BlockProps, ActionItem>

/**
 * Component description.
 *
 * How to use
 * @example
 * <Actions />
 */
export function Actions(props: ActionsProps): JSX.Element {
  const { items, children, className, ...otherProps } = props
  const _className = cn(css.Actions, className)

  return (
    <Block className={_className} align='center' direction='x' {...otherProps}>
      <Repeat cmp={ACTION_MAP} items={items} variant='button' />

      {children}
    </Block>
  )
}

Actions.displayName = 'Actions'

Actions.Link = Link
Actions.Button = Button

export default Actions
