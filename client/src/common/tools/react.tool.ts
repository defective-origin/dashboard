import React from 'react'

export type OverrideComponentOptions = {
  name?: string
  memoize?: boolean
}

export function overrideComponent<T extends React.FunctionComponent>(
  component: T,
  overrideProps: Partial<React.ComponentProps<T>>,
  options: OverrideComponentOptions = {},
): T {
  let overrideComponent: React.FunctionComponent<React.ComponentProps<T>> = (props) => component.apply(null, [{ ...overrideProps, ...props }])
  
  if (options.memoize) {
    overrideComponent = React.memo(overrideComponent)
  }

  overrideComponent.displayName = options.name ?? component.displayName ?? component.name

  return overrideComponent as T
}

export type AttachOverridesOptions<I, P> = {
  nameSelector: (item: I) => string
  propSelector: (item: I) => Partial<P>
  memoize?: boolean
}

export function attachOverrides<I extends string, C extends React.FunctionComponent>(
  items: I[],
  component: C,
  options: AttachOverridesOptions<I, React.ComponentProps<C>>,
): C & Record<I, C> {
  items.forEach((item) => {
    const name = options.nameSelector(item)
    const displayName = `${component.displayName ?? component.name}.${name}`;

    (component as any)[name] = overrideComponent(
      component,
      options.propSelector(item),
      {
        name: displayName,
        memoize: options.memoize,
      },
    )
  })

  return component as C & Record<I, C>
}
