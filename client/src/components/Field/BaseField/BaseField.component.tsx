import React, { useMemo } from 'react'

// ---| core |---
import { cn } from 'tools'

// ---| pages |---
// ---| screens |---
// ---| components |---
import Text from 'components/Text'
import Block, { BlockProps } from 'components/Block'
import Messages, { MessageItem } from 'components/Messages'

// ---| self |---
import css from './BaseField.module.scss'

export type BaseFieldProps = BlockProps & {
  label?: string
  messages?: MessageItem[]
  errors?: MessageItem[]
  className?: string
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <BaseField />
 */
export function BaseField(props: BaseFieldProps): JSX.Element | null {
  const { label, messages = [], errors = [], aligns, className, children, ...otherProps } = props
  const _className = cn(css.BaseField, className)
  const allMessages = useMemo(() => [...messages, ...errors], [errors, messages])

  // FIXME: rewrite on layout?
  return (
    <Block className={_className} g='xs' aligns={aligns} {...otherProps}>
      <Text.Subtitle2 content={label} />

      {children}

      <Messages items={allMessages} color='error' />
    </Block>
  )
}

BaseField.displayName = 'BaseField'

export default BaseField
