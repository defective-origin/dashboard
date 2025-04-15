import React from 'react'
import MuiIcon from '@mui/material/Icon'

// ---| core |---
import { cn } from 'tools'
import { Color, THEME, Size } from 'theme'

// ---| components |---
import Skeleton from 'components/views/Skeleton'

// ---| self |---
import './Icon.module.scss'


export type ThemeIconVariant = 'light_mode' | 'dark_mode'
export type WindowActionIconVariant = 'fullscreen' | 'fullscreen_exit' | 'zoom_out_map' | 'zoom_in_map' | 'open_in_new'
export type MenuActionIconVariant = 'more_vert' | 'more_horiz'
export type ActionIconVariant = 'close' | 'left_panel_open' | 'left_panel_close' | 'delete' | 'delete_forever' | 'edit' | 'edit_square' | 'download' | 'file_copy'
export type StatusIconVariant = 'info' | 'warning' | 'error' | 'check_circle' | 'check'
export type KeyboardIconVariant = 'keyboard' | 'keyboard_arrow_up' | 'keyboard_arrow_down' | 'keyboard_arrow_left' | 'keyboard_arrow_right'
export type DeviceIconVariant = 'developer_mode_tv' | 'tv' | 'computer' | 'tablet_mac' | 'phone_iphone' | 'watch' | 'laptop_chromebook' | 'live_tv' | 'high_quality' | 'desktop_windows'
export type IconVariant =
| DeviceIconVariant
| KeyboardIconVariant
| ActionIconVariant
| StatusIconVariant
| ThemeIconVariant
| WindowActionIconVariant
| MenuActionIconVariant
| 'local_atm' | 'language' | 'copyright' | 'content_copy' | 'search'
| 'login' | 'logout'
| 'group' | 'person' | 'person_add' | 'account_circle' | 'support_agent'
| 'dashboard' | 'insert_chart' | 'data_thresholding' | 'data_object'
| 'auto_stories' | 'logo_dev'
| 'settings' | 'beenhere' | 'book' | 'add' | 'dashboard_customize' | 'resize' | 'favorite'
| 'help' | 'thumb_up' | 'thumb_down' | 'star' | 'payments' | 'schedule' | 'confirmation_number' | 'table_rows'

export type IconColor = Color
export type IconSize = Size

export type IconProps = {
  className?: string
  v?: IconVariant
  size?: IconSize
  fill?: boolean
  loading?: boolean
  color?: IconColor
  style?: React.CSSProperties
}


/**
 * Displaying font icons.
 *
 * How to use
 * @example
 * <Icon />
 */
export const Icon = (props: IconProps) => {
  const { size = 'md', v, loading, fill, color, style, className, ...otherProps } = props
  const _className = cn(
    'icon',
    'material-symbols-outlined', {
      [`icon--${size}`]: size,
      ['icon--fill']: fill,
      ['icon--outline']: !fill,
    },
    className,
  )
  const styles = {
    ...style,
    color: color && THEME.palette[color],
    fontSize: THEME.components.text.size[size],
  }
  const item = <MuiIcon className={_className} style={styles} {...otherProps}>{v}</MuiIcon>

  if (loading) {
    return <Skeleton className={_className} v='circular' content={item} />
  }

  return item
}

Icon.displayName = 'Icon'

export default Icon
