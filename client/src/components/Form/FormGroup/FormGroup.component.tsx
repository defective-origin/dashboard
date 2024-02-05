import React, { useMemo } from 'react'

// ---| core |---
import { cn, react } from 'tools'

// ---| pages |---
// ---| screens |---
// ---| components |---
import { BaseField, BaseFieldProps } from 'components/Field'

// ---| self |---
import css from './FormGroup.module.scss'
import { useForm, FormContext, FormOptions } from '../Form.context'

// TODO: move to field and rename to GroupField
export type FormGroupProps<V, S, E, C> = FormOptions<V, S, E, C> & BaseFieldProps & {
  list?: boolean
  label?: string
  className?: string
  children?: React.ReactNode
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <FormGroup />
 */
export function FormGroup<V, S, E, C>(props: FormGroupProps<V, S, E, C>): JSX.Element {
  const { name, list, onChange, onSubmit, onReset, children, className, ...otherProps } = props
  const _className = cn(css.FormGroup, className)
  const value = useMemo(() => (list ? [] : {}) as V, [list])
  const form = useForm<V, S, E, C>({ value, name, onChange, onReset, onSubmit })

  return (
    <FormContext.Provider value={form} >
      <BaseField className={_className} {...otherProps}>
        {children}
      </BaseField>
    </FormContext.Provider>
  )
}

FormGroup.displayName = 'FormGroup'

export default react.attachOverrides(FormGroup, {
  List: { list: true },
})
