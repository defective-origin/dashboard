import React from 'react'
import { ButtonGroup as ButtonGroupMui } from '@mui/material'

// ---| core |---
import { cn } from 'tools'

// ---| pages |---
// ---| screens |---
// ---| components |---
import Button, { ButtonProps } from 'components/actions/Button'

// ---| self |---
import css from './ButtonGroup.module.scss'

export type ButtonGroupProps = {
  items?: ButtonProps[]
  className?: string
  children?: React.ReactNode
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <ButtonGroup />
 */
export function ButtonGroup(props: ButtonGroupProps) {
  const { items = [], className, ...otherProps } = props
  const _className = cn(css.ButtonGroup, className)

  return (
    <ButtonGroupMui className={_className} variant='outlined' {...otherProps}>
      {items.map(item => <Button size='sm' {...item} />)}
    </ButtonGroupMui>
  )
}

ButtonGroup.displayName = 'ButtonGroup'

export default ButtonGroup
