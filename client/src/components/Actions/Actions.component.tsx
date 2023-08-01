import React from 'react'

// ---| core |---
// ---| pages |---
// ---| screens |---
// ---| components |---
import Button, { ButtonProps } from 'components/lib/Button'
import Block, { BlockProps } from 'components/Block'

// ---| common |---
import { cn } from 'common/tools'

// ---| self |---
import css from './Actions.module.scss'

export type Action = ButtonProps
export type ActionsDirectionType = 'x' | 'y' | 'xy'

export type ActionsProps = BlockProps & {
  className?: string
  children?: React.ReactNode
  items?: Action[]
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
  const { items, size, iconSize, children, className, ...otherProps } = props
  const _className = cn(css.Actions, className)
  const actions = items?.map((item, idx) => <Button key={idx} className={css.Action} size={size} iconSize={iconSize} {...item} />)

  return (
    <Block className={_className} align='center' {...otherProps}>
      {actions}

      {children}
    </Block>
  )
}

Actions.displayName = 'Actions'

export default Actions
