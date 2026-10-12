import React from 'react'

// ---| core |---
import { cn, mix } from 'tools'

// ---| components |---
import Button from 'components/actions/Button'
import Popup, { PopupProps } from 'components/popups/Popup'
import Actions, { ActionsProps } from 'components/layouts/Actions'

// ---| self |---
import css from './Dropdown.module.scss'


export type DropdownProps
  = React.ComponentProps<typeof Button>
  & Pick<ActionsProps, 'menu'>
  & Pick<PopupProps, 'trigger' | 'arrow' | 'disableHoverListener' | 'title' | 'onOpen' | 'onClose' | 'minWidth' | 'g' | 'side'> & {
    actions?: PopupProps['footer']
  }

/**
 * Component description.
 * @example
 * <Dropdown />
 */
export function Dropdown(props: DropdownProps) {
  const { g, menu, minWidth, disableHoverListener, actions, title, arrow, side, trigger, onOpen, onClose, children, className, ...otherProps } = props
  const arrowIcon = (!side || side.startsWith('top') || side.startsWith('bottom')) ? 'arrow_drop_down' : 'arrow_right'
  // TODO: open on full screen on mobile

  return (
    <Popup
      p={menu ? 'xxs 0' : undefined}
      arrow={arrow}
      side={side}
      title={title}
      minWidth={minWidth}
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
          end={otherProps.content && arrowIcon}
          {...otherProps}
        />
      ))}
      onOpen={onOpen}
      onClose={onClose}
    >
      <Actions size='xs' v='y' g={g} weight={400} format='capitalize' aligns='stretch' menu={menu}>
        {children}
      </Actions>
    </Popup>
  )
}

Dropdown.displayName = 'Dropdown'


export default Dropdown
