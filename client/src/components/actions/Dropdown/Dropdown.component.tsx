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
  & Pick<PopupProps, 'trigger' | 'arrow' | 'disableHover' | 'title' | 'onOpen' | 'onClose' | 'minWidth' | 'g' | 'side'> & {
    actions?: PopupProps['footer']
    menu?: boolean
  }

/**
 * Component description.
 * @example
 * <Dropdown />
 */
export function Dropdown(props: DropdownProps) {
  const { g, menu, minWidth, disableHover, actions, title, arrow, side, trigger, onOpen, onClose, children, className, ...otherProps } = props
  const arrowIcon = (!side || side.startsWith('top') || side.startsWith('bottom')) ? 'arrow_drop_down' : 'arrow_right'
  // TODO: open on full screen on mobile

  return (
    <Popup
      p={menu ? 'xxs 0' : undefined}
      role='menu'
      arrow={arrow}
      side={side}
      title={title}
      minWidth={minWidth}
      disableHover={disableHover}
      footer={actions && (toggler => (
        <Actions className={css.actions} size='xxs' v='row' separate group>
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
      <Actions size='xs' v='y' g={g} weight={400} group>
        {children}
      </Actions>
    </Popup>
  )
}

Dropdown.displayName = 'Dropdown'


export default Dropdown
