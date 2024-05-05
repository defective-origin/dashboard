import React from 'react'
import MuiIcon from '@mui/material/Icon'

// ---| core |---
import { cn } from 'tools'
import { Color, THEME, Size } from 'theme'

// ---| components |---
import Skeleton from 'components/Skeleton'

// ---| self |---
import './Icon.module.scss'


export type IconVariant = 'light_mode' | 'dark_mode'
| 'local_atm' | 'language'
| 'login' | 'logout'
| 'developer_mode_tv' | 'tv' | 'computer' | 'tablet_mac' | 'phone_iphone'
| 'person' | 'person_add' | 'account_circle' | 'support_agent'
| 'dashboard' | 'insert_chart'
| 'keyboard' | 'keyboard_arrow_up' | 'keyboard_arrow_down' | 'keyboard_arrow_left' | 'keyboard_arrow_right'
| 'auto_stories' | 'logo_dev'
| 'settings' | 'fullscreen' | 'fullscreen_exit' | 'zoom_out_map' | 'zoom_in_map' | 'beenhere' | 'book' | 'add' | 'dashboard_customize' | 'resize'
| 'close' | 'left_panel_open' | 'left_panel_close' | 'open_in_new' | 'delete'
| 'info' | 'warning' | 'error' | 'check_circle' | 'help'

export type IconColor = Color
export type IconSize = Size

export type IconProps = {
  className?: string
  v: IconVariant
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
export function Icon(props: IconProps): JSX.Element {
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
