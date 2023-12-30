import React, { useCallback } from 'react'
import MuiSwitchField, { SwitchProps as MuiSwitchProps } from '@mui/material/Switch'

// ---| core |---
// ---| pages |---
// ---| screens |---
// ---| components |---

// ---| common |---
import { cn } from 'common/tools'

// ---| self |---
import css from './SwitchField.module.scss'
import BaseField, { BaseFieldProps } from '../BaseField'

export type SwitchFieldProps = BaseFieldProps<MuiSwitchProps>

/**
 * Component description.
 *
 * How to use
 * @example
 * <SwitchField />
 */
export function SwitchField(props: SwitchFieldProps): JSX.Element {
  const { className, ...otherProps } = props
  const _className = cn(css.SwitchField, className)

  const change = useCallback<NonNullable<BaseFieldProps<MuiSwitchProps>['change']>>((event) => {
    if (props.value) {
      return event.target.checked ? props.value : undefined as unknown as boolean
    }

    return event.target.checked
  }, [props.value])

  const selectProps = useCallback<NonNullable<BaseFieldProps<MuiSwitchProps>['selectProps']>>((value) => {
    if (props.value) {
      return { checked: !!value, value: props.value }
    }

    return { checked: !!value}
  }, [props.value])

  return <BaseField className={_className} as={MuiSwitchField} change={change} selectProps={selectProps} size='small' {...otherProps} />
}

SwitchField.displayName = 'SwitchField'

export default SwitchField
