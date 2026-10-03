/** Add px postfix to value */
export const px = (value: string | number = 0) => `${value}px`
export const toName = (...args: (string | number)[]) => `--${args.join('-')}`
export const toVar = (...args: (string | number)[]) => `var(${toName(...args)})`

export type Size = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
export const SIZES: Size[] = ['xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl']
export const toSize = (name: string, size?: Size) => size && toVar(name, size)

export const SPACE_SIZE_NAME = 'space'
export const SPACE_VAR_MAP: Record<string, string> = {
  xxl: toVar(SPACE_SIZE_NAME, 'xxl'),
  xl: toVar(SPACE_SIZE_NAME, 'xl'),
  lg: toVar(SPACE_SIZE_NAME, 'lg'),
  md: toVar(SPACE_SIZE_NAME, 'md'),
  sm: toVar(SPACE_SIZE_NAME, 'sm'),
  xs: toVar(SPACE_SIZE_NAME, 'xs'),
  xxs: toVar(SPACE_SIZE_NAME, 'xxs'),
}

export type Space = Size | 0
export const SPACES: Space[] = [...SIZES, 0]
/** Convert css space value to margin, padding, gap.
 * @example
 * space('xl xl 0 xl')
 * space('xl/xl/0/xl', '/')
 * // `var(--space-xl) var(--space-xl) 0 var(--space-xl)`
 */
export const toSpace = (value?: string | number, sep = ' ') => {
  if (!value) {
    return
  }

  return `${value}`.split(sep).map(item => SPACE_VAR_MAP[item] ?? item).join(sep)
}


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

export const toColor = (color?: Palette) => color && toVar('color', color)
