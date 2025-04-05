import React, { useContext } from 'react'
import { SubscriptionsManager } from 'hooks'


// eslint-disable-next-line @typescript-eslint/ban-types
export type FormPath<O extends {} = {}> = (string & {}) // | react.FlattenObjectFullPathKeys<O>
export type FormEvent<O extends object = object> = (value: any, store: O) => void
export type FormRule<O extends object = object, R = any> = (value: any, store?: O) => R | undefined | false
export type FormFieldState<V = any> = { init?: V, value?: V, errors?: FormErrors | FormFieldErrors[] }

export type FormFieldErrors<E = any> = E[]
export type FormErrors<O extends object = object> = {
  [key in keyof O]?: O[key] extends object ? FormErrors<O[key]> : FormFieldErrors
}

export type FormFieldManager<O extends object> = {
  path: FormPath<O>
  init?: any
  set: (value: any) => void
  reset: () => void
  check: () => void
}

export type FormManager<O extends object> = SubscriptionsManager<FormPath<O>, FormEvent<O>> & {
  initial: O
  state: O
  errors: FormErrors
  get: (path: FormPath<O>) => FormFieldState
  set: (path: FormPath<O>, value: any) => void
  reset: (path?: FormPath<O>) => void
  setValue: (path: FormPath<O>, value: any) => void
  setErrors: (path: FormPath<O>, errors: FormFieldErrors) => void
  check: (path?: FormPath<O>) => void
  submit: (path?: FormPath<O>) => void
  focus: (path: FormPath<O>) => void
  connect: (field: FormFieldManager<O>) => void
  disconnect: (field: FormFieldManager<O>) => void
}

export const FormContext = React.createContext<FormManager<object> | null>(null)
FormContext.displayName = 'FormContext'

export const useForm = <O extends object = object>() => useContext(FormContext as React.Context<FormManager<O> | null>)
