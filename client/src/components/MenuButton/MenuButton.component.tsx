import React from 'react'

// ---| core |---
import { cn } from 'tools'
import { useFunc } from 'hooks'

// ---| pages |---
// ---| screens |---
// ---| components |---
import Button, { ButtonProps } from 'components/Button'
import Menu, { MenuItem } from 'components/Menu'
import { ComponentWithItems } from 'components/Repeat'
import Tooltip from 'components/Tooltip'

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
  const { tooltip, items, children, className, ...otherProps } = props
  const _className = cn(css.MenuButton, className)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const onClose = useFunc(() => setAnchorEl(null))
  const onOpen = useFunc((event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget))

  // FIXME: [kseniya_boldak] fix bug with anchorEl on HTMLElement
  const item = (
    <>
      <Button className={_className} onClick={onOpen} {...otherProps} />
      <Menu
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={onClose}
        items={items}
      >
        {children}
      </Menu>
    </>
  )

  if (tooltip) {
    const tooltipProps = typeof tooltip === 'object' ? tooltip : { content: tooltip }

    return <Tooltip {...tooltipProps}>{item}</Tooltip>
  }

  return item
}

MenuButton.displayName = 'MenuButton'

export default MenuButton
