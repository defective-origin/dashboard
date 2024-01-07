import React from 'react'

// ---| core |---
// ---| pages |---
// ---| screens |---
// ---| components |---
import Button, { ButtonProps } from 'components/Button'
import Menu, { MenuProps } from '../Menu'

// ---| common |---
import { cn } from 'common/tools'

// ---| self |---
import css from './MenuButton.module.scss'

export type MenuButtonProps = ButtonProps & {
  items?: MenuProps['items']
}

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

  const onMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const onMenuClose = () => setAnchorEl(null)

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
