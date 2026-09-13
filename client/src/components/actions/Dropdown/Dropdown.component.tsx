import React from 'react'

// ---| core |---
import { cn, mix } from 'tools'

// ---| pages |---
// ---| screens |---
// ---| components |---
import Button from 'components/actions/Button'
import Popup, { PopupProps } from 'components/popups/Popup'

// ---| self |---
import css from './Dropdown.module.scss'
import Actions from 'components/layouts/Actions'


export type DropdownProps
  = React.ComponentProps<typeof Button>
  & Pick<PopupProps, 'trigger' | 'arrow' | 'disableHoverListener' | 'footer' | 'title'> & {
    popupSide?: PopupProps['v']
    actions?: PopupProps['footer']
  }

/**
 * Component description.
 * @example
 * <Dropdown />
 */
export function Dropdown(props: DropdownProps) {
  const { disableHoverListener, actions, title, arrow, popupSide, trigger, children, className, ...otherProps } = props
  // TODO: open on full screen on mobile

  return (
    <Popup
      arrow={arrow}
      v={popupSide}
      title={title}
      disableHoverListener={disableHoverListener}
      footer={toggler => (
        <Actions size='xxs'>
          {mix.fromValOrFunc(actions, toggler)}
        </Actions>
      )}
      trigger={trigger ?? (options => (
        <Button
          className={cn(css.Dropdown, className)}
          active={options.isOn}
          onClick={options.on}
          {...otherProps}
        />
      ))}
    >
      {children}
    </Popup>
  )
}

Dropdown.displayName = 'Dropdown'


export default Dropdown
