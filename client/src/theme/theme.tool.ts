/** Add px postfix to value */
export const px = (value: string | number = 0) => `${value}px`

export const toVar = (value: string) => `var(--${value})`

export const toName = (name: string, mod?: string | number) => mod ? `--${name}--${mod}` : `--${name}`
export const toVariable = (name: string, mod?: string | number) => `var(${toName(name, mod)})`

export const SPACE_SIZE_NAME = 'space-size'

export const SPACE_VAR_MAP: Record<string, string> = {
  xxl: toVariable(SPACE_SIZE_NAME, 'xxl'),
  xl: toVariable(SPACE_SIZE_NAME, 'xl'),
  lg: toVariable(SPACE_SIZE_NAME, 'lg'),
  md: toVariable(SPACE_SIZE_NAME, 'md'),
  sm: toVariable(SPACE_SIZE_NAME, 'sm'),
  xs: toVariable(SPACE_SIZE_NAME, 'xs'),
  xxs: toVariable(SPACE_SIZE_NAME, 'xxs'),
}

/** Convert css space value to margin, padding, gap.
 * @example
 * space('xl xl 0 xl')
 * space('xl/xl/0/xl', '/')
 */
export const toSpace = (value: string, sep = ' ') => value.split(sep).map((item) => SPACE_VAR_MAP[item] ?? item).join(sep)

export default {
  px,
  toVariable,
}
