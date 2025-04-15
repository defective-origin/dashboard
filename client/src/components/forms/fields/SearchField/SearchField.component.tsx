// ---| core |---
import { cn } from 'tools'

// ---| pages |---
// ---| screens |---
// ---| components |---
import Icon from 'components/views/Icon'
import { formField } from 'components/forms/Form'
import { TextField, TextFieldProps } from 'components/forms/fields/TextField'

// ---| self |---
import css from './SearchField.module.scss'

export type SearchFieldProps = TextFieldProps

/**
 * Component description.
 *
 * How to use
 * @example
 * <SearchField />
 */
export function SearchField(props: SearchFieldProps) {
  const { slotProps, className, ...otherProps } = props
  const _className = cn(css.SearchField, className)

  return (
    <TextField
      className={_className}
      slotProps={{
        ...slotProps,
        input: {
          ...slotProps?.input,
          startAdornment: <Icon v='search' size='sm' />,
        },
      }}
      {...otherProps}
    />
  )
}

SearchField.displayName = 'SearchField'

export default formField(SearchField)
