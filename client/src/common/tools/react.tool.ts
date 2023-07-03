import React from 'react'

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
 * const Text = attachOverrides(
 *    Text, {
 *      Light: { fontSize: 11, fontWeight: 200 },
 *      Bold: { fontSize: 13, fontWeight: 600 },
 *    }, {
 *      memoize: true,
 *    })
 * 
 * <Text />
 * <Text.Light /> // displayName = 'Light.Bold'
 * <Text.Bold /> // displayName = 'Text.Bold'
 */
export function attachOverrides<
  C extends React.FunctionComponent,
  K extends string,
>(
  component: C,
  overridePropMap: Record<K, React.ComponentProps<C>>,
  options: OverrideComponentOptions = {},
): C & Record<K, C> {
  Object.keys(overridePropMap).forEach((name) =>
    attachOverride(
      component,
      overridePropMap[name as K],
      { name, ...options },
    )
  )

  return component as C & Record<K, C>
}
