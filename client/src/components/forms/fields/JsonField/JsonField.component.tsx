import React, { useCallback } from 'react'
import { JsonEditor, UpdateFunction } from 'json-edit-react'

// ---| core |---
import { cn } from 'tools'

// ---| pages |---
// ---| screens |---
// ---| components |---
import Icon from 'components/views/Icon'
import { FieldProps, formField } from 'components/forms/Form'

// ---| self |---
import css from './JsonField.module.scss'

export type JsonFieldProps = FieldProps<object>

/**
 * Component description.
 *
 * How to use
 * @example
 * <JsonField />
 */
export function JsonField(props: JsonFieldProps): JSX.Element {
  const { disabled, value = {}, onChange, className, ...otherProps } = props
  const _className = cn(css.JsonField, className)

  const handleChange = useCallback<UpdateFunction>(opts => onChange?.(opts.newData as object), [onChange])

  return (
    <JsonEditor
      className={_className}
      data={value}
      viewOnly={disabled}
      showCollectionCount={false}
      indent={2}
      onUpdate={handleChange}
      rootName='options'
      icons={{
        add: <Icon v='add' size='sm' color='success' />,
        edit: <Icon v='edit_square' size='sm' color='warning' />,
        delete: <Icon v='delete_forever' size='sm' color='error' />,
        copy: <Icon v='content_copy' size='sm' fill />,
        ok: <Icon v='check' size='sm' color='success' />,
        cancel: <Icon v='close' size='sm' color='error' />,
        chevron: <Icon v='keyboard_arrow_down' size='sm' />,
      }}
      {...otherProps}
    />
  )
}

JsonField.displayName = 'JsonField'


export default formField(JsonField)
