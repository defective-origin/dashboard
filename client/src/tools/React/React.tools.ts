/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { obj } from 'tools'

export const IS_BROWSER = typeof window !== 'undefined'
export const IS_NAVIGATOR = typeof navigator !== 'undefined'


// work with props
export type GeneralProps<T extends Element> = React.DOMAttributes<T> & React.HTMLAttributes<T>

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

export function setHocDisplayName(prefix: string, hoc: React.ElementType, component: React.ElementType): void {
  setDisplayName(hoc, `with${prefix}(${getDisplayName(component)})`)
}

export type OverrideComponentOptions = {
  name?: string
  memoize?: boolean
}

/**
 * Set new default props or override old props for component.
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
  let overrideComponent: React.ElementType<any> = props => (component as any).apply(null, [{ ...overrideProps, ...props }])

  if (options.memoize) {
    overrideComponent = React.memo(overrideComponent)
  }

  setDisplayName(overrideComponent, options.name ?? getDisplayName(component))

  return overrideComponent as C
}

/**
 * Attache 'dot' override component(sub component) with new default props or override old props.
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
  Object.keys(overridePropMap).forEach(name =>
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
  Object.keys(overrideComponentMap).forEach(name =>
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
export const isExemplar = (node: React.ReactNode, components: React.ElementType<any>[]) => {
  return React.isValidElement(node) && components.some(cmp => node.type === cmp)
}

/**
 * Check whether value is component
 * @example
 * if (!react.isComponent(Tag)) {
 *   return null
 * }
 */
export const isComponent = (value: any): value is React.ElementType | string =>
  ['string', 'function'].includes(typeof value)
  || typeof value === 'object' && value?.$$typeof



export function injectProp(node: React.ReactNode, deep: number, prop: Record<string, unknown>, condition: (child: React.ReactNode) => boolean) {
  return React.Children.map(node, child => {
    if (!React.isValidElement<{ children: React.ReactNode }>(child)) {
      return child
    }

    const nextProps = {}

    if (condition(child as any)) {
      Object.assign(nextProps, obj.clear(prop), child.props)
    }

    if (child.props.children && deep > 1) {
      Object.assign(nextProps, { children: injectProp(child.props.children, deep - 1, prop, condition) })
    }

    return React.cloneElement(child, nextProps)
  })
}


export type ElementSelector<E extends Element = Element, S = E | null | undefined> = React.RefObject<S> | (() => S) | S

/**
 * Return element by ref, callback or default.
 * @example
 * const element = getElement(ref, defaultElement)
 * const element = getElement(document.body, defaultElement)
 * const element = getElement(() => document.body, defaultElement)
 */
export const getElement = <E extends Element = HTMLElement>(
  elem: ElementSelector<E>,
  defaultElem?: Element,
): E | null => {
  const element = elem ?? defaultElem

  // if ref object
  if (element && 'current' in element) {
    return element.current ?? null

  // if getter function
  } else if (typeof element === 'function') {
    return element() ?? null
  }

  // if element, null or undefined
  return element as E ?? null
}
