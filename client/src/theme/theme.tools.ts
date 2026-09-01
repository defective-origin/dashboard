/** Add px postfix to value */
export const px = (value: string | number = 0) => `${value}px`
export const toName = (...args: (string | number)[]) => `--${args.join("-")}`
export const toVar = (...args: (string | number)[]) => `var(${toName(...args)})`

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

/** Convert css space value to margin, padding, gap.
 * @example
 * space('xl xl 0 xl')
 * space('xl/xl/0/xl', '/')
 */
export const toSpace = (value: string, sep = ' ') => value.split(sep).map((item) => SPACE_VAR_MAP[item] ?? item).join(sep)

export default {
  px,
  toVar,
  toSpace,
}
