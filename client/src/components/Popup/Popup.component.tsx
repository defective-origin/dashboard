import React, { useCallback, useState } from 'react'

// ---| core |---
import { cn } from 'tools'

// ---| pages |---
// ---| screens |---
// ---| components |---
import Tooltip, { TooltipProps } from 'components/Tooltip'

// ---| self |---
import css from './Popup.module.scss'

export type PopupTriggerOptions = {
  open?: boolean
}

export type PopupProps = TooltipProps & {
  children?: React.ReactNode
  trigger: (options: PopupTriggerOptions) => React.ReactElement
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <Popup
 *   trigger={(options) => (
 *      <Button
 *        active={options.isOpen}
 *        onClick={options.open}
 *        onMouseEnter={options.open}
 *        onMouseLeave={options.close}
 *      />
 *   )}
 * >
 *  Popup Content
 * </Popup>
 */
export function Popup(props: PopupProps): JSX.Element {
  const { trigger, children, className, ...otherProps } = props
  const _className = cn(css.Popup, className)
  const [open, setOpen] = useState(false)
  const onOpen = useCallback(() => setOpen(true), [])
  const onClose = useCallback(() => setOpen(false), [])

  return (
    <Tooltip
      className={_className}
      content={children}
      open={open}
      onOpen={onOpen}
      onClose={onClose}
      popup
      {...otherProps}
    >
      {trigger({ open })}
    </Tooltip>
  )
}

Popup.displayName = 'Popup'

export default Popup
