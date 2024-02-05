import React, { useCallback } from 'react'
import MuiSwitchField from '@mui/material/Switch'

// ---| core |---
import { cn } from 'tools'

// ---| pages |---
// ---| screens |---
// ---| components |---
import { FormOptions, useForm } from 'components/Form'

// ---| self |---
import css from './SwitchField.module.scss'
import BaseField, { BaseFieldProps } from '../BaseField'

export type SwitchFieldProps = FormOptions & BaseFieldProps & {
  checked?: boolean
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <SwitchField />
 */
export function SwitchField(props: SwitchFieldProps): JSX.Element {
  const { name, checked, onChange, className, ...otherProps } = props
  const _className = cn(css.SwitchField, className)
  const form = useForm({ name, value: !!checked, onChange })

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    form.set(event.target.checked, event)
  }, [form])

  return (
    <BaseField className={_className} errors={form.errors()} align='flex-start' {...otherProps}>
      <MuiSwitchField name={form.name} size='small' checked={!!form.get()} onChange={handleChange} />
    </BaseField>
  )
}

SwitchField.displayName = 'SwitchField'

export default SwitchField
