export type Color = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'contrast' | 'bg'
export type ColorShadeNumber = 1 | 2 | 3 | 4 | 5 | 6
export type PaletteColor = Color | `${Color}-${ColorShadeNumber}`
export type ColorVariableName = `--color--${Color}`
export type Size = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
export type SizeArea = 'size' | 'gap' | 'margin' | 'padding'
export type Direction = 'x' | 'y' | 'xy'
export type SizeElements = 'text' | 'icon' | 'space' | 'scroll'

export const toName = (name: string, mod?: string | number) => mod ? `--${name}--${mod}` : `--${name}`
export const toVariable = (name: string, mod?: string | number) => `var(${toName(name, mod)})`

export const DIRECTION: Direction[] = ['x', 'y', 'xy']
export const SIZES: Size[] = ['xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl']
export const ELEMENTS: SizeElements[] = ['text', 'icon', 'space', 'scroll']
export const SIZE_AREA: SizeArea[] = ['size', 'gap', 'margin', 'padding']
export const SIZE_MAP = ELEMENTS.reduce((acc, element) => {
  acc[element] = {} as Record<SizeArea, Record<Size, string>>
  SIZE_AREA.forEach((area) => {
    acc[element][area] = {} as Record<Size, string>

    SIZES.forEach((size) => { acc[element][area][size] = toVariable(`${element}-${area}`, size) })
  })

  return acc
}, {} as Record<SizeElements, Record<SizeArea, Record<Size, string>>>)

export const SUB_COLORS_COUNT = 6
export const COLORS: Color[] = ['primary', 'secondary', 'success', 'info', 'warning', 'error', 'contrast', 'bg']
export const PALETTE_COLORS: PaletteColor[] = COLORS.reduce((acc, color) => {
  const shades = Array.from({length: SUB_COLORS_COUNT}, (_, sub) => `${color}-${sub + 1}` as PaletteColor)

  return [...acc, color, ...shades]
}, [] as PaletteColor[])

export const PALETTE_COLOR_MAP = PALETTE_COLORS.reduce(
  (acc, color) => {
    acc[color] = toVariable('color', color)

    return acc
  },
  {} as Record<PaletteColor, string>,
)

export const PALETTE = COLORS.reduce((acc, color) => {
  acc[color] = { [color]: PALETTE_COLOR_MAP[color] } as Record<PaletteColor, string>

  Array
    .from({length: SUB_COLORS_COUNT}, (_, sub) => `${color}-${sub + 1}` as PaletteColor)
    .forEach((shade) => { acc[color][shade] = PALETTE_COLOR_MAP[shade] })

  return acc
}, {} as Record<Color, Partial<Record<PaletteColor, string>>>)

export const THEME = {
  palette: PALETTE_COLOR_MAP,
  components: SIZE_MAP,
}

