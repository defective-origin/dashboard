/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useMemo, useState } from 'react'

// ---| core |---
import { cn } from 'tools'
import { useFunc, useThrottle } from 'hooks'

// ---| components |---
import Text from 'components/views/Text'
import Block from 'components/layouts/Block'
import Help, { HelpProps } from 'components/views/Help'

// ---| self |---
import css from './FormField.module.scss'
import { FormFieldErrors, FormRule, useForm } from '../Form.context'

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
  path?: string
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
  const form = useForm<F>()
  const [value, setValue] = useState<V | undefined>()
  const [errors, setErrors] = useState<FormFieldErrors>([])
  const name = useMemo(() => path?.split('.').map(key => `[${key}]`).join(''), [path]) // TODO: fix name

  const check = useFunc((val = value) => {
    const errors = rules?.map(rule => rule(val, form?.state)).filter(Boolean) ?? []

    if (path) {
      form?.setErrors(path, errors)
    }

    setErrors(errors)
  })

  const set = useThrottle((value: V) => {
    if (checkOnChange || errors.length) {
      check(value)
    }

    if (path) {
      form?.setValue(path, value)
    }

    setValue(value)
    onChange?.(value, form?.state)
  }, throttle ? 300 : 0)

  const reset = useFunc(() => {
    const initial = form && path ? form?.get(path).init : init

    if (path) {
      form?.setErrors(path, [])
      form?.setValue(path, initial)
    }

    setErrors([])
    setValue(initial)
  })

  const handleBlur = useFunc(() => { if (checkOnBlur) check() })

  // connect field manager to form
  useEffect(() => {
    const initial = toInit ? toInit(form && path ? form?.get(path).init : init, props) : init

    setValue(initial)

    if (path) {
      form?.connect({ path, init: initial, set, reset, check })

      return () => form?.disconnect(path)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [init, path, form, check, reset, set, toInit])

  const fieldProps = toProps?.(form && path ? form?.get(path).value : value, props)
  const helpProps = typeof help === 'object' ? help : { content: help }

  return (
    <Block className={cn(css.FormField, className)}>
      {label && (
        <label htmlFor={path} className={css.label}>
          <Text content={label} size='xs' />
          {required && <Text size='xs' color='error' content='*' />}
          {help && <Help size='xs' {...helpProps as HelpProps} />}
        </label>
      )}

      <Field
        id={path}
        name={name}
        value={value}
        onBlur={handleBlur}
        onChange={set}
        required={required}
        disabled={disabled}
        {...otherProps}
        {...fieldProps}
      />

      {!!errors?.length && (
        <Block>
          {errors.map(error => <Text key={error} content={error} color='error' size='xxs' />)}
        </Block>
      )}
    </Block>
  )
}

FormField.displayName = 'FormField'

export default FormField

export function formField<P extends FieldProps>(cmp: React.ComponentType<P>, defaultProps?: Partial<FormFieldProps>) {
  return (props: Omit<FormFieldProps, 'as'> & P) => <FormField as={cmp as React.ComponentType} {...defaultProps} {...props} />
}
