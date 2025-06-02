import React from 'react'

// ---| core |---
import { cn } from 'tools'
import { Size } from 'theme'

// ---| pages |---
// ---| screens |---
// ---| components |---
import Menu, { MenuProps } from 'components/actions/Menu'
import Link from 'components/actions/Link'
import Button from 'components/actions/Button'
import Divider from 'components/layouts/Divider'
import NavLink from 'components/actions/NavLink'
import { PropsWithItems, RepeatItem } from 'components/layouts/Repeat'
import Block, { BlockProps } from 'components/layouts/Block'

// ---| self |---
import css from './Actions.module.scss'

export const ACTION_MAP = {
  divider: Divider,
  button: Button,
  link: Link,
  nav: NavLink,
  menu: Menu,
}

export type GenericActionItem = RepeatItem<typeof ACTION_MAP>
export type CustomActionItem = React.ElementType | React.ReactNode
export type ActionWithMenu<T> = (T & { items?: ActionWithMenu<T>, hide?: boolean })
export type ActionItem = ActionWithMenu<GenericActionItem> | CustomActionItem

export type ActionsProps = PropsWithItems<ActionItem, BlockProps> & {
  menu?: MenuProps['v']
  size?: Size
}

/**
 * Component description.
 *
 * How to use
 * @example
 * const items: ActionItem[] = [
 *   <CustomItem />,
 *   <Divider v='x />,
 *   <Button v='outlined' content='ITEM 1' color='error', hide />,
 *   { variant: 'nav', v: 'outlined', content: 'ITEM 1', color: 'error', hide: true },
 *   { variant: 'link', v: 'outlined', content: 'ITEM 2', color: 'warning' },
 *   { variant: 'button', v: 'outlined', content: 'ITEM 3', color: 'info', items: [
 *      { variant: 'button', v: 'outlined', content: 'SUB ITEM 1', color: 'error', hide: true },
 *      { variant: 'button', v: 'outlined', content: 'SUB ITEM 3', color: 'warning' },
 *   ]},
 * ]
 *
 * <Actions items={items} menu='left' />
 */
export function Actions(props: ActionsProps) {
  const { size, menu, items, children, className, ...otherProps } = props
  const _className = cn(css.Actions, className)
  const menuItems = items?.map((item, idx) => {
    // custom element
    if (React.isValidElement(item) || !item) {
      return <React.Fragment key={idx}>{item}</React.Fragment>
    }

    const { variant = 'button', hide, tooltip, items, ...otherItemProps} = item as any
    const Tag = ACTION_MAP[variant as 'button']

    // hide by condition
    if (hide) {
      return null

    // submenu
    } else if (items) {
      return (
        <Menu
          key={idx}
          v={menu ?? 'bottom'}
          items={items}
          trigger={o => (
            <Tag
              size={size}
              active={o.isOn}
              {...otherItemProps}
            />
          )}
        />
      )
    }

    return <Tag key={idx} tooltip={tooltip} tooltipSide={menu} size={size} {...otherItemProps} />
  })

  return (
    <Block className={_className} aligns='center' v='x' {...otherProps}>
      {menuItems}
      {children}
    </Block>
  )
}

Actions.displayName = 'Actions'

Actions.Link = Link
Actions.Nav = NavLink
Actions.Button = Button
Actions.Menu = Menu

export default Actions
