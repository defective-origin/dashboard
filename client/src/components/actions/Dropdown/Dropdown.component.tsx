import React from 'react'

// ---| core |---
import { cn, mix } from 'tools'

// ---| components |---
import Button from 'components/actions/Button'
import Actions from 'components/layouts/Actions'
import Popup, { PopupProps } from 'components/popups/Popup'

// ---| self |---
import css from './Dropdown.module.scss'


export type DropdownProps
  = React.ComponentProps<typeof Button>
  & Pick<PopupProps, 'trigger' | 'arrow' | 'disableHoverListener' | 'footer' | 'title' | 'onOpen' | 'onClose'> & {
    popupSide?: PopupProps['v']
    actions?: PopupProps['footer']
  }

/**
 * Component description.
 * @example
 * <Dropdown />
 */
export function Dropdown(props: DropdownProps) {
  const { disableHoverListener, actions, title, arrow, popupSide, trigger, onOpen, onClose, children, className, ...otherProps } = props
  // TODO: open on full screen on mobile

  return (
    <Popup
      arrow={arrow}
      v={popupSide}
      title={title}
      disableHoverListener={disableHoverListener}
      footer={actions && (toggler => (
        <Actions className={css.actions} size='xxs' v='row'>
          {mix.fromValOrFunc(actions, toggler)}
        </Actions>
      ))}
      trigger={trigger ?? (options => (
        <Button
          className={cn(css.Dropdown, className)}
          active={options.isOn}
          onClick={options.on}
          end={otherProps.content && 'chevron_right'}
          {...otherProps}
        />
      ))}
      onOpen={onOpen}
      onClose={onClose}
    >
      <Actions size='xxs' v='row' weight={400} format='capitalize' aligns='stretch'>
        {children}
      </Actions>
    </Popup>
  )
}

Dropdown.displayName = 'Dropdown'


export default Dropdown
