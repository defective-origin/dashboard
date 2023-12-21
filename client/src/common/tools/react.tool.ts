import React from 'react'

// work with props
export type GeneralProps<T extends HTMLElement = HTMLElement> = React.DOMAttributes<T> & React.HTMLAttributes<T>

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

// work with components
export function getDisplayName(component: React.ComponentType, defaultName = 'Component'): string {
  return component.displayName || component.name || defaultName
}

export function setDisplayName(component: React.ComponentType, name = getDisplayName(component)): void {
  component.displayName = name
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
export function overrideComponent<C extends React.FunctionComponent>(
  component: C,
  overrideProps: Partial<React.ComponentProps<C>>,
  options: OverrideComponentOptions = {},
): C {
  let overrideComponent: React.FunctionComponent = (props) => component.apply(null, [{ ...overrideProps, ...props }])

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
export function attachOverride<C extends React.FunctionComponent>(
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
  C extends React.FunctionComponent, // FIXME: it works only with component with not required property ?:
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
export function attachComponent<C extends React.FunctionComponent, SC extends React.FunctionComponent>(
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
  C extends React.FunctionComponent,
  M extends Record<string, React.FunctionComponent>,
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
  // FIXME: attach() + className if need

  return component as C & M
}

// work with children
export const isExemplar = (component: React.ComponentType, exemplar: React.ReactNode) => {
  return React.isValidElement(exemplar) && exemplar.type === component
}

export const hasExemplar = (items: React.ComponentType[], exemplar: React.ReactNode) => {
  return items.some((item) => isExemplar(item, exemplar))
}
