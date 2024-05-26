import React, { useEffect, useMemo } from 'react'
import useFunc from '../UseFunc'
import useNestedState, {
  NestedStateNodeErrors,
  NestedStateNodeEvent,
  NestedStateOptions,
  NestedStateReturnOptions,
} from '../UseNestedState'

export type FormFieldValue = number | string | boolean | null
export type FormGroupValue = { [key: string | number]: FormGroupValue | FormFieldValue }
export type FormValue = FormGroupValue | FormFieldValue

export type FormOptions<V = FormValue> = NestedStateOptions<V> & {
  /** Out of form reset action id */
  resetId?: string
  /** Out of form reset action id */
  submitId?: string
  validateOnChange?: boolean
  validateOnSubmit?: boolean
  onReset?: NestedStateNodeEvent<V>
  onSubmit?: NestedStateNodeEvent<V>
}

export type FormReturnOptions<V = FormValue> = NestedStateReturnOptions<V> & {
  name: string

  /** Submit form value. */
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
  const { resetId = '', submitId = '', validateOnChange, validateOnSubmit, onSubmit, onReset, ...otherOptions } = options
  const field = useNestedState<V>({ context: FormContext as FormOptions<V>['context'], ...otherOptions })
  const name = useMemo(() => {
    if (field.node.path.length === 1) {
      return field.node.path.toString()
    }

    const root = field.node.path[0]
    const subpath = field.node.path.slice(1).map((n) => `[${n}]`)

    return [root, ...subpath].join('')
  }, [field])

  const value = useFunc(() => field.node.value)
  const errors = useFunc(() => field.node.errors)
  const form = useFunc(() => field.root?.node.value)

  const submit = useFunc((event: React.MouseEvent | MouseEvent) => {
    event.preventDefault()

    if (validateOnSubmit) {
      field.validate()
    }

    if (!errors()) {
      onSubmit?.(value())
      field.reset()
    }
  })

  const reset = useFunc(() => {
    onReset?.(field.node.value)

    field.reset()
  })

  const set = useFunc((value?: V) => {
    if (validateOnChange) {
      field.validate()
    }

    field.set(value)
  })

  // subscribe on click action if they are out of form
  // to prevent complex subscriptions in different components
  // and not using imperative approach
  useEffect(() => {
    document.getElementById(resetId)?.addEventListener('click', reset)
    document.getElementById(submitId)?.addEventListener('click', submit)
  }, [reset, resetId, submit, submitId])

  return useMemo(
    () => ({ ...field, name, reset, submit, set, form, value, errors }),
    [field, name, reset, submit, set, form, value, errors],
  )
}

export default useForm
