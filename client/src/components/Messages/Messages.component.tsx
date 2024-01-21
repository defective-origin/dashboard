import React from 'react'

// ---| core |---
import { cn } from 'tools'

// ---| pages |---
// ---| screens |---
// ---| components |---
import Repeat, { ComponentWithItems } from 'components/Repeat'
import Block, { BlockProps } from 'components/Block'
import Text, { TextProps, TextColor } from 'components/Text'

// ---| self |---
import css from './Messages.module.scss'

export type MessageColor = TextColor
export type MessageItem = TextProps

export type MessagesProps = ComponentWithItems<BlockProps, MessageItem>

/**
 * Component description.
 *
 * How to use
 * @example
 * <Messages />
 */
export function Messages(props: MessagesProps): JSX.Element {
  const { items, children, className, ...otherProps } = props
  const _className = cn(css.Messages, className)

  return (
    <Block className={_className} {...otherProps}>
      <Repeat cmp={Text} items={items} />

      {children}
    </Block>
  )
}

Messages.Message = Text
Messages.Divider = Block.Divider
Messages.Spacer = Block.Spacer

Messages.displayName = 'Messages'

export default Messages
