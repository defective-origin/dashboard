export type StringValue = string | number

export const toString = (value: StringValue) => String(value).trim()

export const isString = (value: any): value is string => typeof value === 'string' || value instanceof String

/** ABC DEF */
export const toUppercase = (value: StringValue) => toString(value).toUpperCase()

/** abc def */
export const toLowercase = (value: StringValue) => toString(value).toLowerCase()

/** Abc */
export const capitalize = (value: StringValue) => {
  const firstChar = toLowercase(value).charAt(0).toUpperCase()
  const restChars = toLowercase(value).slice(1)

  return `${firstChar}${restChars}`
}

/** Abc Def */
export const toCapital = (value: StringValue, whitespace = ' ') => toString(value).split(whitespace).map(capitalize).join(whitespace)

/** Abc def */
export const toTitle = (value: StringValue) => capitalize(toString(value))

export const isMatch = (what: string | RegExp, where: string) => new RegExp(what).test(where)


/** RepeatText<'Text', 3> => 'TextTextText' */
export type RepeatText<
  Text extends string,
  Count extends number = 2,
  Joined extends string = '',
  Acc extends 0[] = [],
> = Acc['length'] extends Count ? Joined : RepeatText<Text, Count, `${Joined}${Text}`, [0,...Acc]>

/** RepeatText<'Text', ':', 3> => 'Text' | 'Text:Text' | 'Text:Text:Text' | 'Text:Text:Text:Text' */
export type RepeatWithSep<
  Text extends string,
  Sep extends string,
  Count extends number = 2,
  Joined extends string = Text,
  Acc extends 0[] = [],
  Result extends string = `${Joined}${Sep}${Text}`,
> = Acc['length'] extends Count
  ? Text | Joined
  : Result | RepeatWithSep<Text, Sep, Count, Result, [0,...Acc]>


export function repeat<T extends string, C extends number>(text: string, count: number): RepeatText<T, C>
export function repeat<T extends string, C extends number, S extends string>(text: T, count: C, separator: S): RepeatWithSep<T, S, C>
export function repeat(text: string, count: number, separator = '') {
  if (count <= 0) return ''
  if (!separator) return text.repeat(count)

  return (text + separator).repeat(count - 1) + text
}
