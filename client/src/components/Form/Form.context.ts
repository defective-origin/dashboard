import React, { useCallback, useMemo } from 'react'

// ---| core |---
import { NestedStateEvent, NestedStateOptions, NestedStateReturnOptions, useNestedState } from 'hooks'

// ---| pages |---
// ---| screens |---
// ---| components |---

// ---| self |---

export type FormFieldValue = number | string | boolean | null
export type FormGroupValue = { [key: string]: FormGroupValue | FormFieldValue } | FormGroupValue[]
export type FormValue = FormGroupValue | FormFieldValue

export type FormFieldError = string[]
export type FormGroupError = { [key: string]: FormGroupError | FormFieldError } | FormGroupError[]
export type FormError = FormGroupError | FormFieldError

export type FormFieldEvent = React.ChangeEvent<HTMLInputElement>
export type FormGroupEvent = React.MouseEvent<HTMLElement>
export type FormEvent = FormFieldEvent | FormGroupEvent | React.FormEvent<HTMLFormElement>

export type FormEventHandler = (event: FormEvent) => void

export type FormOptions<V = any, S = any, E = any, C = any> = NestedStateOptions<V, S, E, C> & {
  onSubmit?: NestedStateEvent<V, S, FormEvent>
}

export type FormReturnOptions<V = FormValue, S = FormValue, E = FormError, C = FormEvent> = NestedStateReturnOptions<V, S, E, C> & {
  name: string
  submit: FormEventHandler
}

export const FormContext = React.createContext<FormReturnOptions<any, any, any, any> | null>(null)
FormContext.displayName = 'FormContext'

// TODO: validate on: change, blur, submit
/**
 * Hook descriptions
 *
 * @example
 * const options = useForm(conf)
 */
export const useForm = <V, S, E, C>(options: FormOptions<V, S, E, C> = {}) => {
  const { onSubmit, ...otherOptions } = options
  const state = useNestedState<V, S, E, C>({ context: FormContext as FormOptions<V, S, E, C>['context'], ...otherOptions })
  const name = useMemo(() => {
    const root = state.node.path[0]
    if (state.node.path.length === 1) {
      return root
    }

    const subpath = state.node.path.slice(1, -1).map((n) => `[${n}]`)
    const field = state.node.path[-1]

    return [root, ...subpath, field].join('')
  }, [state])

  const submit = useCallback<FormReturnOptions<V, S, E, C>['submit']>((event) => {
    state.validate()

    if (!state.errors()) {
      onSubmit?.(state.get(), state.root(), event)
      state.reset()
    }
  }, [onSubmit, state])

  return useMemo(() => ({ ...state, name, submit }), [name, state, submit])
}
