import React, { useState } from 'react'
import { Dialog as MuiDialog } from '@mui/material'

// ---| core |---
import { cn } from 'tools'
import { useFunc } from 'hooks'

// ---| pages |---
// ---| screens |---
// ---| components |---
import Card from 'components/Card'

// ---| self |---
import css from './Dialog.module.scss'

export type DialogProps = {
  className?: string
  children?: React.ReactNode
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <Dialog />
 */
export function Dialog(props: DialogProps): JSX.Element {
  const { children, className, ...otherProps } = props
  const _className = cn(css.Dialog, className)
  const [open, isOpen] = useState(false)
  const toggle = useFunc(() => isOpen((open) => !open))

  // TODO: [kseniya_boldak] create DialogButton
  return (
    <MuiDialog
      className={_className}
      open={open}
      onClose={toggle}
      {...otherProps}
    >
      {children}
    </MuiDialog>
  )
}

Dialog.displayName = 'Dialog'

Dialog.Title = Card.Header
Dialog.Content = Card.Content
Dialog.Actions = Card.Actions

export default Dialog
