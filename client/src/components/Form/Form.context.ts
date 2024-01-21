import React, { useCallback } from 'react'

// ---| core |---
import { NestedStateEventHandler, NestedStateOptions, NestedStateReturnOptions, useNestedState } from 'hooks'

// ---| pages |---
// ---| screens |---
// ---| components |---

// ---| self |---

export type FormFieldValue = number | string | boolean | null
export type FormGroupValue = { [key: string]: FormGroupValue | FormFieldValue } | Array<FormGroupValue | FormFieldValue>
export type FormValue = FormGroupValue | FormFieldValue

export type FormFieldEvent = React.ChangeEvent<HTMLInputElement>
export type FormGroupEvent = React.MouseEvent<HTMLElement>
export type FormEvent = FormFieldEvent | FormGroupEvent | React.FormEvent<HTMLFormElement>

export type FormEventContext = React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLElement> | React.FormEvent<HTMLFormElement>
export type FormEventHandler<V extends FormValue, E extends FormEventContext = FormEventContext> = NestedStateEventHandler<V, E>

export type FormOptions<V extends FormValue, E extends FormEventContext = FormEventContext> = NestedStateOptions<V, E> & {
  onSubmit?: FormEventHandler<V>
}
export type FormReturnOptions<V extends FormValue, E extends FormEventContext = FormEventContext> = NestedStateReturnOptions<V, E>

export type FormValueOptions = Omit<FormOptions<FormFieldValue>, 'init' | 'refreshIfExist' | 'context' | 'serialize' | 'onReset'>
export type FormGroupOptions = Omit<FormOptions<FormGroupValue>, 'value' | 'init' | 'refreshIfExist' | 'context' | 'serialize'>

export const FormContext = React.createContext<FormReturnOptions<FormGroupValue, FormEventContext> | null>(null)
FormContext.displayName = 'FormContext'

/**
 * Hook descriptions
 *
 * @example
 * const options = useForm(conf)
 */
export const useForm = <V extends FormValue = FormValue, E extends FormEventContext = FormEventContext>(options: FormOptions<V, E> = {}) => {
  const { onSubmit, onReset, ...otherOptions } = options

  return useNestedState<V, E>({
    context: FormContext,
    onReset: useCallback<FormEventHandler<V, E>>((field, store, event) => {
      const onEvent = event?.type === 'submit' ? onSubmit : onReset

      onEvent?.(field, store, event)
    }, [onSubmit, onReset]),
    ...otherOptions,
  } as FormOptions<V, E>) as FormReturnOptions<V, E>
}
