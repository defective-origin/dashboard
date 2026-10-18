// ---| core |---
import { cn } from 'tools'

// ---| components |---
import Icon from 'components/views/Icon'
import { formField } from 'components/forms/Form'
import { TextField, TextFieldProps } from 'components/forms/fields/TextField'

// ---| self |---
import css from './SearchField.module.scss'

export type SearchFieldProps = TextFieldProps

/**
 * Component description.
 * @example
 * <SearchField />
 */
export function SearchField(props: SearchFieldProps) {
  const { className, ...otherProps } = props

  return (
    <TextField
      className={cn(css.SearchField, className)}
      start={<Icon className={css.icon} v='search' size='sm' />}
      {...otherProps}
    />
  )
}

SearchField.displayName = 'SearchField'

export default formField(SearchField)
