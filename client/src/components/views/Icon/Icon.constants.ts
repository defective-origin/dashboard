import {
  ActionIconVariant,
  DeviceIconVariant,
  IconVariant,
  KeyboardIconVariant,
  MenuActionIconVariant,
  StatusIconVariant,
  ThemeIconVariant,
  WindowActionIconVariant,
} from './Icon.component'

export const MENU_ACTION_ICONS: MenuActionIconVariant[] = ['more_horiz', 'more_vert']
export const WINDOW_ACTION_ICONS: WindowActionIconVariant[] = ['fullscreen', 'fullscreen_exit', 'zoom_out_map', 'zoom_in_map', 'open_in_new']
export const THEME_ICONS: ThemeIconVariant[] = ['light_mode', 'dark_mode']
export const STATUS_ICONS: StatusIconVariant[] = ['info', 'warning', 'error', 'check_circle', 'check']
export const ACTION_ICONS: ActionIconVariant[] = ['close', 'left_panel_open', 'left_panel_close', 'delete', 'edit', 'download']
export const DEVICE_ICONS: DeviceIconVariant[] = ['developer_mode_tv', 'tv', 'computer', 'tablet_mac', 'phone_iphone', 'watch', 'laptop_chromebook', 'live_tv', 'high_quality', 'desktop_windows', 'devices_wearables', 'smartphone', 'tablet', 'computer', 'hd', '2k', '4k', '8k']
export const KEYBOARD_ICONS: KeyboardIconVariant[] = ['keyboard', 'keyboard_arrow_up', 'keyboard_arrow_down', 'keyboard_arrow_left', 'keyboard_arrow_right']


export const ICONS: IconVariant[] = [
  ...STATUS_ICONS,
  ...ACTION_ICONS,
  ...DEVICE_ICONS,
  ...KEYBOARD_ICONS,
  ...THEME_ICONS,
  ...WINDOW_ACTION_ICONS,
  ...MENU_ACTION_ICONS,
  'local_atm', 'language', 'copyright', 'content_copy',
  'login', 'logout',
  'group', 'person', 'person_add', 'account_circle', 'support_agent',
  'dashboard', 'insert_chart',
  'auto_stories', 'logo_dev',
  'settings', 'beenhere', 'book', 'add', 'dashboard_customize', 'resize', 'favorite',
  'help', 'thumb_up', 'thumb_down', 'star', 'payments', 'schedule', 'confirmation_number',
]
