import React from 'react'
import { Popover, PopoverOrigin } from '@mui/material'

// ---| core |---
import { cn } from 'tools'

// ---| pages |---
// ---| screens |---
// ---| components |---
import { ButtonProps } from 'components/Button'
import Card from 'components/Card'

// ---| self |---
import css from './Popup.module.scss'

export type PopupVariant = 'left' | 'right' | 'top' | 'bottom' | 'center'

export const POPUP_VARIANT_MAP: Record<PopupVariant, PopoverOrigin> = {
  left: { vertical: 'top', horizontal: 'left' },
  right: { vertical: 'top', horizontal: 'right' },
  bottom: { vertical: 'bottom', horizontal: 'center' },
  top: { vertical: 'top', horizontal: 'center' },
  center: { vertical: 'center', horizontal: 'center' },
}

export type PopupProps = {
  className?: string
  children?: React.ReactNode
  open?: boolean
  title?: React.ReactNode
  content?: React.ReactNode
  actions?: ButtonProps | ButtonProps[]
  side?: PopupVariant
  onClose?: () => void
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <Popup />
 */
export function Popup(props: PopupProps): JSX.Element {
  const { title, content, actions, side = 'top', open = false, onClose, children, className, ...otherProps } = props
  const _className = cn(css.Popup, className)

  return (
    <Popover
      className={_className}
      open={open}
      anchorOrigin={POPUP_VARIANT_MAP[side]}
      onClose={onClose}
      {...otherProps}>
      {/* fragment prevent error of click listener */}
      <>
        <Card
          title={title}
          content={content}
          actions={actions}
          onClose={onClose}
        >
          {children}
        </Card>
      </>
    </Popover>
  )
}

Popup.displayName = 'Popup'

export default Popup
