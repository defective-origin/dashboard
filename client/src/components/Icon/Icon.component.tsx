import React from 'react'
import MuiIcon, { IconProps as MuiIconProps } from '@mui/material/Icon'

// ---| common |---
import { cn } from 'common/tools'

// ---| self |---
import useIconUIProps, { IconUIProps } from './IconUI'

export type IconTypes = 'light_mode' | 'dark_mode'
| 'paid'
| 'login' | 'logout'
| 'developer_mode_tv' | 'tv'
| 'person' | 'person_add' | 'account_circle' | 'support_agent'
| 'dashboard' | 'insert_chart'
| 'keyboard'
| 'auto_stories'
| 'settings'

export type IconProps = MuiIconProps & IconUIProps & {
  type: IconTypes
}

export default function Icon(props: IconProps): JSX.Element {
  const { ui, type, className, ...otherProps } = useIconUIProps(props)
  const _className = cn('material-symbols-outlined', className)

  return <MuiIcon className={_className} {...otherProps}>{type}</MuiIcon>
}
