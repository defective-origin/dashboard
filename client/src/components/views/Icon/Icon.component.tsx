import React from 'react'

// ---| core |---
import { cn } from 'tools'
import { Color, Size } from 'theme'

// ---| components |---
import { withSkeleton } from 'components/views/Skeleton'

// ---| self |---
import './Icon.module.scss'


export type ThemeIconVariant = 'light_mode' | 'dark_mode'
export type WindowActionIconVariant = 'fullscreen' | 'fullscreen_exit' | 'zoom_out_map' | 'zoom_in_map' | 'open_in_new' | 'resize'
export type MenuActionIconVariant = 'more_vert' | 'more_horiz'
export type ActionIconVariant = 'close' | 'left_panel_open' | 'left_panel_close' | 'delete' | 'delete_forever' | 'edit' | 'edit_square' | 'download' | 'file_copy' | 'health_cross' | 'content_copy' | 'search' | 'add'
export type StatusIconVariant = 'info' | 'warning' | 'error' | 'check_circle' | 'check'
export type KeyboardIconVariant = 'keyboard' | 'keyboard_arrow_up' | 'keyboard_arrow_down' | 'keyboard_arrow_left' | 'keyboard_arrow_right'
export type DeviceIconVariant = 'developer_mode_tv' | 'tv' | 'computer' | 'tablet_mac' | 'phone_iphone' | 'watch' | 'laptop_chromebook' | 'live_tv' | 'high_quality' | 'desktop_windows' | 'devices_wearables' | 'smartphone' | 'tablet' | 'computer' | 'hd' | 'full_hd' | '2k' | '4k' | '8k'
export type AccountIconVariant = 'login' | 'logout' | 'person' | 'person_add' | 'account_circle' | 'support_agent' | 'settings' | 'language' | 'group'
export type ProductIconVariant = 'thumb_up' | 'thumb_down' | 'star' | 'payments' | 'favorite' | 'logo_dev' | 'copyright' | 'beenhere' | 'local_atm' | 'confirmation_number' | 'help'
export type DashboardIconVariant = 'dashboard' | 'insert_chart' | 'data_thresholding' | 'data_object' | 'dashboard_customize'
export type IconVariant =
| DeviceIconVariant
| KeyboardIconVariant
| ActionIconVariant
| StatusIconVariant
| ThemeIconVariant
| WindowActionIconVariant
| MenuActionIconVariant
| AccountIconVariant
| ProductIconVariant
| DashboardIconVariant
| 'auto_stories' | 'schedule' | 'table_rows' | 'book'

export type IconColor = Color
export type IconSize = Size

export type IconProps = {
  className?: string
  v?: IconVariant
  size?: IconSize
  fill?: boolean
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
  const { size, v, fill, color, className, ...otherProps } = props
  const _className = cn(
    'icon',
    'material-symbols-outlined', {
      [`i-${size}`]: size,
      [`c-${color}`]: color,
      ['icon--fill']: fill,
      ['icon--outline']: !fill,
    },
    className,
  )

  return <span className={_className} {...otherProps}>{v}</span>
}

Icon.displayName = 'Icon'

export default withSkeleton(Icon, () => ({ v: 'circular', wrap: true }))
