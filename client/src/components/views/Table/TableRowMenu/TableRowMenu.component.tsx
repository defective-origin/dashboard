import React from 'react'

// ---| core |---
import { cn } from 'tools'

// ---| pages |---
// ---| screens |---
// ---| components |---
import Button from 'components/actions/Button'
import Menu, { MenuItem, MenuProps } from 'components/actions/Menu'

// ---| self |---
import css from './TableRowMenu.module.scss'
import { TableColumn, TableRecord } from '../Table.type'

export type TableRowMenuItem = MenuItem
export type TableRowMenuProps<T extends TableRecord> = Omit<MenuProps, 'trigger'> & {
  record?: T
  column?: TableColumn<T>
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <TableRowMenu />
 */
export function TableRowMenu<T extends TableRecord>(props: TableRowMenuProps<T>): JSX.Element {
  const { record, column, items, className, ...otherProps } = props
  const _className = cn(css.TableRowMenu, className)

  return (
    <Menu
      v='left'
      items={items}
      className={_className}
      trigger={(o) => <Button start='more_vert' active={o.open} clear />}
      {...otherProps}
    />
  )
}

TableRowMenu.displayName = 'TableRowMenu'

export default TableRowMenu
