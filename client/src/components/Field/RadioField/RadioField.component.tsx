import React from 'react'
import MuiRadioField, { RadioProps as MuiRadioProps } from '@mui/material/Radio'

// ---| core |---
// ---| pages |---
// ---| screens |---
// ---| components |---

// ---| common |---
import { cn } from 'common/tools'

// ---| self |---
import css from './RadioField.module.scss'
import BaseField, { BaseFieldProps } from '../BaseField'

export type RadioFieldProps = BaseFieldProps<MuiRadioProps>

/**
 * Component description.
 *
 * How to use
 * @example
 * <RadioField />
 */
export function RadioField(props: RadioFieldProps): JSX.Element {
  const { className, ...otherProps } = props
  const _className = cn(css.RadioField, className)

  return <BaseField className={_className} as={MuiRadioField} size='small' align='flex-start' {...otherProps} />
}

RadioField.displayName = 'RadioField'

export default RadioField
