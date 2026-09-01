import { toVar } from './theme.tools'

export type Color = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'contrast-primary'  | 'contrast-secondary'
export const COLORS: Color[] = ['primary', 'secondary', 'success', 'info', 'warning', 'error', 'contrast-primary', 'contrast-secondary']

export type ColorShadeNumber = 1 | 2 | 3 | 4 | 5 | 6
export const SUB_COLORS_COUNT = 6

export type Size = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
export const SIZES: Size[] = ['xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl']

export type Direction = 'x' | 'y' | 'xy'
export const DIRECTION: Direction[] = ['x', 'y', 'xy']

export type SizeElements = 'text' | 'icon' | 'space' | 'scroll' | "radius"
export const ELEMENTS: SizeElements[] = ['text', 'icon', 'space', 'scroll', "radius"] // TODO: hide scroll on mobile!

export type PaletteColor = Color | `${Color}-${ColorShadeNumber}`
export const PALETTE_COLORS: PaletteColor[] = COLORS.reduce((acc, color) => {
  const shades = Array.from({length: SUB_COLORS_COUNT}, (_, sub) => `${color}-${sub + 1}` as PaletteColor)

  return [...acc, color, ...shades]
}, [] as PaletteColor[])


export const PALETTE_COLOR_MAP = PALETTE_COLORS.reduce(
  (acc, color) => {
    acc[color] = toVar('color', color)

    return acc
  },
  {} as Record<PaletteColor, string>,
)

export const PALETTE = COLORS.reduce((acc, color) => {
  acc[color] = { [color]: PALETTE_COLOR_MAP[color] } as Record<PaletteColor, string>

  Array
    .from({length: SUB_COLORS_COUNT}, (_, sub) => `${color}-${sub + 1}` as PaletteColor)
    .forEach(shade => { acc[color][shade] = PALETTE_COLOR_MAP[shade] })

  return acc
}, {} as Record<Color, Partial<Record<PaletteColor, string>>>)


export const SIZE_MAP = ELEMENTS.reduce((acc, element) => {
  acc[element] = {} as Record<Size, string>
  SIZES.forEach(size => { acc[element][size] = toVar(element, size) })

  return acc
}, {} as Record<SizeElements, Record<Size, string>>)

// TODO: remove
export const THEME = {
  palette: PALETTE_COLOR_MAP,
  components: SIZE_MAP,
}


export const COLOR_ORDER: Record<Color, number> = {
  error: 0,
  warning: 1,
  info: 2,
  success: 3,
  primary: 4,
  secondary: 5,
  "contrast-primary": 6,
  "contrast-secondary": 7,
}
