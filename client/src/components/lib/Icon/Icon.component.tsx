import React from 'react'
import MuiIcon, { IconProps as MuiIconProps } from '@mui/material/Icon'

// ---| common |---
import { cn } from 'common/tools'

// ---| self |---
import css from './Icon.module.scss'

export type IconTypes = 'light_mode' | 'dark_mode'
| 'paid'
| 'login' | 'logout'
| 'developer_mode_tv' | 'tv'
| 'person' | 'person_add' | 'account_circle' | 'support_agent'
| 'dashboard' | 'insert_chart'
| 'keyboard' | 'keyboard_arrow_up' | 'keyboard_arrow_left'
| 'auto_stories' | 'logo_dev'
| 'settings'
| 'close' | 'left_panel_open' | 'left_panel_close'

export type IconProps = MuiIconProps & {
  className?: string
  type: IconTypes
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <Icon />
 */
export function Icon(props: IconProps): JSX.Element {
  const { type, className, ...otherProps } = props
  const _className = cn(css.Icon, 'material-symbols-outlined', className)

  return <MuiIcon className={_className} {...otherProps}>{type}</MuiIcon>
}

Icon.displayName = 'Icon'

export default Icon
