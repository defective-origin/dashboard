import React from 'react'

// ---| core |---
// ---| pages |---
// ---| screens |---
// ---| components |---
import Block, { BlockProps } from 'components/Block'
import Text, { TextProps, TextColor } from 'components/Text'

// ---| common |---
import { cn } from 'common/tools'

// ---| self |---
import css from './Messages.module.scss'

export type MessageColor = TextColor
export type MessageItem = TextProps

export type MessagesProps = BlockProps<typeof Text>

/**
 * Component description.
 *
 * How to use
 * @example
 * <Messages />
 */
export function Messages(props: MessagesProps): JSX.Element {
  const { className, ...otherProps } = props
  const _className = cn(css.Messages, className)

  return <Block className={_className} cmp={Text} {...otherProps} />
}

Messages.displayName = 'Messages'

export default Messages
