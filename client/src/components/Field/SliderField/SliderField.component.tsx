import React from 'react'
import MuiSliderField, { SliderProps as MuiSliderProps } from '@mui/material/Slider'

// ---| core |---
import { cn } from 'tools'

// ---| pages |---
// ---| screens |---
// ---| components |---

// ---| self |---
import css from './SliderField.module.scss'
import BaseField, { BaseFieldProps } from '../BaseField'

export type SliderFieldProps = BaseFieldProps<MuiSliderProps>

/**
 * Component description.
 *
 * How to use
 * @example
 * <SliderField />
 */
export function SliderField(props: SliderFieldProps): JSX.Element {
  const { className, ...otherProps } = props
  const _className = cn(css.SliderField, className)

  return <BaseField className={_className} as={MuiSliderField} size='small' {...otherProps} />
}

SliderField.displayName = 'SliderField'

export default SliderField
