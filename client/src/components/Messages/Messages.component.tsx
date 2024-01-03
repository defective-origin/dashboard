import React from 'react'

// ---| core |---
// ---| pages |---
// ---| screens |---
// ---| components |---
import Block, { BlockWithItemsProps } from 'components/Block'
import Text, { TextProps, TextStatus } from 'components/Text'

// ---| common |---
import { cn } from 'common/tools'

// ---| self |---
import css from './Messages.module.scss'

export type MessageStatus = TextStatus
export type MessageItem = TextProps

// TODO: change to BlockProps<AlertItem>?
export type MessagesProps = BlockWithItemsProps<typeof Text>

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

  return <Block className={_className} cmp={Text.Caption} {...otherProps} />
}

Messages.displayName = 'Messages'

export default Messages
