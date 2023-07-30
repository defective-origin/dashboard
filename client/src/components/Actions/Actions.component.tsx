import React from 'react'

// ---| core |---
// ---| pages |---
// ---| screens |---
// ---| components |---
import Button, { ButtonProps } from 'components/lib/Button'

// ---| common |---
import { cn, wk } from 'common/tools'

// ---| self |---
import css from './Actions.module.scss'

export type Action = ButtonProps
export type ActionsDirectionType = 'x' | 'y' | 'xy'

export type ActionsProps = {
  className?: string
  children?: React.ReactNode
  items?: Action[]
  direction?: ActionsDirectionType
  gap?: React.CSSProperties['gap']
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
  const { items, direction = 'x', gap = 5, size, iconSize, children, className, ...otherProps } = props
  const _className = cn(css.Actions, css[direction], className)
  const actions = items?.map((item, idx) => <Button key={idx} className={css.Action} size={size} iconSize={iconSize} {...item} />)

  return (
    <div className={_className} {...otherProps} style={{ gap }}>
      {actions}

      {children}
    </div>
  )
}

Actions.displayName = 'Actions'

export default Actions
