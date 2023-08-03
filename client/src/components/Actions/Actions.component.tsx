import React from 'react'

// ---| core |---
// ---| pages |---
// ---| screens |---
// ---| components |---
import Button, { ButtonProps } from 'components/lib/Button'
import Block, { BLOCK_ITEM_MAP, BlockItem, BlockProps } from 'components/Block'
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
  size?: ButtonProps['size']
  iconSize?: ButtonProps['iconSize']
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

  return <Block className={_className} align='center' map={ACTION_MAP} defaultType='button' {...otherProps} />
}

Actions.displayName = 'Actions'

Actions.Divider = Block.Divider
Actions.Spacer = Block.Spacer
Actions.Link = Link
Actions.Button = Button

export default Actions
