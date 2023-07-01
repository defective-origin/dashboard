import React from 'react'
import MuiIcon, { IconProps as MuiIconProps } from '@mui/material/Icon'

// ---| common |---
import { cn } from 'common/tools'

// ---| self |---
import useIconUIProps, { IconUIProps } from './IconUI'

export type IconTypes = 'light_mode' | 'dark_mode'
| 'add' | 'delete' | 'edit' | 'close' | 'search' | 'download' | 'upload' | 'refresh' | 'sort' | 'reorder' | 'sync'
| 'savings' | 'settings'
| 'star' | 'grade'
| 'login' | 'logout'
| 'person' | 'person_add' | 'account_circle'
| 'dashboard' | 'insert_chart'
| 'keyboard' | 'keyboard_arrow_up' | 'keyboard_arrow_right' | 'keyboard_arrow_down' | 'keyboard_arrow_left'
| 'menu' | 'open_in_new' | 'support' | 'tab' | 'verified' | 'cloud_download' | 'library_books'
| 'filter_list' | 'view_column' | 'more_vert' | 'table_rows' | 'auto_stories' | 'database'

export type IconProps = MuiIconProps & IconUIProps & {
  type: IconTypes
}

export default function Icon(props: IconProps): JSX.Element {
  const { ui, type, className, ...otherProps } = useIconUIProps(props)
  const _className = cn('material-symbols-outlined', className)

  return <MuiIcon className={_className} {...otherProps}>{type}</MuiIcon>
}
