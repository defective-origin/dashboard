import React from 'react'
import MuiIcon, { IconProps as MuiIconProps } from '@mui/material/Icon'

// ---| core |---
import { cn } from 'tools'
import { Size } from 'theme'

// ---| self |---
import './Icon.module.scss'

export type IconVariant = 'light_mode' | 'dark_mode'
| 'paid' | 'language'
| 'login' | 'logout'
| 'developer_mode_tv' | 'tv'
| 'person' | 'person_add' | 'account_circle' | 'support_agent'
| 'dashboard' | 'insert_chart'
| 'keyboard' | 'keyboard_arrow_up' | 'keyboard_arrow_left'
| 'auto_stories' | 'logo_dev'
| 'settings'
| 'close' | 'left_panel_open' | 'left_panel_close' | 'open_in_new'
| 'info' | 'warning' | 'error' | 'check_circle'

export type IconSize = Size

export type IconProps = Omit<MuiIconProps, 'size'> & {
  className?: string
  v: IconVariant
  size?: IconSize
  fill?: boolean
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <Icon />
 */
export function Icon(props: IconProps): JSX.Element {
  const { size = 'md', v, fill, className, ...otherProps } = props
  const _className = cn(
    'icon',
    'material-symbols-outlined', {
      [`icon--${size}`]: size,
      ['icon--fill']: fill,
      ['icon--outline']: !fill,
    },
    className,
  )

  return <MuiIcon className={_className} {...otherProps}>{v}</MuiIcon>
}

Icon.displayName = 'Icon'

export default Icon
