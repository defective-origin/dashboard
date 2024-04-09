import React from 'react'
import MuiSwitchField from '@mui/material/Switch'

// ---| core |---
import { cn } from 'tools'
import { useFunc } from 'hooks'

// ---| pages |---
// ---| screens |---
// ---| components |---
import { FormOptions, useForm } from 'components/Form'

// ---| self |---
import css from './SwitchField.module.scss'
import BaseField, { BaseFieldProps } from '../BaseField'

export type SwitchFieldProps = FormOptions<boolean> & BaseFieldProps & {
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
  const field = useForm({ name, value: !!checked, onChange })
  const handleChange = useFunc((event: React.ChangeEvent<HTMLInputElement>) => field.set(event.target.checked))

  return (
    <BaseField className={_className} errors={field.errors()} align='flex-start' {...otherProps}>
      <MuiSwitchField name={field.name} size='small' checked={!!field.value()} onChange={handleChange} />
    </BaseField>
  )
}

SwitchField.displayName = 'SwitchField'

export default SwitchField
