import React, { useCallback, useMemo } from 'react'

// ---| core |---
import { NestedStateNodeErrors, NestedStateNodeEvent, NestedStateOptions, NestedStateReturnOptions, useNestedState } from 'hooks'

// ---| pages |---
// ---| screens |---
// ---| components |---

// ---| self |---

export type FormFieldValue = number | string | boolean | null
export type FormGroupValue = { [key: string | number]: FormGroupValue | FormFieldValue }
export type FormValue = FormGroupValue | FormFieldValue

export type FormOptions<V = FormValue> = NestedStateOptions<V> & {
  validateOnChange?: boolean
  validateOnSubmit?: boolean
  onReset?: NestedStateNodeEvent<V>
  onSubmit?: NestedStateNodeEvent<V>
}

export type FormReturnOptions<V = FormValue> = NestedStateReturnOptions<V> & {
  name: string

  submit: (event: React.MouseEvent) => void

  /** Get root value. */
  form: () => V | undefined

  /** Get value. Return parent value if name is not provided. */
  value: () => V | undefined

  /** Return errors if state validated. */
  errors: () => NestedStateNodeErrors<V> | undefined
}

export const FormContext = React.createContext<FormReturnOptions<FormGroupValue> | null>(null)
FormContext.displayName = 'FormContext'
/**
 * Hook descriptions
 *
 * @example
 * const field = useForm(conf)
 */
export const useForm = <V = FormValue>(options: FormOptions<V> = {}): FormReturnOptions<V> => {
  const { validateOnChange, validateOnSubmit, onSubmit, onReset, ...otherOptions } = options
  const field = useNestedState<V>({ context: FormContext as FormOptions<V>['context'], ...otherOptions })
  const name = useMemo(() => {
    if (field.node.path.length === 1) {
      return field.node.path.toString()
    }

    const root = field.node.path[0]
    const subpath = field.node.path.slice(1).map((n) => `[${n}]`)

    return [root, ...subpath].join('')
  }, [field])

  const value = useCallback(() => field.node.value, [field])
  const errors = useCallback(() => field.node.errors, [field])
  const form = useCallback(() => field.root?.node.value, [field])

  const submit = useCallback((event: React.MouseEvent) => {
    event.preventDefault()

    if (validateOnSubmit) {
      field.validate()
    }

    if (!errors()) {
      onSubmit?.(value())
      field.reset()
    }
  }, [errors, onSubmit, field, validateOnSubmit, value])

  const reset = useCallback(() => {
    onReset?.(field.node.value)

    field.reset()
  }, [onReset, field])

  const set = useCallback((value?: V) => {
    if (validateOnChange) {
      field.validate()
    }

    field.set(value)
  }, [field, validateOnChange])

  return useMemo(
    () => ({ ...field, name, reset, submit, set, form, value, errors }),
    [field, name, reset, submit, set, form, value, errors],
  )
}
