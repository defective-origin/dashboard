import React from 'react'

// ---| core |---
import { cn } from 'tools'

// ---| components |---
import { TextField } from 'components/forms/fields/TextField'
import { FieldProps, formField } from 'components/forms/Form'

// ---| self |---
import css from './TagsField.module.scss'

export type TagsFieldProps = FieldProps<string[]>

/**
 * Component description.
 * @example
 * <TagsField />
 */
export function TagsField(props: TagsFieldProps) {
  const { value = [], onChange, className, ...otherProps } = props

  return (
    <TextField
      className={cn(css.TagsField, className)}
      value={value.join(',')}
      onChange={(event, value) => onChange?.(value.split(','), event)}
      multiline
      {...otherProps}
    />
  )
}

TagsField.displayName = 'TagsField'

export default formField(TagsField)
