export const list = (...args) => args.flat(Infinity).filter(Boolean)
export const initArray = (value) => Array.isArray(value) ? value : [value].filter(Boolean)

export const isMatch = (what, where) => new RegExp(what).test(where)
export const hasMatch = (whats = [], where) => whats.some((what) => isMatch(what, where))

export default {
  list,
  initArray,
  isMatch,
  hasMatch,
}
