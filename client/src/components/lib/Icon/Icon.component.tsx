import React from 'react'
import MuiIcon, { IconProps as MuiIconProps } from '@mui/material/Icon'

// ---| common |---
import { cn } from 'common/tools'

// ---| self |---
import css from './Icon.module.scss'

export type IconTypes = 'light_mode' | 'dark_mode'
| 'paid' | 'language'
| 'login' | 'logout'
| 'developer_mode_tv' | 'tv'
| 'person' | 'person_add' | 'account_circle' | 'support_agent'
| 'dashboard' | 'insert_chart'
| 'keyboard' | 'keyboard_arrow_up' | 'keyboard_arrow_left'
| 'auto_stories' | 'logo_dev'
| 'settings'
| 'close' | 'left_panel_open' | 'left_panel_close' | 'open_in_new'
| 'warning' | 'error'

export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export type IconProps = Omit<MuiIconProps, 'size'> & {
  className?: string
  v: IconTypes
  size?: IconSize
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <Icon />
 */
export function Icon(props: IconProps): JSX.Element {
  const { size = 'md', v, className, ...otherProps } = props
  const _className = cn(css.Icon, css[size], 'material-symbols-outlined', className)

  return <MuiIcon className={_className} {...otherProps}>{v}</MuiIcon>
}

Icon.displayName = 'Icon'

export default Icon
