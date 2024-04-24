/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'

export const isBrowser = typeof window !== 'undefined'

export const isNavigator = typeof navigator !== 'undefined'

// types
export type Dictionary<T> = Record<string, T>;

export type OmitFirstArg<F> = F extends (x: any, ...args: infer P) => infer R ? (...args: P) => R : never
export type FirstParameters<F> = F extends (x: infer P, ...args: any[]) => any ? P : never
export type TailParameters<F> = F extends (x: any, ...args: infer P) => any ? P : never

// work with props
export type GeneralProps<T extends Element> = React.DOMAttributes<T> & React.HTMLAttributes<T>

export type ClearObject<
  T extends Record<string, unknown>,
  Key = keyof T,
  ClearKeys extends string = Key extends string
    ? T[Key] extends undefined
      ? never
      : Key
    : never,
  TResult = { [key in ClearKeys]: T[key] }
> = TResult

export function clearProps<
  P extends Record<string, unknown>,
>(props: P): ClearObject<P> {
  Object.keys(props).forEach((key) => {
    if (props[key] === undefined) {
      delete props[key]
    }
  })

  return props as ClearObject<P>
}

// Docs: https://www.youtube.com/watch?v=3nKMO2UNQoY
export type ExtendProps<OwnProps extends object, ExtendProps extends object> = OwnProps & Omit<ExtendProps, keyof OwnProps>
// for props with 'as' prop
export type CustomTagProps<OwnProps extends object, E extends React.ElementType> = ExtendProps<OwnProps, React.ComponentProps<E>> & {
  as?: E
}

// work with components
export function getDisplayName(component: React.ElementType, defaultName = 'Component'): string {
  return (component as any).displayName || (component as any).name || defaultName
}

export function setDisplayName(component: React.ElementType, name = getDisplayName(component)): void {
  (component as any).displayName = name
}

export type OverrideComponentOptions = {
  name?: string
  memoize?: boolean
}

/**
 * Set new default props or override old props for component.
 *
 * @example
 * const BoldText = overrideComponent(Text, { fontSize: 13, fontWeight: 600 }, { name: 'BoldText', memoize: true })
 *
 * <BoldText />
 */
export function overrideComponent<C extends React.ElementType<any>>(
  component: C,
  overrideProps: Partial<React.ComponentProps<C>>,
  options: OverrideComponentOptions = {},
): C {
  // FIXME: it works only for functional components
  let overrideComponent: React.ElementType<any> = (props) => (component as any).apply(null, [{ ...overrideProps, ...props }])

  if (options.memoize) {
    overrideComponent = React.memo(overrideComponent)
  }

  setDisplayName(overrideComponent, options.name ?? getDisplayName(component))

  return overrideComponent as C
}

/**
 * Attache 'dot' override component(sub component) with new default props or override old props.
 *
 * @example
 * const Text = attachOverride(Text, { fontSize: 13, fontWeight: 600 }, { name: 'Bold', memoize: true })
 *
 * <Text />
 * <Text.Bold /> // displayName = 'Text.Bold'
 */
export function attachOverride<C extends React.ElementType<any>>(
  component: C,
  overrideProps: Partial<React.ComponentProps<C>>,
  options: OverrideComponentOptions = {},
): C & Record<string, C> {
  const name = options.name ?? getDisplayName(component);

  (component as any)[name] = overrideComponent(
    component,
    overrideProps,
    {
      name: `${getDisplayName(component)}.${name}`,
      memoize: options.memoize,
    },
  )

  return component as C & Record<string, C>
}

/**
 * Attache 'dot' override components(sub components) with new default props or override old props.
 *
 * @example
 * const Text = attachOverrides(Text, {
 *   Light: { fontSize: 11, fontWeight: 200 },
 *   Bold: { fontSize: 13, fontWeight: 600 },
 * }, {
 *   memoize: true,
 * })
 *
 * <Text />
 * <Text.Light /> // displayName = 'Text.Light'
 * <Text.Bold /> // displayName = 'Text.Bold'
 */
export function attachOverrides<
  C extends React.ElementType<any>, // TODO: it works only with component with not required property ?:
  K extends string,
>(
  component: C,
  overridePropMap: Record<K, Partial<React.ComponentProps<C>>>,
  options: OverrideComponentOptions = {},
): C & Record<K, C> {
  Object.keys(overridePropMap).forEach((name) =>
    attachOverride(
      component,
      overridePropMap[name as K],
      { name, ...options },
    ),
  )

  return component as C & Record<K, C>
}

/**
 * Attache 'dot' override component(sub component) with new default props or override old props.
 *
 * @example
 * const Text = attachComponent(Text, BoldText, { name: 'Bold', memoize: true })
 *
 * <Text />
 * <Text.Bold /> // displayName = 'Text.Bold'
 */
export function attachComponent<C extends React.ElementType<any>, SC extends React.ElementType<any>>(
  component: C,
  subComponent: SC,
  options: OverrideComponentOptions = {},
): C & Record<string, SC> {
  const name = options.name ?? getDisplayName(component);

  (component as any)[name] = subComponent

  setDisplayName(subComponent, `${getDisplayName(component)}.${name}`)

  return component as C & Record<string, SC>
}

/**
 * Attache 'dot' override components(sub components) with new default props or override old props.
 *
 * @example
 * const Field = attachComponents(Field, {
 *   Select: Select,
 *   Text: Text,
 * }, {
 *   memoize: true,
 * })
 *
 * <Field />
 * <Field.Select /> // displayName = 'Field.Select'
 * <Field.Text /> // displayName = 'Field.Text'
 */
export function attachComponents<
  C extends React.ElementType<any>,
  M extends Record<string, React.ElementType<any>>,
>(
  component: C,
  overrideComponentMap: M,
  options: OverrideComponentOptions = {},
): C & M {
  Object.keys(overrideComponentMap).forEach((name) =>
    attachComponent(
      component,
      overrideComponentMap[name as keyof M],
      { name, ...options },
    ),
  )
  // TODO: attach() + className if need

  return component as C & M
}

// work with children
export const isExemplar = (component: React.ElementType<any>, exemplar: React.ReactNode) => {
  return React.isValidElement(exemplar) && exemplar.type === component
}

export const hasExemplar = (items: React.ElementType<any>[], exemplar: React.ReactNode) => {
  return items.some((item) => isExemplar(item, exemplar))
}

/**
 * Check whether value is component
 *
 * How to use
 * @example
 * if (!react.isComponent(Tag)) {
 *   return null
 * }
 */
export const isComponent = (value: any): value is React.ElementType | string =>
  ['string', 'function'].includes(typeof value)
  || typeof value === 'object' && value?.$$typeof
