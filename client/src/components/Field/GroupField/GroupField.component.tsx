import React, { useMemo } from 'react'

// ---| core |---
import { cn } from 'tools'
import { FormOptions, FormGroupValue, useForm, FormContext } from 'hooks'

// ---| pages |---
// ---| screens |---
// ---| components |---
import { BaseField, BaseFieldProps } from '../BaseField'

// ---| self |---
import css from './GroupField.module.scss'

export type GroupFieldProps = FormOptions<FormGroupValue> & BaseFieldProps & {
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
 * <GroupField />
 */
export function GroupField(props: GroupFieldProps): JSX.Element {
  const { name, list, onChange, onSubmit, onReset, children, className, ...otherProps } = props
  const _className = cn(css.GroupField, className)
  const value = useMemo(() => list ? [] : {}, [list])
  const field = useForm({ value, name, onChange, onSubmit, onReset })

  return (
    <FormContext.Provider value={field} >
      <BaseField className={_className} {...otherProps}>
        {children}
      </BaseField>
    </FormContext.Provider>
  )
}

GroupField.displayName = 'GroupField'

export default GroupField
