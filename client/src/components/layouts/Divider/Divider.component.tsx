import React from 'react'

// ---| core |---
import { cn } from 'tools'
import { Direction } from 'theme'

// ---| components |---
import Text from 'components/views/Text'

// ---| self |---
import css from './Divider.module.scss'


export type DividerVariant = Exclude<Direction, 'xy'> | `${Exclude<Direction, 'xy'>}-${'start' | 'center' | 'end'}`
export type DividerProps = {
  v?: DividerVariant
  content?: React.ReactNode
  className?: string
  children?: React.ReactNode
}

/**
 * Allows separate content.
 * @example
 * <Divider v='y' />
 * <Divider v='y-start' content='text' />
 * <Divider v='y-center' content='text' />
 * <Divider v='y-end' content='text' />
 */
export function Divider(props: DividerProps) {
  const { content, v ='x', className, children, ...otherProps } = props
  const text = content || children

  if (!text) {
    return <hr className={cn(css.Divider, css[v], className)} {...otherProps} />
  }

  return (
    <div className={cn(css.Divider, css[v], className)} {...otherProps}>
      <Text className={css.content} v='span' size='xxs' content={text} />
    </div>
  )
}

Divider.displayName = 'Divider'

export default Divider
