import React, { useCallback } from 'react'
import MuiCheckboxField, { CheckboxProps as MuiCheckboxProps } from '@mui/material/Checkbox'

// ---| core |---
// ---| pages |---
// ---| screens |---
// ---| components |---
import BaseField, { BaseFieldProps } from '../BaseField'

// ---| common |---
import { cn } from 'common/tools'

// ---| self |---
import css from './CheckboxField.module.scss'

export type CheckboxFieldProps = BaseFieldProps<MuiCheckboxProps>

/**
 * Component description.
 *
 * How to use
 * @example
 * <CheckboxField />
 */
export function CheckboxField(props: CheckboxFieldProps): JSX.Element {
  const { className, ...otherProps } = props
  const _className = cn(css.CheckboxField, className)

  const change = useCallback<NonNullable<BaseFieldProps<MuiCheckboxProps>['change']>>((event) => {
    if (props.value) {
      return event.target.checked ? props.value : undefined as unknown as boolean
    }

    return event.target.checked
  }, [props.value])

  const selectProps = useCallback<NonNullable<BaseFieldProps<MuiCheckboxProps>['selectProps']>>((value) => {
    if (props.value) {
      return { checked: !!value, value: props.value }
    }

    return { checked: !!value}
  }, [props.value])

  return <BaseField className={_className} as={MuiCheckboxField} change={change} selectProps={selectProps} size='small' align='start' {...otherProps} />
}

CheckboxField.displayName = 'CheckboxField'

export default CheckboxField
