// ---| common |---
import { _ } from 'common/tools'

// ---| self |---
import { HocComponent, MagicComponent } from './ComponentUI.model'

export function clearProps<T extends Record<string, any>>(obj: T): Omit<T, 'ui'> {
  const updated = _.mapValues(obj, (value, key) => {
    if (_.isObject(value) && key !== 'children') {
      return clearProps(value)
    }

    return value
  }) as T

  return _.omitBy(updated, (v, key) => _.isUndefined(v) || key === 'ui' || (_.isObject(v) && _.isEmpty(v))) as T
}

export function getDisplayName(component: MagicComponent): string {
  return (component as React.ComponentType).displayName || component.name || 'Component'
}

// it's used in memo() and HOC
export function setDisplayName(
  unsignedComponent: MagicComponent,
  originalComponent: MagicComponent,
  prefixOrHocComponent: HocComponent,
): void {
  const prefix = _.isString(prefixOrHocComponent) ? prefixOrHocComponent : getDisplayName(prefixOrHocComponent)

  Object.assign(unsignedComponent, { displayName: `${prefix}(${getDisplayName(originalComponent)})` })
}
