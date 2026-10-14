import React from 'react'

// ---| core |---
import { cn } from 'tools'

// ---| components |---
import Dropdown, { DropdownProps } from 'components/actions/Dropdown'

// ---| self |---
import css from './TableRowMenu.module.scss'


export type TableRowMenuProps = DropdownProps

/**
 * Component description.
 * @example
 * <TableRowMenu />
 */
export function TableRowMenu(props: TableRowMenuProps) {
  const { className, ...otherProps } = props

  return <Dropdown className={cn(css.TableRowMenu, className)} start='more_vert' menu arrow {...otherProps} />
}

TableRowMenu.displayName = 'TableRowMenu'

export default TableRowMenu
