export type Size = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
export const SIZES: Size[] = ['xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl']

export type Direction = 'x' | 'y' | 'xy'
export const DIRECTION: Direction[] = ['x', 'y', 'xy']

export type ColorShadeNumber = 1 | 2 | 3 | 4 | 5 | 6
export const SUB_COLORS_COUNT = 6

export type Color = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'contrast-primary' | 'contrast-secondary'
export const COLORS: Color[] = ['primary', 'secondary', 'success', 'info', 'warning', 'error', 'contrast-primary', 'contrast-secondary']

export type Palette = Color | `${Color}-${ColorShadeNumber}`
export const PALETTE: Palette[] = COLORS.flatMap(color => [
  color,
  ...Array.from({length: SUB_COLORS_COUNT}, (_, sub) => `${color}-${sub + 1}` as Palette),
])

export const COLOR_ORDER: Record<Color, number> = {
  error: 0,
  warning: 1,
  info: 2,
  success: 3,
  primary: 4,
  secondary: 5,
  'contrast-primary': 6,
  'contrast-secondary': 7,
}
