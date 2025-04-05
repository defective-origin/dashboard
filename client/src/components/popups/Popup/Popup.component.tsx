import React from 'react'

// ---| core |---
import { cn } from 'tools'

// ---| pages |---
// ---| screens |---
// ---| components |---
import Tooltip, { TooltipProps } from 'components/popups/Tooltip'

// ---| self |---
import css from './Popup.module.scss'
import { useToggler } from 'hooks'

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
  const open = useToggler()

  return (
    <Tooltip
      className={_className}
      content={children}
      open={open.isOn}
      onOpen={open.on}
      onClose={open.off}
      popup
      {...otherProps}
    >
      {trigger({ open: open.isOn })}
    </Tooltip>
  )
}

Popup.displayName = 'Popup'

export default Popup
