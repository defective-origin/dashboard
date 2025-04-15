export type LowerToUpperCaseMapper = {
  a: 'A'
  b: 'B'
  c: 'C'
  d: 'D'
  e: 'E'
  f: 'F'
  g: 'G'
  h: 'H'
  i: 'I'
  j: 'J'
  k: 'K'
  l: 'L'
  m: 'M'
  n: 'N'
  o: 'O'
  p: 'P'
  q: 'Q'
  r: 'R'
  s: 'S'
  t: 'T'
  u: 'U'
  v: 'V'
  w: 'W'
  x: 'X'
  y: 'Y'
  z: 'Z'
}

export type UpperToLowerCaseMapper = {
  A: 'a'
  B: 'b'
  C: 'c'
  D: 'd'
  E: 'e'
  F: 'f'
  G: 'g'
  H: 'h'
  I: 'i'
  J: 'j'
  K: 'k'
  L: 'l'
  M: 'm'
  N: 'n'
  O: 'o'
  P: 'p'
  Q: 'q'
  R: 'r'
  S: 's'
  T: 't'
  U: 'u'
  V: 'v'
  W: 'w'
  X: 'x'
  Y: 'y'
  Z: 'z'
}
export type LowerLetters = UpperToLowerCaseMapper[keyof UpperToLowerCaseMapper]

export type FirstLetter<T> = T extends `${infer _FirstLetter}${infer _Rest}` ? _FirstLetter : never
export type TailLetters<T> = T extends `${infer _FirstLetter}${infer Rest}` ? Rest : never

export type LetterToUpper<T> = T extends `${infer _FirstLetter}${infer _Rest}`
  ? _FirstLetter extends LowerLetters
    ? LowerToUpperCaseMapper[_FirstLetter]
    : _FirstLetter
  : T

export type SelectKey<
  T,
  TPrefix extends string = 'select',
  TResult = `${TPrefix}${LetterToUpper<FirstLetter<T>>}${TailLetters<T>}`,
> = TResult

export type Cast<T, U> = T extends U ? T : U
export type GetObjValues<T> = T extends Record<any, infer V> ? V : never

export type SwitchKeyValue<
  T, // example: { [K in keyof T]: NewKeyName<K> },
  T1 extends Record<string, any> = {
    [K in keyof T]: { key: K; value: T[K] }
  },
  T2 = {
    [K in GetObjValues<T1>['value']]: Extract<GetObjValues<T1>, { value: K }>['key']
  },
> = T2

export type SelectorFunc<TState, TResult> = (state: TState) => TResult
export type SliceSelectorMap<
  TStore extends Record<string, unknown>,
  TSlice extends Record<string, unknown>,
  T0 = { [K in keyof TSlice]: SelectKey<K> },
  T1 = SwitchKeyValue<T0>,
  T2 = { [K in keyof T1]: SelectorFunc<TStore, TSlice[Cast<T1[K], string>]> },
> = T2

/**
 * Create selector name.
 *
 * @example
 * createSelectorName('isLoading')
 * // selectIsLoading()
 *
 * @params key Slice field name
 * @returns string Changed key
 */
function createSelectorName(key: string): string {
  return `select${key.charAt(0).toUpperCase() + key.slice(1)}`
}

/**
 * Generate base selectors for slice.
 * Preventing boilerplate code. You should implement only private case selectors
 *
 * @example
 * const sliceSelector = (store) => store.slice
 * const sliceDefaultState = {
 *    widgets: []
 *    isLoading: false
 *    meta: {
 *      page: 0,
 *      next: null
 *    },
 * }
 *
 * generateSliceSelectors(sliceDefaultState, sliceSelector)
 * // {
 * //    selectWidgets: (store) => sliceSelector(store).widgets,
 * //    selectIsLoading: (store) => sliceSelector(store).isLoading,
 * //    selectMeta: (store) => sliceSelector(store).meta,
 * // }
 *
 * @params defaultState Slice Default state
 * @params selector Slice selector which select slice state from store
 * @returns SelectorMap Base selectors for slice
 */
export function generateSliceSelectors<TStore extends Record<string, unknown>, TSlice extends Record<string, unknown>>(
  defaultState: TSlice,
  selector: SelectorFunc<TStore, TSlice>,
): SliceSelectorMap<TStore, TSlice> {
  return Object.entries(defaultState).reduce((acc, [key, value]) => {
    const newKey = createSelectorName(key)
    const newSelector = (store: TStore) => selector(store)[value as keyof TSlice]

    return Object.assign(acc, { [newKey]: newSelector })
  }, {} as SliceSelectorMap<TStore, TSlice>)
}

type Slice = {
  widgets: [] | null,
  isLoading: boolean,
  meta: {
    page: number,
    next: number | null
  },
}

const defaultState: Slice = {
  widgets: [],
  isLoading: false,
  meta: {
    page: 0,
    next: null,
  },
}

// FIXME: or add posfix and use name ComplexNameSelector => isLoading => IsLoadingSelector
const getSlice: SelectorFunc<any, Slice> = (store: any) => store.a
const selectors = generateSliceSelectors(defaultState, getSlice)
const metaSelectors = generateSliceSelectors(defaultState.meta, selectors.selectMeta)

export default {
  ...selectors,
}
