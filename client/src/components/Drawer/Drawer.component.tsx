import React, { useState } from 'react'
import { Drawer as MuiDrawer } from '@mui/material'

// ---| core |---
import { cn } from 'tools'
import { useFunc } from 'hooks'

// ---| pages |---
// ---| screens |---
// ---| components |---

// ---| self |---
import css from './Drawer.module.scss'

export type DrawerProps = {
  className?: string
  children?: React.ReactNode
  side?: 'left' | 'right' | 'top' | 'bottom'
  onClose?: () => void
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <Drawer />
 */
export function Drawer(props: DrawerProps): JSX.Element {
  const { side = 'right', children, className, ...otherProps } = props
  const _className = cn(css.Drawer, className)
  const [open, isOpen] = useState(false)
  const toggle = useFunc(() => isOpen((open) => !open))

  return (
    <MuiDrawer
      className={_className}
      anchor={side}
      open={open}
      onClose={toggle}
      onClick={toggle}
      {...otherProps}
    >
      {children}
    </MuiDrawer>
  )
}

Drawer.displayName = 'Drawer'

export default Drawer
