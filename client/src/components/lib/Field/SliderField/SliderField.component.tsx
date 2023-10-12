import React from 'react'

// ---| core |---
// ---| pages |---
// ---| screens |---
// ---| components |---
import Slider, {
  SliderProps as MuiSliderFieldProps,
} from '@mui/material/Slider'
import { TextFieldProps } from '@mui/material'

// ---| common |---
import { cn } from 'common/tools'

// ---| self |---
import css from './SliderField.module.scss'

export type SliderFieldProps = MuiSliderFieldProps & TextFieldProps

/**
 * Component description.
 *
 * How to use
 * @example
 * <SliderField />
 */
export function SliderField(props: SliderFieldProps): JSX.Element {
  const { label, className, children, ...otherProps } = props
  const _className = cn(css.SliderField, className)

  return (
    <>
      <div className="label">{label}</div>
      <Slider className={_className} {...otherProps} />
      <div className="messages">{children}</div>
    </>
  )
}

SliderField.displayName = 'SliderField'

export default SliderField
