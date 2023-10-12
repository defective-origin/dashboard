import React from 'react'

// ---| core |---
// ---| pages |---
// ---| screens |---
// ---| components |---
import Block, { BLOCK_ITEM_MAP, BlockItem, BlockProps } from 'components/Block'
import Button from 'components/Button'
import Link from 'components/Link'
import Text from 'components/Text'

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

export type ActionsProps = BlockProps<typeof ACTION_MAP>

/**
 * Component description.
 *
 * How to use
 * @example
 * <Actions />
 */
export function Actions(props: ActionsProps): JSX.Element {
  const { v = 'button', items, content, children, className, ...otherProps } = props
  const _className = cn(css.Actions, className)

  return (
    <Block className={_className} align='center' {...otherProps}>
      <Text.Body1 className={ css.Title } content={content} children={children} />

      <Block.Spacer />

      <Block className={ css.Items } cmp={ACTION_MAP} v={v} items={items} />
    </Block>
  )
}

Actions.displayName = 'Actions'

Actions.Divider = Block.Divider
Actions.Spacer = Block.Spacer
Actions.Link = Link
Actions.Button = Button

export default Actions
