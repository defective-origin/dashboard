import React from 'react'

// ---| core |---
import { cn } from 'tools'

// ---| components |---
import Dropdown, { DropdownProps } from 'components/actions/Dropdown'

// ---| self |---
import css from './TableRowMenu.module.scss'
import { TableColumn, TableRecord } from '../Table.types'


export type TableRowMenuProps<T extends TableRecord> = DropdownProps & {
  record?: T
  column?: TableColumn<T>
}

/**
 * Component description.
 * @example
 * <TableRowMenu />
 */
export function TableRowMenu<T extends TableRecord>(props: TableRowMenuProps<T>) {
  const { record, column, className, ...otherProps } = props

  return <Dropdown className={cn(css.TableRowMenu, className)} start='more_vert' {...otherProps} />
}

TableRowMenu.displayName = 'TableRowMenu'

export default TableRowMenu
