import React, { useCallback } from 'react'

// ---| core |---
import { cn } from 'tools'

// ---| pages |---
// ---| screens |---
// ---| components |---
import Button, { ButtonProps } from 'components/Button'
import Menu, { MenuItem } from '../Menu'
import { ComponentWithItems } from 'components/Repeat'

// ---| self |---
import css from './MenuButton.module.scss'

export type MenuButtonProps = ComponentWithItems<ButtonProps, MenuItem>

/**
 * Component description.
 *
 * How to use
 * @example
 * <Menu />
 */
export function MenuButton(props: MenuButtonProps): JSX.Element {
  const { items, children, className, ...otherProps } = props
  const _className = cn(css.MenuButton, className)

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const onMenuOpen = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }, [])

  const onMenuClose = useCallback(() => setAnchorEl(null), [])

  return (
    <>
      <Button className={_className} onClick={onMenuOpen} {...otherProps} />
      <Menu
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={onMenuClose}
        items={items}
      >
        {children}
      </Menu>
    </>
  )
}

MenuButton.displayName = 'MenuButton'

export default MenuButton
