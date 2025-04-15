import React, { useCallback, useMemo, useState } from 'react'

// ---| core |---
import { cn } from 'tools'

// ---| pages |---
// ---| screens |---
// ---| components |---
import { TextField, TextFieldProps } from 'components/forms/fields/TextField'
import { SelectField } from 'components/forms/fields/SelectField'
import { formField } from 'components/forms/Form'

// ---| self |---
import css from './CssSizeField.module.scss'

const CSS_SIZE_OPTIONS = {
  'fr': { default: '0', format: (value: string) => `${value}fr` },
  'px': { default: '0', format: (value: string) => `${value}px` },
  '%': { default: '0', format: (value: string) => `${value}%` },
  'em': { default: '0', format: (value: string) => `${value}em` },
  'rem': { default: '0', format: (value: string) => `${value}rem` },
  'auto': { default: '', format: () => 'auto' },
  'min-content': { default: '', format: () => 'min-content' },
  'max-content': { default: '', format: () => 'max-content' },
  'minmax': { default: '0px, 100px', format: (value: string) => value },
}

export type CssSize = 'fr' | 'px' | '%' | 'em' | 'rem' | 'auto' | 'min-content' | 'max-content' | 'minmax'
const DEFAULT_FORMATS: CssSize[] = ['fr', 'px', '%', 'em', 'rem', 'auto', 'min-content', 'max-content', 'minmax']

export type CssSizeFieldProps = TextFieldProps & {
  formats?: CssSize[]
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <CssSizeField formats={['fr', 'px']} />
 */
export function CssSizeField(props: CssSizeFieldProps) {
  const { slotProps, formats = DEFAULT_FORMATS, onChange, className, ...otherProps } = props
  const _className = cn(css.CssSizeField, className)
  const [format, setFormat] = useState<CssSize>(formats[0])
  const options = CSS_SIZE_OPTIONS[format]
  const valueFormat = useMemo(() => Object.keys(CSS_SIZE_OPTIONS).find(f => props.value?.includes(f)), [props.value])

  // TODO: call onChange only if value is valid

  const change = useCallback((value: string, event: React.ChangeEvent) =>
    value && onChange?.(value, event)
  , [options, onChange])

  return (
    <TextField
      className={_className}
      value={options.default && undefined}
      disabled={options.default === ''}
      onChange={change}
      {...otherProps}
    />
  )

  const handleChange = useCallback((value: string, event: React.ChangeEvent) =>
    value && onChange?.(options.format(value || options.default), event)
  , [options, onChange])

  // TODO: implement
  return (
    <TextField
      className={_className}
      value={options.default && undefined}
      disabled={options.default === ''}
      // type='number'
      slotProps={{
        ...slotProps,
        input: {
          ...slotProps?.input,
          endAdornment: (
            <SelectField
              className={css.Filters}
              value={format}
              items={formats.map(format => ({ value: format, children: format }))}
              onChange={setFormat}
            />
          ),
        },
      }}
      onChange={handleChange}
      {...otherProps}
    />
  )
}

CssSizeField.displayName = 'CssSizeField'

export default formField(CssSizeField)
