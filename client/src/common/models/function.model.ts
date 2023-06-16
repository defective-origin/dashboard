export type OmitFirstArg<F> = F extends (x: any, ...args: infer P) => infer R ? (...args: P) => R : never
export type FirstParameter<F> = F extends (x: infer P, ...args: any[]) => any ? P : never
export type TailParameters<F> = F extends (x: any, ...args: infer P) => any ? P : never

export type MagicFunc = (...args: any[]) => any
export type SetValueFunc<T> = (value: T) => void
