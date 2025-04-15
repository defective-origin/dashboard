/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useMemo, useState } from 'react'
import { FormControl, FormLabel } from '@mui/material'

// ---| core |---
import { cn } from 'tools'
import { useFunc, useThrottle } from 'hooks'

// ---| pages |---
// ---| screens |---
// ---| components |---
import Text from 'components/views/Text'
import Help, { HelpProps } from 'components/views/Help'

// ---| self |---
import css from './FormField.module.scss'
import { FormFieldErrors, FormRule, useForm } from '../Form.context'
import Block from 'components/layouts/Block'

export type FieldProps<V = any> = {
  id?: string
  value?: V
  name?: string
  required?: boolean
  disabled?: boolean
  label?: React.ReactNode
  className?: string
  onBlur?: () => void
  onChange?: (value: V, event?: any) => void
}

export type FormFieldProps<V = any, F extends object = object> = {
  as: React.ComponentType<FieldProps<V>>
  path: string
  init?: V
  label?: React.ReactNode
  rules?: FormRule<F, string>[]
  help?: React.ReactNode | HelpProps
  fit?: boolean
  required?: boolean
  disabled?: boolean
  throttle?: boolean
  checkOnBlur?: boolean
  checkOnChange?: boolean
  className?: string
  toInit?: (init: V, props: any) => any
  toProps?: (value: V, props: any) => object
  onChange?: (value: V, form?: F) => void
}

/**
 * Allows to connect common input field to form.
 *
 * Field should have next props: name, value, onChange, onBlur.
 *
 * How to use
 * @example
 * const rules = [
 *    (value) => value.length > 50 ? "MAX LENGTH is 50 chars" : undefined
 * ]
 *
 * <FormField
 *    as={TextField}
 *    path='group.fieldName'
 *    init={50}
 *    label='Name'
 *    help='Help text'
 *    rules={rules}
 *    onChange={console.log}
 *    checkOnBlur
 * />
 */
export function FormField<V, F extends object>(props: FormFieldProps<V, F>) {
  const {
    as: Field, path, init, rules, label, help, throttle, checkOnBlur, checkOnChange,
    fit, required, disabled, toInit, toProps, onChange, className, ...otherProps
  } = props
  const _className = cn(css.FormField, className)
  const form = useForm<F>()
  const [value, setValue] = useState<V | undefined>()
  const [errors, setErrors] = useState<FormFieldErrors>([])
  const name = useMemo(() => path?.split('.')?.map(key => `[${key}]`).join(''), [path])

  const check = useFunc((val = value) => {
    const errors = rules?.map(rule => rule(val, form?.state)).filter(Boolean) ?? []

    setErrors(errors)
    form?.setErrors(path, errors)
  })

  const set = useThrottle((value: V) => {
    if (checkOnChange || errors.length) {
      check(value)
    }

    setValue(value)
    form?.setValue(path, value)

    onChange?.(value, form?.state)
  }, throttle ? 300 : 0)

  const reset = useFunc(() => {
    const initial = form ? form?.get(path).init : init

    setErrors([])
    setValue(initial)
    form?.setErrors(path, [])
    form?.setValue(path, initial)
  })

  const handleBlur = useFunc(() => { checkOnBlur && check() })

  // connect field manager to form
  useEffect(() => {
    const initial = toInit ? toInit(form ? form?.get(path).init : init, props) : init
    const fieldManager = { path, init: initial, set, reset, check }

    setValue(initial)

    form?.connect(fieldManager)

    return () => form?.disconnect(fieldManager)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [init, path, form, check, reset, set, toInit])

  const fieldProps = toProps?.(form ? form?.get(path).value : value, props)
  const helpProps = typeof help === 'object' ? help : { content: help }

  return (
    <FormControl className={_className} required={required} disabled={disabled}>
      {label && (
        <FormLabel id={path} className={css.label}>
          <Text content={label} size='xxs' />
          {help && <Help size='xs' {...helpProps} />}
        </FormLabel>
      )}

      <Field
        id={path}
        className={cn(fit && css.fit)}
        name={name}
        value={value}
        onBlur={handleBlur}
        onChange={set}
        disabled={disabled}
        {...otherProps}
        {...fieldProps}
      />

      {!!errors?.length && (
        <Block v='y'>
          {errors.map(error => <Text content={error} color='error' size='xxs' />)}
        </Block>
      )}
    </FormControl>
  )
}

FormField.displayName = 'FormField'

export default FormField

export function formField<P extends FieldProps,>(cmp: React.ComponentType<P>, defaultProps?: Partial<FormFieldProps>) {
  return (props: Omit<FormFieldProps, 'as'> & P) => <FormField as={cmp as React.ComponentType} {...defaultProps} {...props} />
}
