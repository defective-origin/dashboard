import React from 'react'
import { MenuList } from '@mui/material'

// ---| core |---
import { cn } from 'tools'
import { Size } from 'theme'

// ---| pages |---
// ---| screens |---
// ---| components |---
import Popup, { PopupProps, PopupTriggerOptions } from 'components/popups/Popup'

// ---| self |---
import css from './Menu.module.scss'
import MenuItem, { MenuItemProps } from './MenuItem'

export type MenuTriggerOptions = PopupTriggerOptions
export type MenuItem = React.ReactNode | MenuItemProps & { items?: MenuItem[] }

export type MenuProps = PopupProps & {
  size?: Size
  items?: MenuItem[]
  horizontal?: boolean
}


/**
 * Allows to show menu around component.
 *
 * Note: Component should have forwardRef.
 *
 * How to use
 * @example
 * const items: MenuItem[] = [
 *   <CustomItem />,
 *   { variant: 'nav', v: 'outlined', content: 'ITEM 1', color: 'error', hide: true },
 *   { variant: 'link', v: 'outlined', content: 'ITEM 2', color: 'warning' },
 *   { variant: 'button', v: 'outlined', content: 'ITEM 3', color: 'info', items: [
 *      { variant: 'button', v: 'outlined', content: 'SUB ITEM 1', color: 'error', hide: true },
 *      { variant: 'button', v: 'outlined', content: 'SUB ITEM 3', color: 'warning' },
 *   ]},
 * ]
 *
 * <Menu
 *    items={items}
 *    trigger={(options) => (
 *      <Button
 *        active={options.isOn}
 *        onClick={options.on}
 *        onMouseEnter={options.on}
 *        onMouseLeave={options.off}
 *      />
 *   )}
 * />
 */
export function Menu(props: MenuProps) {
  const { size = 'xxs', horizontal, v = 'right', items, children, className, ...otherProps } = props
  const _className = cn(css.Menu, className)
  const tooltipSide = horizontal ? 'top' : 'right'
  const generatedItems = items?.map((item, idx) => {
    // custom element
    if (React.isValidElement(item) || !item) {
      return <MenuItem key={idx} size={size} children={item} />
    }

    const { hide, items, ...otherItemProps } = item as MenuItemProps

    // hide by condition
    if (hide) {
      return null

    // submenu
    } else if (items) {
      return (
        <Menu
          key={idx}
          items={items}
          trigger={o => <MenuItem triggerOptions={o} {...otherItemProps} />}
        />
      )
    }

    return <MenuItem key={idx} size={size} tooltipSide={tooltipSide} {...otherItemProps} />
  })

  return (
    <Popup className={_className} v={v} {...otherProps}>
      <MenuList className={cn(css.MenuList, horizontal && css.Horizontal)}>
        {generatedItems}

        {children}
      </MenuList>
    </Popup>
  )
}

Menu.displayName = 'Menu'

Menu.Item = MenuItem

export default Menu
