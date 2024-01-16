import React from 'react'

// ---| core |---
// ---| pages |---
// ---| screens |---
// ---| components |---
import Block, { BlockItem, BlockProps } from 'components/Block'
import Button from 'components/Button'
import Link from 'components/Link'

// ---| common |---
import { cn } from 'common/tools'

// ---| self |---
import css from './Actions.module.scss'

export const ACTION_MAP = {
  divider: Block.Divider,
  spacer: Block.Spacer,
  button: Button,
  link: Link,
}

export type ActionItem = BlockItem<typeof ACTION_MAP>

export type ActionsProps = BlockProps<typeof ACTION_MAP>

/**
 * Component description.
 *
 * How to use
 * @example
 * <Actions />
 */
export function Actions(props: ActionsProps): JSX.Element {
  const { variant = 'button', items, className, ...otherProps } = props
  const _className = cn(css.Actions, className)

  return <Block className={_className} align='center' cmp={ACTION_MAP} variant={variant} items={items} direction='x' {...otherProps} />
}

Actions.displayName = 'Actions'

Actions.Divider = Block.Divider
Actions.Spacer = Block.Spacer
Actions.Link = Link
Actions.Button = Button

export default Actions
