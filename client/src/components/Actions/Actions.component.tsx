import React from 'react'

// ---| core |---
// ---| pages |---
// ---| screens |---
// ---| components |---
import Block, { BLOCK_ITEM_MAP, BlockItem, BlockProps } from 'components/Block'
import Button from 'components/lib/Button'
import Link from 'components/lib/Link'

// ---| common |---
import { cn } from 'common/tools'

// ---| self |---
import css from './Actions.module.scss'

export const ACTION_MAP = {
  ...BLOCK_ITEM_MAP,
  button: Button,
  link: Link,
}

export type Action = BlockItem<typeof ACTION_MAP>

export type ActionsProps = BlockProps<typeof ACTION_MAP> & {
  className?: string
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <Actions />
 */
export function Actions(props: ActionsProps): JSX.Element {
  const { className, ...otherProps } = props
  const _className = cn(css.Actions, className)

  return <Block className={_className} align='center' cmp={ACTION_MAP} v='button' {...otherProps} />
}

Actions.displayName = 'Actions'

Actions.Divider = Block.Divider
Actions.Spacer = Block.Spacer
Actions.Link = Link
Actions.Button = Button

export default Actions
