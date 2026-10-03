import React from 'react'
import MuiAutocomplete from '@mui/material/Autocomplete'

// ---| core |---
import { cn } from 'tools'

// ---| components |---
import { TextField } from 'components/forms/fields/TextField'
import { FieldProps, formField } from 'components/forms/Form'

// ---| self |---
import css from './TagsField.module.scss'

export type TagsFieldProps = FieldProps<string[]> & {
  options?: string[]
}

/**
 * Component description.
 * @example
 * <TagsField />
 */
export function TagsField(props: TagsFieldProps) {
  const { value = [], options = [], onChange, className, ...otherProps } = props

  return (
    <MuiAutocomplete
      multiple
      options={options}
      className={cn(css.TagsField, className)}
      size='small'
      value={value}
      disableCloseOnSelect
      // getOptionLabel={option => option.title}
      filterSelectedOptions
      onChange={(event, value) => onChange?.(value, event)}
      renderInput={params => <TextField {...params} />}
      {...otherProps}
    />
  )
}

TagsField.displayName = 'TagsField'

export default formField(TagsField)
