import React, { useMemo } from 'react'

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

const MESSAGE_ORDER: Record<MessageColor, number> = {
  error: 0,
  warning: 1,
  info: 2,
  success: 3,
  primary: 4,
  secondary: 5,
  disable: 6,
}

export type MessageColor = TextColor
export type MessageItem = TextProps | string

export type MessagesProps = ComponentWithItems<BlockProps, MessageItem> & {
  color?: MessageColor
  sort?: boolean
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <Messages />
 */
export function Messages(props: MessagesProps): JSX.Element {
  const { sort = true, items = [], color = 'primary', children, className, ...otherProps } = props
  const _className = cn(css.Messages, className)
  const messages = useMemo(() =>
    items.map((content) =>
      typeof content === 'string'
        ? ({ color, content })
        : content,
    ).sort((a, b) => {
      if (sort) {
        return MESSAGE_ORDER[a.color ?? color] - MESSAGE_ORDER[b.color ?? color]
      }

      return 0
    })
  , [color, items, sort])

  return (
    <Block className={_className} {...otherProps}>
      <Repeat cmp={Text} items={messages} />

      {children}
    </Block>
  )
}

Messages.Message = Text
Messages.Divider = Block.Divider
Messages.Spacer = Block.Spacer

Messages.displayName = 'Messages'

export default Messages
