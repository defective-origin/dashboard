import React, { useMemo } from 'react'

// ---| core |---
import { cn } from 'tools'

// ---| pages |---
// ---| screens |---
// ---| components |---
import Repeat, { PropsWithItems } from 'components/Repeat'
import Block, { BlockProps } from 'components/Block'
import Text, { TextProps, TextColor, TextSize } from 'components/Text'

// ---| self |---
import css from './Messages.module.scss'

const MESSAGE_ORDER: Record<MessageColor, number> = {
  error: 0,
  warning: 1,
  info: 2,
  success: 3,
  primary: 4,
  secondary: 5,
  contrast: 6,
  bg: 7,
}

export type MessageColor = TextColor
export type MessageItem = TextProps | string

export type MessagesProps = PropsWithItems<MessageItem, BlockProps> & {
  color?: MessageColor
  sort?: boolean
  size?: TextSize
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <Messages />
 */
export function Messages(props: MessagesProps): JSX.Element {
  const { size, sort = true, items = [], color = 'primary', children, className, ...otherProps } = props
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
      <Repeat cmp={Text} items={messages} size={size} />

      {children}
    </Block>
  )
}

Messages.Item = Text

Messages.displayName = 'Messages'

export default Messages
