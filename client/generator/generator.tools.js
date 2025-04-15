export const list = (...args) => args.flat(Infinity).filter(Boolean)
export const prompts = list

export const isMatch = (what, where) => new RegExp(what).test(where)
export const hasMatch = (whats = [], where) => whats.some(what => isMatch(what, where))

export default {
  list,
  isMatch,
  hasMatch,
}
